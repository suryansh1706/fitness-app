const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const Users = require('../Models/user');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/oauth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await Users.findOne({ googleId: profile.id });

      if (!user) {
        user = await Users.create({
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

