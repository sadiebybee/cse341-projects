const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const mongodb = require("../db/connect");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const db = mongodb.getDb().db("expenses");
        let user = await db
          .collection("users")
          .findOne({ gitHubID: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = {
          gitHubID: profile.id,
          name: profile.username,
          displayName: profile.displayName,
          email: profile.emails,
          avatar: profile.photos,
          createdAt: new Date(),
        };

        const result = await db.collection("users").insertOne(newUser);
        return done(null, newUser);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.gitHubID);
});
passport.deserializeUser(async (gitHubID, done) => {
  try {
    const db = mongodb.getDb().db("expenses");
    const user = await db.collection("users").findOne({ gitHubID: gitHubID });
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;