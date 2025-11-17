const express = require("express");
const router = express.Router();
const Scan = require("../models/Scan");
const verifyToken = require("../middleware/verifyToken");

// Save a scan result
router.post("/save-scan", verifyToken, async (req, res) => {
  const { url, prediction, confidence } = req.body;

  try {
    const newScan = new Scan({
      user: req.user.id,
      url,
      prediction,
      confidence
    });

    await newScan.save();
    res.status(201).json({ message: "Scan saved successfully", scan: newScan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get scan history
router.get("/history", verifyToken, async (req, res) => {
  try {
    const scans = await Scan.find({ user: req.user.id }).sort({ timestamp: -1 });
    res.status(200).json(scans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
