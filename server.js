const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const keys = require("./1. config/app_keys");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const uuid = require("uuid");

//passport config
require("./2. passport/google-setup")(passport);
require("./2. passport/local-setup")(passport);
require("./2. passport/spotify-setup")(passport);

//Connect to the database
const connectDB = require("./1. config/db");
connectDB();

//initialise app
const app = express();

// Body parser - middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*Create cookie, set max age and encrypt. The user.id from 
passport.serializeUser is encrypted
req.session = null destroys the session */
app.use(
  cookieSession({
    //6 hours in milliseconds
    maxAge: 6 * 60 * 60 * 1000,
    //encrypts the cookie
    keys: [keys.session.cookieKey],
  })
);

//express-sessions

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); //calls serializeUser and deserializeUser

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

// Logger Middleware
app.use(morgan("dev"));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "'sha256-AbpHGcgLb+kRsJGnwFEktk7uzpZOCcBY74+YBdrKVGs='",
      ],
      scriptSrc: [
        "'self'",
        "'sha256-23x2GFHfhDJdz/gVrWDZ3jaLJa81IVlcg8shb+ybmGY='",
        "'sha256-pBzGnml1J7LHqcNE9yYI5finqLSFeYMeBveyzR6FFSQ='",
        "'sha256-RRtI1mKbaJT8CmPkWm5fHb2In1iU2aKwh/MwSLSFSIs='",
        "'sha256-tZDD7MGS7J/IVZlRVHapSw+dBwfvDisbcHJkK+zfFdc='",
        "'sha256-t8OQin0A1j3sFdiRWv5VN0BQXGbA/ogpj0jHqOsRenc='",
        "'sha256-zwgCPziv3PM8+Lu+8WAwZEx7AaLHy4svqMy/YA99zNk='",
      ],
      objectSrc: ["'self'"],
      connectSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'sha256-AbpHGcgLb+kRsJGnwFEktk7uzpZOCcBY74+YBdrKVGs='",
        "'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='",
        "'sha256-PpoL88sugL+MixGj6eFNM05Q0l/B2tpC9guyJrsQkSY='",
        "'sha256-6y7WJjf5UmqTyodR6qZk7zX4EDmiF+mg2XwcPgt7NsQ='",
        "'sha256-3o6aGi9efyCkMyrM2+XnTSuD7E2AcZqZHx/vJIcMTEk='",
        "'sha256-WaLtjyvhQ+ec59kPSl7fj/jr7CoYKz09r5j3bZPkO9s='",
        "'sha256-TNucpMncdBIdGN21J1AQ41FTrENVPgFQGmIwT1anmDU='",
        "'sha256-v9LJ393EYr/Yhqpbx9NqEQtgfxOsO+1HcWEsyWdaOXg='",
        "'sha256-PdxVvQiRJA5ui7Y+JLzvmm9Ns9a/4g6hd4OaZ+TLbF8='",
        "'sha256-8oQu3cOkcEPQbgEW6XuFmh5d3hFhtkrs45AyatY9jRE='",
        "'sha256-uAAsmQ8GyQTq74J2SZUVXE1DBI/SozFulTuoIMQL0no='",
        "'sha256-+jNWTj6uDJaKEf1VhUlw1geE5z0FCOkG5u+WXuD61eA='",
        "'sha256-tekUYy0NkA+O1VOKFNT8dKWreGklo3ejoHu6gC++VBI='",
        "'sha256-T9iUMBW8EQAFaDRoSQMJeUSQAyR3rSkNNc8ITOy4abs='",
        "'sha256-OpS/uvdnn2m5jT0s1hYF/Q09jeJxeJeHj2SqE7YVPAc='",
        "'sha256-2mu914TTreiNh2ST95Fi4ol/mnDn+KQdPrrvGtWB4ug='",
        "'sha256-ssZ1V1m/8GnwzCnUhoFiI2qDO6B4qjI51G460j8zvrs='",
        "'sha256-xpbJ0EVXfdZRwJNetsELtnoyFPsu2RMMCFHolkilxZY='",
        "'sha256-8qJMYab1O16TUZAW+FmaGOOYT4O09DL84wKEUKQjNSY='",
        "'sha256-pBzGnml1J7LHqcNE9yYI5finqLSFeYMeBveyzR6FFSQ='",
        "'sha256-C9X6+bMRIg5XqBmThFrfn61nsSc8vRtxEFra25DVJTI='",
        "'sha256-/lxpovrcxa5w/Nv2yBK8vKeMoDYhgykxv0tCH4OpcAQ='",
        "'sha256-WF5kMjby4N5O2z6P4kl2XsHY/bhjbNDs8UJ9Ur4qz+g='",
        "'sha256-QM7z022F/+keLcoNk1UMKDktesHLf+yj01dGOFdrX9Y='",
      ],
    },
  })
);

//Routes
app.use("/auth", require("./3. routes/auth-routes"));
app.use("/profile", require("./3. routes/index-routes"));
app.use("/api/events", require("./3. routes/event-routes"));
app.use("/api/users", require("./3. routes/user-routes"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server - listen to port 4000 or a port specified in process.env
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`>>> Server is listening on port ${PORT} <<<`);
});

// CATCH 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// ERROR handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
