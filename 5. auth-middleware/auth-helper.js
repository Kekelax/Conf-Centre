module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      //redirect to home page
      res.redirect("http://localhost:3000/login");
    }
  },

  superUser: (req, res, next) => {
    //if super_user is true go to the next function
    if (req.user.super_user) {
      return next();
    } else {
      //redirect to dashboard page
      res.redirect("http://localhost:3000/dash");
    }
  },
};
