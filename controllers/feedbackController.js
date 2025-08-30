const Feedback = require("../models/Feedback");
const path = require("path");

// --- GET FEEDBACK PAGE ---
exports.getFeedbackPage = async (req, res) => {
  try {
    const feedbacks = await Feedback.findAll({
      order: [["submitted_at", "DESC"]],
    });
    res.render("feedback", { feedbacks });
  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء تحميل التعليقات.");
    res.render("feedback", { feedbacks: [] });
  }
};

// --- SUBMIT FEEDBACK ---
exports.submitFeedback = async (req, res) => {
  try {
    let name, user_id = null;
    if (req.session.user_id) {
      user_id = req.session.user_id;
      name = req.session.user_name;
    } else {
      name = req.body.visitorName;
    }

    const email = req.body.visitorEmail;
    const opinion = req.body.visitorOpinion;

    let media_path = "";
    let media_type = "";

    if (req.file) {
      media_path = path.join("uploads", req.file.filename).replace(/\\/g, "/");
      media_type = req.file.mimetype.includes("video") ? "video" : "image";
    }

    await Feedback.create({
      name,
      email,
      opinion,
      media_path,
      media_type,
      user_id,
    });

    req.flash("success", "شكراً على رأيك، تم إرساله بنجاح!");
    res.redirect("/feedback");
  } catch (err) {
    console.error(err);
    req.flash("error", "تعذر إرسال رأيك.");
    res.redirect("/feedback");
  }
};

// --- MY FEEDBACK ---
exports.getMyFeedback = async (req, res) => {
  if (!req.session.user_id) return res.redirect("/login");

  try {
    const feedbacks = await Feedback.findAll({
      where: { user_id: req.session.user_id },
      order: [["submitted_at", "DESC"]],
    });

    res.render("my_feedback", { feedbacks });
  } catch (err) {
    console.error(err);
    req.flash("error", "تعذر تحميل تعليقاتك.");
    res.render("my_feedback", { feedbacks: [] });
  }
};
