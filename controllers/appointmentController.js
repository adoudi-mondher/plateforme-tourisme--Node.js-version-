const Appointment = require("../models/Appointment");

// --- BOOK APPOINTMENT ---
exports.getBookAppointment = (req, res) => {
  if (!req.session.user_id) return res.redirect("/login");
  res.render("book_appointment");
};

exports.postBookAppointment = async (req, res) => {
  if (!req.session.user_id) return res.redirect("/login");

  try {
    const { service, date } = req.body;
    await Appointment.create({
      user_id: req.session.user_id,
      service_name: service,
      appointment_date: date,
      status: "pending",
    });

    req.flash("success", "تم حجز موعدك بنجاح!");
    res.redirect("/my_appointments");
  } catch (err) {
    console.error(err);
    req.flash("error", "حدث خطأ أثناء حجز الموعد.");
    res.redirect("/book_appointment");
  }
};

// --- MY APPOINTMENTS ---
exports.getMyAppointments = async (req, res) => {
  if (!req.session.user_id) return res.redirect("/login");

  try {
    const appointments = await Appointment.findAll({
      where: { user_id: req.session.user_id },
      order: [["appointment_date", "DESC"]],
    });

    res.render("my_appointments", { appointments });
  } catch (err) {
    console.error(err);
    req.flash("error", "تعذر تحميل المواعيد.");
    res.render("my_appointments", { appointments: [] });
  }
};

// --- CANCEL APPOINTMENT ---
exports.cancelAppointment = async (req, res) => {
  if (!req.session.user_id) return res.redirect("/login");

  try {
    const { appointment_id } = req.params;
    await Appointment.destroy({
      where: {
        id: appointment_id,
        user_id: req.session.user_id, // sécurité
      },
    });

    req.flash("success", "تم إلغاء الموعد بنجاح.");
    res.redirect("/my_appointments");
  } catch (err) {
    console.error(err);
    req.flash("error", "تعذر إلغاء الموعد.");
    res.redirect("/my_appointments");
  }
};
