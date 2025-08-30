// controllers/userController.js

// --- GET USER DASHBOARD ---
exports.getEspace = (req, res) => {
  const userName = req.session.user_name || "زائر";
  res.render("espace", { user_name: userName });
};
