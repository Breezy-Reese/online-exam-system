const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      // For security, don't reveal if email exists or not
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // TODO: Generate reset token and send email
    // For now, just log it
    console.log(`Password reset requested for: ${email}`);

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Passport strategies - only initialize if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'google' });
      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          // Link existing user with Google
          user.provider = 'google';
          user.providerId = profile.id;
          user.profilePicture = profile.photos[0].value;
          await user.save();
        } else {
          // Create new user
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
            providerId: profile.id,
            profilePicture: profile.photos[0].value,
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ providerId: profile.id, provider: 'facebook' });
      if (!user) {
        user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          // Link existing user with Facebook
          user.provider = 'facebook';
          user.providerId = profile.id;
          user.profilePicture = profile.photos[0].value;
          await user.save();
        } else {
          // Create new user
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'facebook',
            providerId: profile.id,
            profilePicture: profile.photos[0].value,
          });
          await user.save();
        }
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// OAuth routes
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', { failureRedirect: '/login' });

exports.facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

exports.facebookAuthCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

exports.oauthSuccess = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
  // Redirect to frontend with token
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:3000'}/oauth/callback?token=${token}`);
};
