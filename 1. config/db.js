const mongoose = require("mongoose");
const keys = require("./app_keys");
const testkeys = require("./test_keys");

const dbSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      const conDB = await mongoose.connect(keys.mongodb.URI, dbSettings);
    } else {
      const conDB = await mongoose.connect(
        testkeys.mongodb.TEST_URI,
        dbSettings
      );

      console.log(`>>> Database connected: ${conDB.connection.host} <<<`);
    }
  } catch (error) {
    console.error(">>> Database connection error <<<", error);
    process.exit(1);
  }
};

module.exports = connectDB;
