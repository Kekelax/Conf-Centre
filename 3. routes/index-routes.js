const router = require("express").Router();
const { ensureAuth } = require("../5. auth-middleware/auth-helper");

/**
 * @route   GET /profile
 * @desc    Redirects to the Home page after login
 * @access  Internal
 */

router.get("/", ensureAuth, (req, res) => {
  //in development http://localhost:3000/home
  res.redirect("https://rocky-thicket-50181.herokuapp.com/home");
});

module.exports = router;
