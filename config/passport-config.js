const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const AdminModel = require("../models/accounts/Admin");
const StudentModel = require("../models/accounts/Student");
const StaffModel = require("../models/accounts/Staff");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        // Find user by email
        let user =
          (await AdminModel.findByEmail(email)) ||
          (await StaffModel.findByEmail(email)) ||
          (await StudentModel.findByEmail(email));
        console.log("User by email: ", user);
        if (!user) {
          return done(null, false, {
            message: "User email not found.",
          });
        }

        // Find user by number
        let UserByNumber =
          (await AdminModel.findByNumber(req.body.number)) ||
          (await StaffModel.findByNumber(req.body.number)) ||
          (await StudentModel.findByNumber(req.body.number));
        console.log("User by number:", UserByNumber);
        if (!UserByNumber) {
          return done(null, false, {
            message: "User number not found.",
          });
        }

        // Ensure the same user is being compared for password
        if (user.id !== UserByNumber.id) {
          return done(null, false, {
            message: "Email and number do not match.",
          });
        }

        console.log("User password:", user.password);

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        // Authentication successful
        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user =
      (await AdminModel.findById(id)) ||
      (await StudentModel.findById(id)) ||
      (await StaffModel.findById(id));
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
