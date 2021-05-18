const mongoose = require("mongoose");

const { objectId } = mongoose.Schema; //id will ge automatically generated

//trim : just to rule out the white spaces and all : it will be coming from our controller
//slug : makes object readbale unstad of id's in the URL

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: "Name is required",
			minlength: [3, "Too Short"],
			maxlength: [32, "Too Long"],
		},
		slug: {
			type: String,
			trim: true,
			lowercase: true,
			index: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongose.model("Category", categorySchema);
