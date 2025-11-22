const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const verifyToken = require("../middleware/verifyToken");

// Save a quiz score
router.post("/save-quiz", verifyToken, async (req, res) => {
  const { score } = req.body;

  try {
    const newQuiz = new Quiz({
      user: req.user.id,
      score
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz saved successfully", quiz: newQuiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get quiz history
router.get("/history", verifyToken, async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;