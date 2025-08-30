const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// REGISTER
router.get("/register", authController.getRegister);
router.post("/register", authController.postRegister);

// LOGIN
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

// LOGOUT
router.get("/logout", authController.logout);

module.exports = router;
