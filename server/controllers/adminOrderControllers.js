const Order = require("../model/order");

exports.adminOrders = async (req, res) => {
	console.log("Server got admin order list");
	const orders = await Order.find({})
		.populate("products.product")
		.sort("-createdAt")
		.exec();

	res.json(orders);
};

exports.adminOrderStatus = async (req, res) => {
	const { orderId, orderStatus } = req.body;

	const updatedOrderStatus = await Order.findByIdAndUpdate(
		orderId,
		{ orderStatus },
		{ new: true }
	).exec();

	res.json(updatedOrderStatus);
};
