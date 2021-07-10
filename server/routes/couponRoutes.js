const express = require("express");

const router = express();

//middlewares
const {
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
} = require("../middlewares/authMiddleware");

//controllers

const { create, remove, list } = require("../controllers/couponControllers");

//routes
router.post(
	"/coupon",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	create
);
router.get("/coupons", list);
router.delete(
	"/coupon/:couponId",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	remove
);

module.exports = router;
