const express = require("express");

const router = express.Router();
//middlewares
const {
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
} = require("../middlewares/authMiddleware");

const { createProduct } = require("../controllers/productControllers");

router.post(
	"/product",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	createProduct
);

module.exports = router;
