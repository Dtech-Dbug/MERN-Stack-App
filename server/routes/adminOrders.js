const express = require("express");
const router = express.Router();

//middlewares

const {
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
} = require("../middlewares/authMiddleware");

//controllers
const {
	adminOrders,
	adminOrderStatus,
} = require("../controllers/adminOrderControllers");

//routes

router.get(
	"/admin/orders",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	adminOrders
);

router.put(
	"/admin/order-status",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	adminOrderStatus
);

module.exports = router;
