import os

# Configuration settings
MODEL_PATH: str = os.getenv('MODEL_PATH', 'yolov8s.pt')
CONFIDENCE_THRESHOLD: float = 0.25
IOU_THRESHOLD: float = 0.45
MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB
ALLOWED_MIME_TYPES: set = {'image/jpeg', 'image/png', 'image/webp'}
CORS_ORIGINS: list = [
    'http://localhost:3000', 
    'http://localhost:5500', 
    'http://127.0.0.1:5500', 
    'http://localhost:8000', 
    'null'
]
API_VERSION: str = 'v1'
