const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");

// Book appointment
router.get("/book_appointment", appointmentController.getBookAppointment);
router.post("/book_appointment", appointmentController.postBookAppointment);

// My appointments
router.get("/my_appointments", appointmentController.getMyAppointments);

// Cancel appointment
router.post("/cancel_appointment/:appointment_id", appointmentController.cancelAppointment);

module.exports = router;
