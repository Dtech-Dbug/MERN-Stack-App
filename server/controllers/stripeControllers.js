const User = require("../model/userModel");
const ProductModel = require("../model/productModel");
const CartModel = require("../model/cart");
const CouponModel = require("../model/couponModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
	console.log(req.body);

	try {
		console.log(
			"Requet to stripe backend coming",
			process.env.STRIPE_SECRET_KEY
		);

		//destructure coupon information sent from frontEnd
		const { couponApplied } = req.body;

		//later caluculate price

		//1. find the user
		const user = await User.findOne({ email: req.user.email }).exec();

		//2. Find the user's cart : cartTotal
		const { cartTotal, totalAfterDiscount } = await CartModel.findOne({
			orderedBy: user._id,
		});

		let finalPrice = 0;

		//check if coupon applied is true , if yes apply discount
		if (couponApplied && totalAfterDiscount) {
			finalPrice = Math.round(totalAfterDiscount);
		} else {
			finalPrice = Math.round(cartTotal);
		}

		const details = {
			User: user.name,
			Adress: user.address,
			Total: cartTotal,
			appliedCoupon: couponApplied,
			total: finalPrice,
		};
		console.table(details);

		//3. calcluate the price to pay : later

		//storing the payment intent
		//encapsulates details about the transition
		//uses web hook events to check the statts of paymentIntent,
		//sends the webhook event instead of the whole paymmentIntent to strip to track success status of payment

		const paymentIntent = await stripe.paymentIntents.create({
			description: "TESTING MERN APP",
			shipping: {
				name: user.name,
				address: {
					line1: user.address,
					// postal_code: "700150",
					// city: "India",
					// state: "WB",
					// country: "INDIA",
				},
			},
			amount: finalPrice,
			currency: "inr",
		});
		console.log("Payment Intent", paymentIntent);

		res.send({
			clientSecret: paymentIntent.client_secret,
			info: details,
		});
	} catch (err) {
		console.log("error in strip controller", err, err.message);
	}
};
