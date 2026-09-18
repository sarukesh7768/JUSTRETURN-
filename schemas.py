from pydantic import BaseModel
from typing import List, Optional

class BoundingBox(BaseModel):
    x_min: float
    y_min: float
    x_max: float
    y_max: float
    width: float
    height: float

class NormalizedBox(BaseModel):
    x_center: float
    y_center: float
    width: float
    height: float

class DetectionItem(BaseModel):
    id: int
    class_id: int
    class_name: str
    confidence: float
    box: BoundingBox
    normalized_box: NormalizedBox
    estimated_area_percentage: float

class ImageMetadata(BaseModel):
    width: int
    height: int

class DamageSummary(BaseModel):
    total_detections: int
    has_damage: bool
    damage_severity: str  # 'none', 'minor', 'moderate', 'severe'
    max_confidence: float
    triage_verdict: str

class DamageAnalysisResponse(BaseModel):
    status: str
    image_metadata: ImageMetadata
    summary: DamageSummary
    detections: List[DetectionItem]
    latency_ms: dict

class ProductInfo(BaseModel):
    id: str
    name: str
    category: str
    price: float
    image_url: Optional[str] = None

class OrderInfo(BaseModel):
    order_id: str
    product: ProductInfo
    customer_name: str
    customer_email: str
    purchase_date: str
    days_since_purchase: int
    total_amount: float
    return_eligible: bool

class ReturnRequest(BaseModel):
    order_id: str
    damage_type: str
    description: str
    customer_claim: Optional[str] = None

class ReturnDecision(BaseModel):
    id: str
    order_id: str
    product_name: str
    category: str
    status: str  # 'approved', 'review', 'rejected'
    verdict: str  # 'AUTO_APPROVED', 'HUMAN_REVIEW', 'AUTO_REJECTED'
    confidence: float
    damage_detected: str
    processing_time: str
    recommendation: str
    reason: str
    timestamp: str

class ReturnListResponse(BaseModel):
    returns: List[ReturnDecision]
    total: int
    approved: int
    review: int
    rejected: int
