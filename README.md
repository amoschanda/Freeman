# Freeman Mobile Cleaning

Professional cleaning services booking application with admin panel.

![Freeman Mobile Cleaning](https://images.unsplash.com/photo-1757924461488-ef9ad0670978?w=800)

## Features

- **22 Cleaning Services**: Mobile CarWash, Home Cleaning, Office Cleaning, LandScaping, and more
- **Professional Theme**: Yellow and black theme on cream background
- **Mobile-First Design**: Optimized for Android and all mobile devices
- **Multi-Step Booking**: Easy booking flow with image upload
- **Admin Panel**: Manage all bookings with status updates

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI (Python)
- **Database**: MongoDB

## Deployment Instructions

### For Render.com

1. **Backend Deployment**:
   - Create a new Web Service
   - Connect this repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Add Environment Variables:
     - `MONGO_URL`: Your MongoDB connection string
     - `DB_NAME`: `freeman_cleaning`

2. **Frontend Deployment**:
   - Create a new Static Site
   - Root Directory: `frontend`
   - Build Command: `yarn install && yarn build`
   - Publish Directory: `build`
   - Add Environment Variable:
     - `REACT_APP_BACKEND_URL`: Your backend URL (e.g., https://your-backend.onrender.com)

### For Vercel

1. Import this repository
2. Set Root Directory to `frontend`
3. Framework Preset: Create React App
4. Add Environment Variable:
   - `REACT_APP_BACKEND_URL`: Your backend URL

### For Railway

1. Create new project from GitHub
2. Add MongoDB service
3. Add Backend service (Python):
   - Root: `/backend`
   - Start: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Add Frontend service:
   - Root: `/frontend`
   - Build: `yarn install && yarn build`

## Admin Access

- **Email**: acemayeson8@gmail.com
- **Password**: acemayeson8@gmail.com

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| POST | `/api/bookings` | Create new booking |
| GET | `/api/bookings` | List all bookings |
| GET | `/api/bookings/{id}` | Get booking by ID |
| PATCH | `/api/bookings/{id}` | Update booking status |

## Services Available

1. Mobile CarWash
2. CarWash
3. LandScaping
4. Laundry
5. Home Cleaning
6. Office Cleaning
7. Lawn Care
8. Garbage Collection
9. Smart Home Repair
10. Environment Cleaning
11. Farm Work
12. Garden Work
13. Toilet Cleaning
14. Yard Cleaning
15. Guest House Cleaning
16. Hotel Cleaning
17. Building Cleaning
18. Carpet Cleaning
19. Sofa Cleaning
20. Mattress Cleaning
21. Car Engine Cleaning
22. Window Cleaning

## License

MIT License - Feel free to use and modify for your projects.
