const ProductModel = require("../model/productModel");
const slugify = require("slugify");

exports.createProduct = async (req, res) => {
	//
	try {
		console.log("Request Body ------> ", req.body);
		req.body.slug = slugify(req.body.title);
		const New_Product = await new ProductModel(req.body).save();
		console.log("Product created ==>", New_Product);
		res.json(New_Product);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.listProducts = async (req, res) => {
	const products = await ProductModel.find({})
		.limit(parseInt(req.params.count))
		.populate("category")
		.populate("subs")
		.sort([["createdAt", "desc"]])
		.exec();
	res.json(products);
};
