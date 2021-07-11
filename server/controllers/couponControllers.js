const CouponModel = require("../model/couponModel");

// create
exports.create = async (req, res) => {
	try {
		//to create we need information from fronTend
		//we destructure them from req.body
		console.log("Coupon body ===>", req.body);

		const { name, expiry, discount } = req.body;
		console.log(name, expiry, discount);

		const saveCoupon = await new CouponModel({ name, expiry, discount }).save();
		res.json(saveCoupon);
	} catch (err) {
		console.log("error while saving coupons", err);
	}
};

//list
exports.list = async (req, res) => {
	res.json(await CouponModel.find({}).sort({ createdAt: -1 }).exec());
};

//remove
exports.remove = async (req, res) => {
	try {
		console.log("param Id::", req.params.couponId);

		const removedCoupon = await CouponModel.findByIdAndDelete(
			req.params.couponId
		).exec();
		//res.json(await CouponModel.findByIdAndDelete(req.params.couponId).exec());
		res.json(removedCoupon);
	} catch (err) {
		console.log("err while deleting coupon", err.message);
	}
};
