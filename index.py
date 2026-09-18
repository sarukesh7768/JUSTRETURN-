import sys
import os

# Add root and backend directories to Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend"))

from backend.main import app

# Export app for Vercel Serverless Functions
__all__ = ["app"]
