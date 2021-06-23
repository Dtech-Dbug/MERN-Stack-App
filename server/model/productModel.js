const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minlenght: 2,
			maxlength: 50,
			text: true,
			trim: true,
		},
		description: {
			type: String,
			maxlength: 500,
			required: true,
			text: true,
		},
		slug: {
			trim: true,
			type: String,
			lowercase: true,
			unique: true,
			index: true,
		},
		price: {
			trim: true,
			type: Number,
			required: true,
			maxlength: 32,
		},
		quantity: Number,
		sold: {
			type: Number,
			default: 0,
		},
		shipping: {
			type: String,
			enum: ["Yes", "No"],
		},
		color: {
			type: String,
			enum: ["Red", "Blue", "Green", "Black", "White"],
		},

		category: {
			type: ObjectId,
			ref: "Category",
		},
		subCategories: [
			{
				type: ObjectId,
				ref: "SubCategory",
			},
		],

		images: {
			type: Array,
		},
		ratings: [
			{
				star: Number,
				postedBy: { type: ObjectId, ref: "User" },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("ProductModel", productSchema);
