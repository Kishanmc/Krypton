# Krypton Backend

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```env
# Server Configuration
PORT=4000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/krypton

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Environment
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

## API Endpoints

- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile (protected)
- GET `/api/simulations` - Get all simulations
