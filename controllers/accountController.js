const User = require("../models/User");

// --- GET ACCOUNT SETTINGS ---
exports.getAccountSettings = async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }

  try {
    const user = await User.findByPk(req.session.user_id, {
      attributes: ["name", "email"],
    });

    if (!user) {
      req.flash("error", "المستخدم غير موجود.");
      return res.redirect("/login");
    }

    res.render("account_settings", { user });

  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء تحميل البيانات.");
    res.redirect("/espace");
  }
};

// --- UPDATE ACCOUNT SETTINGS ---
exports.postAccountSettings = async (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/login");
  }

  try {
    const { name, email } = req.body;

    await User.update(
      { name, email },
      { where: { id: req.session.user_id } }
    );

    req.session.user_name = name; // mettre à jour la session
    req.flash("success", "تم تحديث معلومات الحساب بنجاح!");
    res.redirect("/account_settings");

  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء تحديث الحساب.");
    res.redirect("/account_settings");
  }
};
