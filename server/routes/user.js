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
} = require("../controllers/userCart");

router.post("/user/cart", createOrUpdateUserMiddleware, userCart); //save cartItems in DB
router.get("/user/cart", createOrUpdateUserMiddleware, getUserCart); //get user cart info from out own backend
router.delete("/user/cart", createOrUpdateUserMiddleware, emptyUserCart); // empty cart
router.post("/user/address", createOrUpdateUserMiddleware, userAddress); //save address of user

module.exports = router;
