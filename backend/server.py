from fastapi import FastAPI, HTTPException, Depends, status, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import asyncio
import motor.motor_asyncio
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext
import uuid
import os
from decouple import config
import stripe
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Mary's Cosmic Sanctuary API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuration
MONGO_URL = config("MONGO_URL", default="mongodb://localhost:27017/marys_sanctuary")
SECRET_KEY = config("SECRET_KEY", default="your-secret-key-change-this")
STRIPE_SECRET_KEY = config("STRIPE_SECRET_KEY", default="")
CONVERTKIT_API_SECRET = config("CONVERTKIT_API_SECRET", default="")
CONVERTKIT_FORM_ID = config("CONVERTKIT_FORM_ID", default="")

# Initialize Stripe
if STRIPE_SECRET_KEY:
    stripe.api_key = STRIPE_SECRET_KEY

# MongoDB connection
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client.marys_sanctuary

# Collections
users_collection = db.users
products_collection = db.products
journal_entries_collection = db.journal_entries
blog_posts_collection = db.blog_posts
testimonials_collection = db.testimonials
contact_messages_collection = db.contact_messages

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: Optional[str] = None
    created_at: datetime
    is_premium: bool = False

class JournalEntry(BaseModel):
    title: str
    content: str
    mood: Optional[str] = None
    prompt_id: Optional[int] = None

class JournalEntryResponse(BaseModel):
    id: str
    title: str
    content: str
    mood: Optional[str] = None
    prompt_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    inquiry_type: Optional[str] = "general"

class BlogPost(BaseModel):
    id: str
    title: str
    content: str
    excerpt: str
    author: str
    featured_image: str
    created_at: datetime
    tags: List[str]

class Testimonial(BaseModel):
    id: str
    name: str
    role: str
    content: str
    is_featured: bool
    avatar_url: Optional[str] = None

class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    category: str
    preview_content: Optional[str] = None
    featured_image: str

# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    user = await users_collection.find_one({"email": email})
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

# Initialize database with sample data
async def init_db():
    """Initialize database with sample data"""
    try:
        # Check if products exist
        product_count = await products_collection.count_documents({})
        if product_count == 0:
            # Sample products
            sample_products = [
                {
                    "id": "1",
                    "name": "Cosmic Healing Journal",
                    "description": "A beautifully designed 120-page digital journal with guided prompts for self-reflection, healing, and growth.",
                    "price": 29.99,
                    "category": "journal",
                    "preview_content": "Sample pages include: 'What does healing mean to you today?' and 'Three things that brought me peace this week...'",
                    "featured_image": "https://images.unsplash.com/photo-1596078878524-8047985968bb"
                },
                {
                    "id": "2",
                    "name": "Transitions & Transformation eBook",
                    "description": "A comprehensive 80-page guide to navigating life's major transitions with grace and wisdom.",
                    "price": 19.99,
                    "category": "ebook",
                    "preview_content": "Chapter preview: 'Understanding the Seasons of Change' - Learn why transitions feel so challenging.",
                    "featured_image": "https://images.unsplash.com/photo-1732352332941-7cb02a49edd8"
                }
            ]
            await products_collection.insert_many(sample_products)
            logger.info("Sample products inserted")

        # Check if blog posts exist
        blog_count = await blog_posts_collection.count_documents({})
        if blog_count == 0:
            # Sample blog posts
            sample_posts = [
                {
                    "id": "1",
                    "title": "Finding Light in the Darkness: A Letter to My Past Self",
                    "excerpt": "What I would tell the woman who was drowning in transition, afraid she'd never find her way back to herself.",
                    "content": "Dear Past Self,\n\nI know you can't see it right now, but the darkness you're swimming through isn't trying to drown you—it's trying to teach you how to breathe underwater...",
                    "author": "Mary",
                    "featured_image": "https://images.unsplash.com/photo-1519810755548-39cd217da494",
                    "created_at": datetime.utcnow(),
                    "tags": ["healing", "self-love", "transformation"]
                }
            ]
            await blog_posts_collection.insert_many(sample_posts)
            logger.info("Sample blog posts inserted")

        # Check if testimonials exist
        testimonial_count = await testimonials_collection.count_documents({})
        if testimonial_count == 0:
            # Sample testimonials
            sample_testimonials = [
                {
                    "id": "1",
                    "name": "Sarah Chen",
                    "role": "Cancer Survivor & Wellness Coach",
                    "content": "Mary's words found me exactly when I needed them most. Her writing about identity shifts helped me understand that I wasn't broken—I was becoming.",
                    "is_featured": True,
                    "avatar_url": None
                }
            ]
            await testimonials_collection.insert_many(sample_testimonials)
            logger.info("Sample testimonials inserted")

        # Create demo user
        demo_user = await users_collection.find_one({"email": "demo@marysanctuary.com"})
        if not demo_user:
            demo_user_data = {
                "id": str(uuid.uuid4()),
                "email": "demo@marysanctuary.com",
                "hashed_password": hash_password("demo123"),
                "first_name": "Demo",
                "last_name": "User",
                "created_at": datetime.utcnow(),
                "is_premium": True
            }
            await users_collection.insert_one(demo_user_data)
            logger.info("Demo user created")

    except Exception as e:
        logger.error(f"Error initializing database: {e}")

