from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException, Query
from fastapi.responses import Response
from typing import Optional, List
from io import BytesIO
from PIL import Image

from models.schemas import (
    DamageAnalysisResponse, ReturnDecision, ReturnListResponse, 
    ProductInfo, OrderInfo
)
from services.order_db import (
    get_order, get_all_orders, get_customer_history, 
    get_products_by_category, get_all_products
)
from services.yolo_service import YOLOService
from services.triage_engine import TriageEngine
import config

router = APIRouter(prefix="/api/v1")

# Global seed data for demo & presentation
default_returns = [
    ReturnDecision(
        id="RET-89412",
        order_id="ORD-2025-001",
        product_name="Tesla Model 3 Floor Mats",
        category="cars",
        status="approved",
        verdict="AUTO_APPROVED",
        confidence=0.96,
        damage_detected="Deep crack / tear",
        processing_time="1.8s",
        recommendation="Instant refund to original payment method",
        reason="Verified crack defect via YOLOv8 model inference.",
        timestamp="2025-09-18T10:15:00Z"
    ),
    ReturnDecision(
        id="RET-78321",
        order_id="ORD-2025-002",
        product_name="Specialized S-Works Road Bike",
        category="bikes",
        status="review",
        verdict="HUMAN_REVIEW",
        confidence=0.74,
        damage_detected="Frame Scratch",
        processing_time="2.1s",
        recommendation="Manual review by tier-2 returns team",
        reason="Claim photo mismatch detected against order description.",
        timestamp="2025-09-18T11:42:10Z"
    ),
    ReturnDecision(
        id="RET-92104",
        order_id="ORD-2025-003",
        product_name="iPhone 16 Pro Max",
        category="mobile",
        status="rejected",
        verdict="AUTO_REJECTED",
        confidence=0.98,
        damage_detected="Stock Image Duplicate",
        processing_time="0.9s",
        recommendation="Reject request and flag user profile",
        reason="High fraud risk score. Stock image duplicate detected.",
        timestamp="2025-09-18T12:05:44Z"
    ),
    ReturnDecision(
        id="RET-65412",
        order_id="ORD-2025-004",
        product_name="Sony PlayStation 5 Pro",
        category="ps5",
        status="approved",
        verdict="AUTO_APPROVED",
        confidence=0.93,
        damage_detected="Box Crush Damage",
        processing_time="1.4s",
        recommendation="Process replacement dispatch",
        reason="Shipping box crush damage verified by vision AI.",
        timestamp="2025-09-18T13:22:15Z"
    )
]

returns_store: List[ReturnDecision] = list(default_returns)

def get_yolo(request):
    if hasattr(request.app.state, 'yolo_service') and request.app.state.yolo_service is not None:
        return request.app.state.yolo_service
    return YOLOService(model_path=config.MODEL_PATH)

def get_triage(request):
    if hasattr(request.app.state, 'triage_engine') and request.app.state.triage_engine is not None:
        return request.app.state.triage_engine
    return TriageEngine()

@router.post("/analyze-damage", response_model=DamageAnalysisResponse)
async def analyze_damage(file: UploadFile = File(...), yolo: YOLOService = Depends(get_yolo)):
    if file.content_type not in config.ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type")
        
    contents = await file.read()
    if len(contents) > config.MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
        
    image = Image.open(BytesIO(contents))
    analysis = yolo.analyze_image(image, conf=config.CONFIDENCE_THRESHOLD, iou=config.IOU_THRESHOLD)
    return analysis

@router.post("/submit-return", response_model=ReturnDecision)
async def submit_return(
    order_id: str = Form(...),
    damage_type: str = Form(...),
    description: str = Form(...),
    file: Optional[UploadFile] = File(None),
    yolo: YOLOService = Depends(get_yolo),
    triage: TriageEngine = Depends(get_triage)
):
    order = get_order(order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
        
    damage_analysis = {}
    if file:
        if file.content_type in config.ALLOWED_MIME_TYPES:
            contents = await file.read()
            image = Image.open(BytesIO(contents))
            damage_analysis = yolo.analyze_image(image, conf=config.CONFIDENCE_THRESHOLD, iou=config.IOU_THRESHOLD)
    else:
        # Mock analysis based on damage type
        damage_analysis = {
            "summary": {
                "damage_severity": "severe" if damage_type.lower() == "destroyed" else "minor",
                "has_damage": True
            }
        }
        
    history = get_customer_history(order["customer_email"])
    decision = triage.evaluate_return(order, damage_analysis, damage_type, description, history)
    
    returns_store.append(decision)
    return decision

@router.get("/returns", response_model=ReturnListResponse)
async def get_returns(status: Optional[str] = Query(None)):
    filtered = [r for r in returns_store if not status or r.status == status]
    approved = len([r for r in returns_store if r.status == 'approved'])
    review = len([r for r in returns_store if r.status == 'review'])
    rejected = len([r for r in returns_store if r.status == 'rejected'])
    
    return ReturnListResponse(
        returns=filtered,
        total=len(returns_store),
        approved=approved,
        review=review,
        rejected=rejected
    )

@router.get("/returns/{return_id}", response_model=ReturnDecision)
async def get_return(return_id: str):
    for r in returns_store:
        if r.id == return_id:
            return r
    raise HTTPException(status_code=404, detail="Return not found")

@router.get("/products", response_model=List[ProductInfo])
async def get_products(category: Optional[str] = Query(None)):
    if category:
        return get_products_by_category(category)
    return get_all_products()

@router.get("/orders/{order_id}", response_model=OrderInfo)
async def get_order_endpoint(order_id: str):
    order_data = get_order(order_id)
    if not order_data:
        raise HTTPException(status_code=404, detail="Order not found")
        
    product = ProductInfo(
        id=order_data["product_id"],
        name=order_data["product_name"],
        category=order_data["category"],
        price=order_data["price"]
    )
    
    return OrderInfo(
        order_id=order_data["order_id"],
        product=product,
        customer_name=order_data["customer_name"],
        customer_email=order_data["customer_email"],
        purchase_date=order_data["purchase_date"],
        days_since_purchase=order_data["days_since_purchase"],
        total_amount=order_data["price"],
        return_eligible=order_data["return_eligible"]
    )

@router.post("/visualize-damage")
async def visualize_damage(file: UploadFile = File(...), yolo: YOLOService = Depends(get_yolo)):
    if file.content_type not in config.ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type")
        
    contents = await file.read()
    image = Image.open(BytesIO(contents))
    
    annotated_bytes = yolo.get_annotated_image(image, conf=config.CONFIDENCE_THRESHOLD)
    
    return Response(content=annotated_bytes, media_type="image/jpeg")
