const User = require("../model/userModel");
const ProductModel = require("../model/productModel");
const CartModel = require("../model/cart");
const CouponModel = require("../model/couponModel");
const { findOne, findById } = require("../model/userModel");

exports.userCart = async (req, res) => {
	console.log("cart controller::", req.body);
	const { cart } = req.body;

	//before we save we need to do a few things
	//create a prodcuct Array : because the product object will have some additional info , we provided while saving the products to cart , like : count
	//because some info are nit in the productModel they are coming from FE, so we create a whole new array
	//we need to push the items from cart to the new creatd product array

	let cartProducts = [];

	//before we do anything else , we also need to find the user
	const user = await User.findOne({ email: req.user.email }).exec();

	//check if loggedin user had already cart.
	let existingCartOfUser = await CartModel.findOne({
		orderedBy: user._id,
	}).exec();

	//If user does habe existing cart, we need to start afresh, beacsue users will have only one cart always.
	if (existingCartOfUser) {
		console.log("existing cart removed");
		existingCartOfUser.remove();
	}

	//looping through the cart array and push them in the new cartProducts array, to save the info to DB

	for (let i = 0; i < cart.length; i++) {
		//create a blank object to push in the object properties of products object
		//then push theis obkect array to cartProducts array that we initialised at the top

		let object = {};
		object.product = cart[i]._id; //refer to the product model , check cartModel scheema
		object.count = cart[i].count;
		object.color = cart[i].color;

		//price : essential to grab the price from DAtabase for security
		const { price } = await ProductModel.findById(cart[i]._id)
			.select("price")
			.exec();

		//push price to the object
		object.price = price;

		//push this object to the cartProducts array we cratee at top
		cartProducts.push(object);
	}

	console.log("Cart Products", cartProducts);

	//getting the total of the cart : price
	let cartTotal = 0;
	for (let i = 0; i < cartProducts.length; i++) {
		cartTotal = cartTotal + cartProducts[i].price * cartProducts[i].count;
	}

	console.log("Total Of cart value", cartTotal);

	//time for saving these in the cart database
	let newCart = await new CartModel({
		products: cartProducts,
		cartTotal,
		orderedBy: user._id,
	}).save();

	console.log("new saved cart", newCart);

	res.json({ ok: true });
	//we do not have to send anuthing as response
	//in the FE we are just checking if res.data.ok = true
	//if true we redirect user to chacekout page
};

exports.getUserCart = async (req, res) => {
	//check user
	const user = await User.findOne({ email: req.user.email }).exec();

	//check cart Items based on user
	let cart = await CartModel.findOne({ orderedBy: user._id })
		.populate("products.product", "_id title price totalAfterDiscount")
		.exec();

	const { products, cartTotal, totalAfterDiscount } = cart;
	//destructure for simplicity

	res.json({ products, cartTotal, totalAfterDiscount });
	//so that we can acces them like : res.data.products | res.data.cartTotal
};

exports.emptyUserCart = async (req, res) => {
	//find user
	const user = await User.findOne({ email: req.user.email }).exec();

	//find cart of user and remove
	const cart = await CartModel.findOneAndRemove({ orderedBy: user._id }).exec();

	res.json(cart);
};

exports.userAddress = async (req, res) => {
	//find user by email and update : address
	const userAddress = await User.findOneAndUpdate(
		{ email: req.user.email },
		{ address: req.body.address }
	).exec();

	console.log("User address --->", userAddress);

	res.json({ ok: true });
};

exports.applyCouponDiscountToCart = async (req, res) => {
	//first acess the coupon
	console.log("coupon body to be applied", req.body);
	const { coupon } = req.body;
	console.log("Coupon==>", coupon);

	//once we have the coupon, check the validity of coupon
	const validCoupon = await CouponModel.findOne({ name: coupon }).exec();

	//if coupon srnt from FR is not valied : validCoupon will be null

	if (validCoupon === null) {
		res.json({
			err: "Invalid Coupon",
		});
	}

	const user = await User.findOne({ email: req.user.email }).exec();

	//now we query the cartModel by userID and apply discount

	let cart = await CartModel.findOne({ orderedBy: user._id })
		.populate("products.product", "_id title price")
		.exec();
	//destructure cart products , cartTotal from cart
	const { products, cartTotal } = cart;

	console.log("Cart Total =>", cartTotal, "Discount%===", validCoupon.discount);
	let discountedPrice = (cartTotal * validCoupon.discount) / 100;

	let totalAfterDiscount = (cartTotal - discountedPrice).toFixed(2); //upto two ecimal place

	//once we have the discounted proce , update the cart
	CartModel.findOneAndUpdate(
		{ orderedBy: user._id },
		{ totalAfterDiscount },
		{ new: true }
	).exec();

	res.json(totalAfterDiscount);
};
