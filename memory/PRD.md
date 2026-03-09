# Freeman Mobile Cleaning - Product Requirements Document

## Original Problem Statement
Build a fully functional Freeman Mobile Cleaning services booking app with:
- Admin panel with login (acemayeson8@gmail.com / acemayeson8@gmail.com)
- Yellow and black professional theme
- All 22 cleaning services with images
- Mobile-optimized for Android users
- Push code to GitHub

## User Personas
1. **Customers**: People needing cleaning services who want to easily book and upload images of areas to clean
2. **Admin**: Business owner who manages bookings, views customer details and images, and updates booking statuses

## Core Requirements
- Professional yellow/black theme on cream background
- 22 cleaning services with service images
- Multi-step booking form with image upload
- Admin authentication with hardcoded credentials
- Admin dashboard to manage bookings
- Mobile-first responsive design
- View customer uploaded images in admin panel

## What's Been Implemented (March 2026)
- [x] Home page with hero, services grid, stats, CTA sections
- [x] All 22 cleaning services with professional images
- [x] Multi-step booking form (5 steps: Personal Info → Service → Schedule → Photos → Confirm)
- [x] Image upload with preview (up to 5 images)
- [x] Admin login page (credentials hidden, stored in env vars)
- [x] Admin dashboard with booking list and details panel
- [x] Status filters (All, Pending, Approved, Completed, Cancelled)
- [x] Status update functionality
- [x] View customer uploaded images
- [x] Yellow/black theme on cream background
- [x] Mobile-first responsive design
- [x] FastAPI backend with MongoDB
- [x] GitHub push completed

## GitHub Repository
https://github.com/amoschanda/Freeman

## Tech Stack
- Frontend: React, Tailwind CSS, Lucide Icons, Sonner (toasts)
- Backend: FastAPI, Motor (MongoDB async)
- Database: MongoDB
- Fonts: Barlow Condensed (headings), Inter (body)

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ | Health check |
| POST | /api/bookings | Create booking |
| GET | /api/bookings | List bookings (paginated) |
| GET | /api/bookings/{id} | Get booking by ID |
| PATCH | /api/bookings/{id} | Update booking status |

## Prioritized Backlog
### P0 (Critical) - COMPLETED
- [x] Core booking flow
- [x] Admin authentication
- [x] Booking management

### P1 (Important)
- [ ] Email notifications for new bookings
- [ ] Search/filter bookings by customer name or service
- [ ] Export bookings to CSV

### P2 (Nice to Have)
- [ ] Customer booking history lookup
- [ ] Service pricing display
- [ ] Online payment integration
- [ ] SMS notifications
- [ ] Calendar view for bookings

## Next Tasks
1. Add email notifications when new booking is received
2. Implement search functionality in admin dashboard
3. Add service pricing information
4. Consider payment integration (Stripe/PayPal)
