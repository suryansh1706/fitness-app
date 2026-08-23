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
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.email || (profile.emails && profile.emails[0] && profile.emails[0].value);
      const googleId = profile.id;
      const displayName = profile.displayName || profile.name?.givenName || (email ? email.split('@')[0] : 'User');

      if (!email) {
        return done(new Error("No email address associated with this Google account"), false);
      }

      let user = await User.findOne({
        $or: [{ googleId: googleId }, { email: email }]
      });

      if (!user) {
        user = await User.create({
          googleId: googleId,
          displayName: displayName,
          username: displayName,
          email: email,
          provider: "google",
          isVerified: true
        });
      } else {
        let updated = false;
        if (!user.googleId) {
          user.googleId = googleId;
          updated = true;
        }
        if (!user.isVerified) {
          user.isVerified = true;
          updated = true;
        }
        if (updated) {
          await user.save();
        }
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

module.exports = passport;
