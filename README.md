# Ride-Sharing Platform

A modern, full-stack ride-sharing platform that enables users to share rides with different types (carpool, cargo, mixed). Connect, travel, and save together!

![Ride-Sharing Platform](https://cdn.blablacar.com/kairos/assets/images/carpool_blablabus_large-e3d8eff32c13cdafc080.svg)

## 🌟 Features

### For Passengers
- **Find Rides**: Search for rides between locations with advanced filtering
- **Seat Booking**: Book seats on available rides
- **Real-time Updates**: Get notified about ride status changes
- **Ride Types**: Choose between passenger (carpool), cargo, or mixed rides

### For Drivers
- **Publish Rides**: Create rides with multiple stops and flexible pricing
- **Route Optimization**: Automatically calculate efficient routes with Google Maps
- **Manage Bookings**: Accept/reject booking requests
- **Earnings Tracking**: Track earnings from completed rides

### General Features
- **Interactive Maps**: Visual representation of rides and routes
- **Advanced Filters**: Filter rides by time, price, amenities, and more
- **User Profiles**: Verified profiles with ratings and reviews
- **Instant Booking**: Book certain rides instantly without waiting for approval

## 🔧 Tech Stack

### Frontend
- React.js
- Redux (state management)
- Tailwind CSS (styling)
- React Router (routing)
- Lucide React & FontAwesome (icons)
- React Hot Toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM)
- Google Maps API (routes and distance calculation)
- JWT (authentication)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn
- MongoDB
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/S01J04/FYP-RideShare
   cd ride-sharing-platform
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd BACKEND
   npm install
   
   # Install frontend dependencies
   cd ../FRONTEND
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env` files in both BACKEND and FRONTEND directories.

   **BACKEND/.env**
   ```
   # Server Configuration
   PORT=8000
   NODE_ENV=development
   
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/ride_sharing_db
   
   # Authentication
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=7d
   
   # Google Maps API
   GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:3000
   
   # Optional: Cloudinary (for image uploads)
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

   **FRONTEND/.env**
   ```
   REACT_APP_BACKEND_URL=http://localhost:8000/api
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

4. **Run the application**
   ```bash
   # Start backend server
   cd BACKEND
   npm run dev
   
   # Start frontend application in a new terminal
   cd FRONTEND
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/profile` - Get user profile information

### Ride Endpoints
- `POST /api/rides` - Create a new ride
- `GET /api/rides` - Get all rides
- `GET /api/rides/search` - Search for rides with filters
- `GET /api/rides/:id` - Get a specific ride
- `PUT /api/rides/:id` - Update a ride
- `DELETE /api/rides/:id` - Delete a ride

### Booking Endpoints
- `POST /api/bookings` - Create a new booking
- `GET /api/bookings` - Get user's bookings
- `PUT /api/bookings/:id` - Update booking status
- `DELETE /api/bookings/:id` - Cancel a booking

## 📁 Project Structure

```
ride-sharing-platform/
│
├── BACKEND/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── middlewares/
│   │   └── app.js
│   ├── package.json
│   └── .env
│
└── FRONTEND/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── Pages/
    │   ├── redux/
    │   ├── utils/
    │   ├── constants/
    │   ├── assets/
    │   └── App.jsx
    ├── package.json
    └── .env
```

## 🔑 Key Features Implementation

### Route Calculation
The application uses Google Maps API to calculate accurate route information:
- Distance between stops
- Duration of travel
- Polylines for map display
- Optimized routing between multiple stops

### Ride Matching Algorithm
When users search for rides, the system:
1. Identifies rides passing through or near the requested pickup and drop-off locations
2. Calculates relevant stops between the pickup and drop-off points
3. Provides pricing specific to the requested segment

### User Authentication
The platform implements JWT-based authentication with:
- Secure password hashing
- Token-based session management
- Role-based access control (passenger/driver)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Google Maps API](https://developers.google.com/maps)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Tailwind CSS](https://tailwindcss.com/)
- All the contributors who have helped with code, bug reports, and feedback
