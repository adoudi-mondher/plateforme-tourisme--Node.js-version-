const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middlewares/authMiddleware");

// --- CONTROLLER ---
const accountController = require("../controllers/accountController");

// --- ACCOUNT SETTINGS ---
router.get("/account_settings", ensureAuth, accountController.getAccountSettings);
router.post("/account_settings", ensureAuth, accountController.postAccountSettings);

module.exports = router;
