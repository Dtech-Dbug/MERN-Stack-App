const mongoose = require("mongoose");

const { objectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
	{
		name: String,

		email: {
			type: String,
			require: true,
			index: 2,
		},

		role: {
			type: String,
			default: "Subscriber",
		},
		cart: {
			type: Array,
			default: [],
		},

		address: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

//timeStamps : wil give the time the user is created or updated
//index : true , will help us query our database more efficiently
