const express = require("express");
const router = express.Router();
const libUser = require("../library/user");

router.post("/updateRemove", (req, res) => {
  res.status(200).json({ message: "use this to update or Users" });
});

module.exports = router;
