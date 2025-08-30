const bcrypt = require("bcryptjs");
const User = require("../models/User");

// --- REGISTER ---
exports.getRegister = (req, res) => {
  res.render("register");
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      req.flash("error", "هذا البريد الإلكتروني مسجل بالفعل.");
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password_hash: hashedPassword,
    });

    req.flash("success", "تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
    res.redirect("/login");

  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء التسجيل.");
    res.redirect("/register");
  }
};

// --- LOGIN ---
exports.getLogin = (req, res) => {
  res.render("login");
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.flash("error", "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return res.redirect("/login");
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      req.flash("error", "البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      return res.redirect("/login");
    }

    req.session.user_id = user.id;
    req.session.user_name = user.name;

    res.redirect("/espace");

  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء تسجيل الدخول.");
    res.redirect("/login");
  }
};

// --- LOGOUT ---
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
