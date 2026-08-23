const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/user.model');

const isProd = process.env.NODE_ENV === 'production';
const defaultCallback = isProd 
  ? 'https://yourfitnessguide.onrender.com/oauth/google/callback'
  : 'http://localhost:5000/oauth/google/callback';

const callbackURL = (process.env.GOOGLE_CALLBACK_URL && !process.env.GOOGLE_CALLBACK_URL.includes('localhost'))
  ? process.env.GOOGLE_CALLBACK_URL
  : (isProd ? defaultCallback : (process.env.GOOGLE_CALLBACK_URL || defaultCallback));

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
  },
  async (profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.email,
          provider: "google"
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