# API Routes
@app.on_event("startup")
async def startup_event():
    await init_db()

@app.get("/")
async def root():
    return {"message": "Mary's Cosmic Sanctuary API is running"}

@app.get("/api/")
async def api_root():
    return {"message": "Welcome to Mary's Cosmic Sanctuary API"}

# Authentication routes
@app.post("/api/auth/register")
async def register(user: UserCreate):
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    user_id = str(uuid.uuid4())
    user_data = {
        "id": user_id,
        "email": user.email,
        "hashed_password": hash_password(user.password),
        "first_name": user.first_name,
        "last_name": user.last_name,
        "created_at": datetime.utcnow(),
        "is_premium": False
    }
    
    await users_collection.insert_one(user_data)
    return {"message": "User created successfully", "user_id": user_id}

@app.post("/api/auth/login")
async def login(user: UserLogin):
    # Find user
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": db_user["email"]}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user["id"],
            "email": db_user["email"],
            "first_name": db_user["first_name"],
            "last_name": db_user.get("last_name"),
            "is_premium": db_user.get("is_premium", False)
        }
    }

@app.get("/api/auth/me")
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "email": current_user["email"],
        "first_name": current_user["first_name"],
        "last_name": current_user.get("last_name"),
        "is_premium": current_user.get("is_premium", False)
    }

# Journal entries routes
@app.post("/api/journal/entries")
async def create_journal_entry(entry: JournalEntry, current_user: dict = Depends(get_current_user)):
    entry_data = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "title": entry.title,
        "content": entry.content,
        "mood": entry.mood,
        "prompt_id": entry.prompt_id,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    await journal_entries_collection.insert_one(entry_data)
    return {"message": "Journal entry created successfully", "entry_id": entry_data["id"]}

@app.get("/api/journal/entries")
async def get_journal_entries(current_user: dict = Depends(get_current_user)):
    entries = await journal_entries_collection.find({"user_id": current_user["id"]}).sort("created_at", -1).to_list(length=100)
    return entries

@app.get("/api/journal/entries/{entry_id}")
async def get_journal_entry(entry_id: str, current_user: dict = Depends(get_current_user)):
    entry = await journal_entries_collection.find_one({"id": entry_id, "user_id": current_user["id"]})
    if not entry:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    return entry

