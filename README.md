# Krypton - Educational Science Platform

A comprehensive educational platform featuring interactive 3D science labs, AI-powered chat assistant, and immersive learning experiences.

## Features

- **3D Science Labs**: Interactive physics, chemistry, and biology simulations
- **AI Chat Assistant**: Voice-controlled AI assistant powered by Google Gemini
- **User Authentication**: Secure login/signup with role-based access
- **Responsive Design**: Mobile-friendly interface
- **Real-time Simulations**: External simulation integrations

## Tech Stack

### Frontend
- React 19
- React Router DOM
- Three.js & React Three Fiber
- CSS3 with responsive design

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### External Integrations
- Google Gemini AI API
- Web Speech API
- Netlify-hosted 3D simulations

## Project Structure

```
krypton/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── component/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app component
│   └── package.json
├── backend/           # Node.js backend
│   ├── controllers/      # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── server.js        # Server entry point
├── admin/             # Admin panel (Vite + React)
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env file with the following variables:
PORT=4000
MONGO_URI=mongodb://localhost:27017/krypton
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

4. Start MongoDB service (if using local MongoDB)

5. Start the backend server:
```bash
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

### Admin Panel Setup (Optional)

1. Navigate to admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Start the admin panel:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (requires auth)

### Simulations
- `GET /api/simulations` - Get all simulations

## Key Features Implementation

### Voice Assistant (Chat)
- Uses Web Speech API for voice recognition
- Integrates with Google Gemini 2.0 Flash API
- Supports text-to-speech responses
- Handles various commands (time, date, search, etc.)

### 3D Labs
- Physics simulations (magnetic fields, projectile motion, etc.)
- Chemistry simulations
- Biology tool viewer
- External iframe integrations with Netlify-hosted apps

### Authentication Flow
- JWT-based authentication
- Role-based access (student, teacher, admin)
- Secure password hashing with bcrypt
- Protected routes and middleware

## Development Commands

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

### Backend
```bash
npm run dev        # Development with nodemon
npm start          # Production server
npm run prod       # Production with NODE_ENV=production
```

## Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the build/ folder to your hosting service
```

### Backend Deployment
```bash
cd backend
npm run build  # Currently just echoes completion
npm run prod   # Production server
```

## Environment Variables

### Backend Required Variables
- `PORT`: Server port (default: 4000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment mode

### Frontend Required Variables
- Gemini API key is currently hardcoded (should be moved to environment variables)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License

## Contact

For support or questions, please open an issue on the GitHub repository.
