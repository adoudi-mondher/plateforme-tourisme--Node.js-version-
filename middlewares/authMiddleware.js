// middlewares/authMiddleware.js

// Vérifie si l'utilisateur est connecté
exports.ensureAuth = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }
  next();
};

// Rendre l'utilisateur disponible dans toutes les vues (EJS)
exports.setUserLocals = (req, res, next) => {
  res.locals.user = req.session.user_id ? {
    id: req.session.user_id,
    name: req.session.user_name
  } : null;
  next();
};
