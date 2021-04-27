const mongoose = require("mongoose");

//Event DB schema

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  presenter: {
    type: String,
    required: false,
  },
});

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
