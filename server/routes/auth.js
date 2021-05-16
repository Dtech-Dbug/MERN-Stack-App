const express = require("express");

const router = express.Router();
const { authController } = require("../controllers/auth");

router.get("/create-update-user", authController);

module.exports = router;
