import os
import sys

backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager

try:
    from backend.api.routes import router
    from backend.services.yolo_service import YOLOService
    from backend.services.triage_engine import TriageEngine
    import backend.config as config
except ImportError:
    from api.routes import router
    from services.yolo_service import YOLOService
    from services.triage_engine import TriageEngine
    import config

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing YOLOv8 Service...")
    yolo_service = YOLOService(model_path=config.MODEL_PATH)
    app.state.yolo_service = yolo_service
    
    print("Initializing Triage Engine...")
    triage_engine = TriageEngine()
    app.state.triage_engine = triage_engine
    
    print("Startup complete.")
    yield
    print("Shutting down...")

app = FastAPI(
    title='JustReturn AI API', 
    version='1.0.0', 
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

# Mount frontend if the directory exists
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'frontend')
if os.path.exists(frontend_path):
    app.mount('/', StaticFiles(directory=frontend_path, html=True), name='frontend')

if __name__ == '__main__':
    import uvicorn
    uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True)
