from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class BookingCreate(BaseModel):
    name: str
    email: str
    phone: str
    address: str
    serviceType: str
    date: str
    time: str
    description: Optional[str] = None
    images: Optional[List[str]] = None

class BookingResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str
    name: str
    email: str
    phone: str
    address: str
    service_type: str
    date: str
    time: str
    description: Optional[str] = None
    images: Optional[str] = None
    status: str
    created_at: str

class BookingStatusUpdate(BaseModel):
    status: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Freeman Mobile Cleaning API"}

@api_router.post("/bookings", response_model=BookingResponse)
async def create_booking(booking: BookingCreate):
    booking_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": booking_id,
        "name": booking.name,
        "email": booking.email,
        "phone": booking.phone,
        "address": booking.address,
        "service_type": booking.serviceType,
        "date": booking.date,
        "time": booking.time,
        "description": booking.description,
        "images": str(booking.images) if booking.images else None,
        "status": "pending",
        "created_at": now
    }
    
    await db.bookings.insert_one(doc)
    
    return BookingResponse(
        id=booking_id,
        name=booking.name,
        email=booking.email,
        phone=booking.phone,
        address=booking.address,
        service_type=booking.serviceType,
        date=booking.date,
        time=booking.time,
        description=booking.description,
        images=str(booking.images) if booking.images else None,
        status="pending",
        created_at=now
    )

@api_router.get("/bookings", response_model=List[BookingResponse])
async def get_bookings():
    bookings = await db.bookings.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return bookings

@api_router.get("/bookings/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@api_router.patch("/bookings/{booking_id}", response_model=BookingResponse)
async def update_booking_status(booking_id: str, update: BookingStatusUpdate):
    if update.status not in ["pending", "approved", "completed", "cancelled"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    result = await db.bookings.update_one(
        {"id": booking_id},
        {"$set": {"status": update.status}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    booking = await db.bookings.find_one({"id": booking_id}, {"_id": 0})
    return booking


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
