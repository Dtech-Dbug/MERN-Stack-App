const ProductModel = require("../model/productModel");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
	//
	try {
		console.log("Request Body ------> ", req.body);
		req.body.slug = slugify(req.body.title);
		const New_Product = await new ProductModel(req.body).save();
		res.json(New_Product);
	} catch (err) {
		console.log(err);
		res.status(400).send("Product Creation Failed , due to ");
	}
};
