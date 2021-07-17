const express = require("express");

const router = express.Router();

//import middleware
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

//controller
const {
	userCart,
	getUserCart,
	emptyUserCart,
	userAddress,
	applyCouponDiscountToCart,

	createOrder,
	listOrders,
} = require("../controllers/userCart");

router.post("/user/cart", createOrUpdateUserMiddleware, userCart); //save cartItems in DB
router.get("/user/cart", createOrUpdateUserMiddleware, getUserCart); //get user cart info from out own backend
router.delete("/user/cart", createOrUpdateUserMiddleware, emptyUserCart); // empty cart
router.post("/user/address", createOrUpdateUserMiddleware, userAddress); //save address of user

//orders
router.post("/user/order", createOrUpdateUserMiddleware, createOrder);
router.get("/user/orders", createOrUpdateUserMiddleware, listOrders);

//coupon
router.post(
	"/user/cart/coupon",
	createOrUpdateUserMiddleware,
	applyCouponDiscountToCart
);

module.exports = router;
