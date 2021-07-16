const User = require("../model/userModel");
const ProductModel = require("../model/productModel");
const CartModel = require("../model/cart");
const CouponModel = require("../model/couponModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
	try {
		console.log(
			"Requet to stripe backend coming",
			process.env.STRIPE_SECRET_KEY
		);
		//apply coupon

		//later caluculate price

		//1. find the user
		const user = await User.findOne({ email: req.user.email }).exec();

		//2. Find the user's cart : cartTotal
		const { cartTotal } = await CartModel.findOne({ orderedBy: user._id });

		const details = {
			User: user.name,
			Adress: user.address,
			Total: cartTotal,
		};
		console.table(details);

		//3. calcluate the price to pay : later

		//storing the payment intent
		//encapsulates details about the transition
		//uses web hook events to check the statts of paymentIntent,
		//sends the webhook event instead of the whole paymmentIntent to strip to track success status of payment

		const paymentIntent = await stripe.paymentIntents.create({
			amount: 100,
			currency: "usd",
			description: "TESTING MERN APP",
			shipping: {
				name: user.name,
				address: {
					line1: user.address,
				},
			},
		});
		console.log("Payment Intent", paymentIntent);

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (err) {
		console.log("error in strip controller", err, err.message);
	}
};
