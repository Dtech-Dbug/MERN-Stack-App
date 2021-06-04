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
	removeProduct,
	readProduct,
} = require("../controllers/productControllers");

router.post(
	"/product",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	createProduct
);

router.get("/products/:count", listProducts);
router.delete(
	"/product/:slug",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	removeProduct
);

router.get("/product/:slug", readProduct);
module.exports = router;
