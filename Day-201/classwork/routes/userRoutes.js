const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
    res.json({ message: "User registered successfully" });
});

router.post("/login", (req, res) => {
    res.json({ message: "User logged in successfully" });
});

module.exports = router;
