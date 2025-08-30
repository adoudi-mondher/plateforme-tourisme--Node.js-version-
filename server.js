// server.js
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const sequelize = require("./config/db");
const setUserLocals = require("./middlewares/setUserLocals");

const app = express();

// --- Middlewares globaux ---
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Sessions
app.use(
  session({
    secret: "super_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash messages
app.use(flash());

// ✅ Nouveau middleware global pour les flash messages
app.use((req, res, next) => {
  res.locals.messages = req.flash() || {}; // { error: [], success: [] }
  next();
});

// Middleware global pour rendre `user` dispo dans toutes les vues
app.use(setUserLocals);

// View engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Import des routes ---
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const accountRoutes = require("./routes/account");
const appointmentRoutes = require("./routes/appointments");
const feedbackRoutes = require("./routes/feedback");

// --- Montage des routes ---
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", accountRoutes);
app.use("/", appointmentRoutes);
app.use("/", feedbackRoutes);

// --- Route principale ---
app.get("/", (req, res) => {
  res.render("index");
});

// --- Lancer le serveur ---
const PORT = 3000;
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to MariaDB");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