@app.put("/api/journal/entries/{entry_id}")
async def update_journal_entry(entry_id: str, entry: JournalEntry, current_user: dict = Depends(get_current_user)):
    update_data = {
        "title": entry.title,
        "content": entry.content,
        "mood": entry.mood,
        "prompt_id": entry.prompt_id,
        "updated_at": datetime.utcnow()
    }
    
    result = await journal_entries_collection.update_one(
        {"id": entry_id, "user_id": current_user["id"]},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    return {"message": "Journal entry updated successfully"}

@app.delete("/api/journal/entries/{entry_id}")
async def delete_journal_entry(entry_id: str, current_user: dict = Depends(get_current_user)):
    result = await journal_entries_collection.delete_one({"id": entry_id, "user_id": current_user["id"]})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Journal entry not found")
    
    return {"message": "Journal entry deleted successfully"}

# Products routes
@app.get("/api/products")
async def get_products():
    products = await products_collection.find({}).to_list(length=100)
    return products

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    product = await products_collection.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Blog routes
@app.get("/api/blog/posts")
async def get_blog_posts():
    posts = await blog_posts_collection.find({}).sort("created_at", -1).to_list(length=100)
    return posts

@app.get("/api/blog/posts/{post_id}")
async def get_blog_post(post_id: str):
    post = await blog_posts_collection.find_one({"id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return post

# Testimonials routes
@app.get("/api/testimonials")
async def get_testimonials():
    testimonials = await testimonials_collection.find({}).to_list(length=100)
    return testimonials

# Contact routes
@app.post("/api/contact")
async def create_contact_message(message: ContactMessage):
    message_data = {
        "id": str(uuid.uuid4()),
        "name": message.name,
        "email": message.email,
        "subject": message.subject,
        "message": message.message,
        "inquiry_type": message.inquiry_type,
        "created_at": datetime.utcnow(),
        "status": "new"
    }
    
    await contact_messages_collection.insert_one(message_data)
    return {"message": "Contact message sent successfully"}

# Stripe payment routes
@app.post("/api/payments/checkout/session")
async def create_checkout_session(product_ids: List[str]):
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        # Get products from database
        products = await products_collection.find({"id": {"$in": product_ids}}).to_list(length=100)
        
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        
        # Create line items
        line_items = []
        for product in products:
            line_items.append({
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': product['name'],
                        'description': product['description'],
                    },
                    'unit_amount': int(product['price'] * 100),  # Convert to cents
                },
                'quantity': 1,
            })
        
        # Create Stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url='https://your-domain.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url='https://your-domain.com/shop',
            metadata={
                'product_ids': ','.join(product_ids)
            }
        )
        
        return {"url": session.url}
    
    except Exception as e:
        logger.error(f"Error creating checkout session: {e}")
        raise HTTPException(status_code=500, detail="Unable to create checkout session")

@app.get("/api/payments/checkout/status/{session_id}")
async def get_checkout_status(session_id: str):
    if not STRIPE_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    try:
        session = stripe.checkout.Session.retrieve(session_id)
        return {
            "payment_status": session.payment_status,
            "status": session.status,
            "amount_total": session.amount_total,
            "currency": session.currency
        }
    except Exception as e:
        logger.error(f"Error retrieving checkout status: {e}")
        raise HTTPException(status_code=404, detail="Session not found")

@app.post("/api/payments/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get('stripe-signature')
    
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, config("STRIPE_WEBHOOK_SECRET", default="")
        )
    except ValueError as e:
        logger.error(f"Invalid payload: {e}")
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError as e:
        logger.error(f"Invalid signature: {e}")
        raise HTTPException(status_code=400, detail="Invalid signature")
    
    # Handle the event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        # Handle successful payment
        logger.info(f"Payment successful for session: {session['id']}")
        
        # Here you would typically:
        # 1. Update user's premium status
        # 2. Send confirmation email
        # 3. Grant access to purchased products
        
    return {"status": "success"}

# Newsletter routes (ConvertKit integration)
@app.post("/api/newsletter/subscribe")
async def subscribe_to_newsletter(email: EmailStr, first_name: Optional[str] = None):
    if not CONVERTKIT_API_SECRET:
        raise HTTPException(status_code=500, detail="ConvertKit not configured")
    
    # This would integrate with ConvertKit API
    # For now, just return success
    return {"message": "Subscribed successfully"}

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
