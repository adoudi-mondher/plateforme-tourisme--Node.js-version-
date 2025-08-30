const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middlewares/authMiddleware");

// --- CONTROLLER ---
const userController = require("../controllers/userController");

// --- ESPACE UTILISATEUR ---
router.get("/espace", ensureAuth, userController.getEspace);

module.exports = router;
