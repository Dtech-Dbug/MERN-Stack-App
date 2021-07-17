const mongoose = require("mongoose");
const CartModel = require("./cart");
const User = require("./userModel");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
	{
		products: [
			{
				product: {
					type: ObjectId,
					ref: "ProductModel",
				},
				count: Number,
				color: String,
				price: Number,
			},
		],

		paymentIntent: {},
		orderStatus: {
			type: String,
			default: "not Processed yet",
			enum: [
				"not processed yet",
				"processing",
				"dispatching",
				"dispatched",
				"cancelled",
				"completed",
			],
		},

		orderedBy: { type: ObjectId, ref: "User" },
	},

	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
