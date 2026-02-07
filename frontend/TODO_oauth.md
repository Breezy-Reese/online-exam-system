# OAuth Implementation TODO

## Backend Changes
- [x] Update backend/package.json: Add passport, passport-google-oauth20, passport-facebook, express-session dependencies
- [x] Update backend/models/User.js: Add provider, providerId, profilePicture fields to schema
- [x] Update backend/controllers/authController.js: Add OAuth strategies and callback functions
- [x] Update backend/routes/auth.js: Add /auth/google, /auth/google/callback, /auth/facebook, /auth/facebook/callback routes

## Frontend Changes
- [x] Update frontend/src/auth/Login.jsx: Add Google and Facebook login buttons
- [x] Update frontend/src/context/AuthContext.jsx: Handle OAuth login responses

## Setup and Testing
- [x] Install new dependencies with npm install
- [ ] Set up environment variables for Google/Facebook client IDs and secrets
- [ ] Test OAuth flows for both providers
