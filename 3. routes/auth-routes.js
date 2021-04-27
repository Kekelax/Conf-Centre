const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { ensureAuth } = require("../5. auth-middleware/auth-helper");
const User = require("../4. models/user-model");

/**
 * @route   Post /auth/spotify - SPOTIFY
 * @desc    Authenticate user via Spotify
 * @access  Public
 */
router.get(
  "/spotify",
  passport.authenticate("spotify", { scope: ["user-read-email"] })
);

/**
 * @route   GET /auth/spotify/callback - SPOTIFY
 * @desc    Callback for Spotify to redirect to
 * @access  Public
 */
router.get(
  "/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/auth/login/failed" }),
  (req, res) => {
    res.status(200).redirect("/profile");
  }
);

/**
 * @route   GET /auth/google - GOOGLE
 * @desc    Authenticate user via google
 * @access  Public
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

/**
 * @route   GET /auth/google/callback - GOOGLE
 * @desc    Callback for google to redirect to
 * @access  Public
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
  }),
  (req, res) => {
    res.status(200).redirect("/profile");
  }
);

/**
 * @route   Post /auth/login - LOCAL
 * @desc    Register new user
 * @access  Public
 */

router.post("/login", async (req, res, next) => {
  passport.authenticate("local", async (error, user, info) => {
    try {
      //req.login is provided by passport to serilize user id
      req.login(user, async (error) => {
        if (error) {
          return res.status(401).json({
            msg: info.msg,
          });
        }

        return res.send({
          user: {
            _id: user._id,
            user_name: user.user_name,
            email: user.email,
            super_user: user.super_user,
          },
          msg: `${user.user_name} logged in successfully`,
        });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

/**
 * @route   Post /auth/register
 * @desc    Register new user
 * @access  Public
 */

router.post("/register", async (req, res) => {
  const { user_name, email, password } = req.body;

  /* >>> Validation <<< */
  //Incompete fields
  if (!email || !password || !user_name) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // Password length validation
  if (password.length < 8) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 8 characters" });
  }

  try {
    //Check if user already exists
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: " User aleady exists" });

    //If the user does not exist, salt and hash the password
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);

    //create and save the new user
    const newUser = new User({
      user_name,
      email,
      password: hash,
      type: "LOCAL",
      super_user: false,
    });

    const savedUser = await newUser.save();
    if (!savedUser)
      res.status(400).json({ msg: "Could not register the user" });

    //response: user + message to indicate that user is registered

    res.status(200).json({
      user: {
        _id: savedUser._id,
        user_name: savedUser.user_name,
        email: savedUser.email,
        super_user: savedUser.super_user,
      },
      msg: `User ${savedUser.user_name} registered successfully`,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

/**
 * @route   GET /auth/login/failed
 * @desc    Send message when login fails
 * @access  Public
 */

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User authentication failed.",
  });
});

/**
 * @route   GET /auth/login/success
 * @desc    Send user information when logged in successfully
 * @access  Public
 */
router.get("/login/success", ensureAuth, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      msg: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

/**
 * @route   GET /auth/user
 * @desc    Get user data
 * @access  Private
 */

// Gets user without the password if the token is valid
router.get("/user", ensureAuth, async (req, res) => {
  try {
    //select('-password') excludes the password
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "Invalid user" });
    } else {
      res.status(200).send({
        user: {
          _id: user._id,
          user_name: user.user_name,
          email: user.email,
          super_user: user.super_user,
        },
      });
    }
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET /auth/logout
 * @desc    Logout user
 * @access  Public
 */

router.get("/log-out", async (req, res) => {
  try {
    req.session = null;
    req.logout();
    return res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    return res.status(400).json({ msg: "Cannot logout user", error });
  }

  // res.clearCookie("express:sess", { path: "/", httpOnly: true });
  // res.clearCookie("express:sess.sig", { path: "/", httpOnly: true });

  // try {
  // req.user = null;
  // delete req.session;
  //   return res.status(200).json({ msg: "Logout successful" });
  // } catch (error) {
  //   return res.status(400).json({ msg: "could not log user out", error });
  // }
});

module.exports = router;
