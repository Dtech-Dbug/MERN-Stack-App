const User = require("../model/userModel");
const ProductModel = require("../model/productModel");
const CartModel = require("../model/cart");
const CouponModel = require("../model/couponModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
	console.log("Requet to stripe backend coming");
	//apply coupon

	//later caluculate price

	const paymentIntent = await stripe.paymentIntents.create({
		amount: 200,
		currency: "usd",
	});

	console.log("secret", paymentIntent.client_secret);

	res.send({
		clientSecret: paymentIntent.client_secret,
	});
};
