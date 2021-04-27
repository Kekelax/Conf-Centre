const router = require("express").Router();
const { ensureAuth, superUser } = require("../5. auth-middleware/auth-helper");
const User = require("../4. models/user-model");

/**
 * @route   GET /api/users
 * @desc    Get All Users
 * @access  Private - super user
 */
router.get("/", ensureAuth, superUser, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users)
      return res
        .status(400)
        .json({ msg: "There are no users in the database" });
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   PUT /api/users
 * @desc    Update user access
 * @access  Private - super user
 */
router.put("/:id", ensureAuth, superUser, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(400).json({ msg: "Could not update this user" });
    }

    return res.status(200).json({ success: true, user: user });
  } catch (error) {
    return res.status(400).json({ msg: "Event not found", success: false });
  }
});

module.exports = router;
