const express = require("express");
const router = express.Router();

//middlewares
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

//controller
const { createPaymentIntent } = require("../controllers/stripeControllers");

router.post(
	"/create-payment-intent",
	createOrUpdateUserMiddleware,
	createPaymentIntent
);

module.exports = router;
