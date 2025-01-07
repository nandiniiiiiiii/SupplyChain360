const express = require("express");
const { authenticateJWT } = require("../middleware/authenticatejwt.middleware.js");
const { checkPermission } = require("../middleware/checkpermission.middleware.js");

const router = express.Router();

// Factory Manager Routes
router.get(
  "/factory/dashboard",
  authenticateJWT,
  checkPermission("view_factory"),
  (req, res) => {
    res.json({ message: "Welcome to Factory Dashboard" });
  }
);

router.post(
  "/factory/inventory",
  authenticateJWT,
  checkPermission("manage_inventory"),
  (req, res) => {
    res.json({ message: "Inventory updated successfully!" });
  }
);

// Logistics Manager Routes
router.get(
  "/logistics/shipments",
  authenticateJWT,
  checkPermission("track_shipments"),
  (req, res) => {
    res.json({ message: "Shipments list displayed." });
  }
);

router.post(
  "/logistics/routes",
  authenticateJWT,
  checkPermission("optimize_routes"),
  (req, res) => {
    res.json({ message: "Routes optimized successfully!" });
  }
);

// Analyst Routes
router.get(
  "/analytics/reports",
  authenticateJWT,
  checkPermission("view_reports"),
  (req, res) => {
    res.json({ message: "Report data retrieved successfully." });
  }
);

router.post(
  "/analytics/forecast",
  authenticateJWT,
  checkPermission("generate_forecast"),
  (req, res) => {
    res.json({ message: "Forecast generated successfully." });
  }
);

// Executives Routes
router.get(
  "/executive/overview",
  authenticateJWT,
  checkPermission("view_overview"),
  (req, res) => {
    res.json({ message: "Overview data displayed." });
  }
);

// Support Routes
router.get(
  "/support/tickets",
  authenticateJWT,
  checkPermission("view_tickets"),
  (req, res) => {
    res.json({ message: "Support tickets displayed." });
  }
);

router.post(
  "/support/tickets",
  authenticateJWT,
  checkPermission("manage_tickets"),
  (req, res) => {
    res.json({ message: "Support ticket updated." });
  }
);

// External Users Routes
router.get(
  "/external/public-info",
  (req, res) => {
    res.json({ message: "Public information displayed." });
  }
);

router.post(
  "/external/feedback",
  authenticateJWT,
  checkPermission("submit_feedback"),
  (req, res) => {
    res.json({ message: "Feedback submitted successfully." });
  }
);

module.exports = router;
