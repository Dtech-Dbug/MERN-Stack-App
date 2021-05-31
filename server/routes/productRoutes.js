const express = require("express");

const router = express.Router();
//middlewares
const {
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
} = require("../middlewares/authMiddleware");

const {
	createProduct,
	listProducts,
} = require("../controllers/productControllers");

router.post(
	"/product",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	createProduct
);

router.get("/products/:count", listProducts);
module.exports = router;
