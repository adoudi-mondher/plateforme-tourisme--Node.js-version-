// middleware/setUserLocals.js
module.exports = (req, res, next) => {
  res.locals.user = null;

  if (req.session && req.session.user_id) {
    res.locals.user = {
      id: req.session.user_id,
      name: req.session.user_name,
    };
  }

  res.locals.error = req.flash("error") || [];
  res.locals.success = req.flash("success") || [];

  next();
};
