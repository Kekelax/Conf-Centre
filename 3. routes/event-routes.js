const router = require("express").Router();
const Event = require("../4. models/event-model");
const { ensureAuth, superUser } = require("../5. auth-middleware/auth-helper");

/**
 * @route   GET /api/events/all
 * @desc    Get All Events
 * @access  Private - normal user
 */
router.get("/all", ensureAuth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: +1 });
    if (!events)
      return res.status(400).json({ msg: "There are no upcoming events" });
    return res.status(200).json({ events });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

/**
 * @route   POST api/events
 * @desc    Create An Event
 * @access  Private - admin user
 */

router.post("/", ensureAuth, superUser, async (req, res) => {
  const newEvent = new Event({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
    presenter: req.body.presenter,
  });

  try {
    const event = await newEvent.save();
    if (!event)
      return res
        .status(400)
        .json({ msg: "Something went wrong saving the item" });

    return res.status(200).json(event);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PUT /api/events/:id
 * @desc    Edit an event
 * @access  Private - super user
 */

router.put("/:id", ensureAuth, superUser, async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({ msg: "Could not update the event" });
    }

    return res.status(200).json({ success: true, event: event });
  } catch (error) {
    return res.status(400).json({ msg: "Event not found", success: false });
  }
});

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event
 * @access  Private - super user
 */
router.delete("/:id", ensureAuth, superUser, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    const removed = await event.remove();
    if (!removed)
      return res.status(400).json({ msg: "Could not delete event!" });

    return res
      .status(200)
      .json({ success: true, msg: `Event ${event.name} has been removed` });
  } catch (error) {
    return res.status(400).json({
      msg: "Event not found",
      success: false,
    });
  }
});

module.exports = router;
