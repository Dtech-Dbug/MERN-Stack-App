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
	updateProduct,
	list,
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

router.put(
	"/product/:slug",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	updateProduct
);

//we are using post method
// because it is easier to send data in the req.body in post method
// we will send data , like count, limit , order , sort to list products based on certain options => for new sellers and best sellers
router.post("/products", list);
module.exports = router;
