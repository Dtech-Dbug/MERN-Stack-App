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

exports.removeProduct = async (req, res) => {
	try {
		const deletedProdcut = await ProductModel.findOneAndRemove({
			slug: req.params.slug,
		}).exec();
		res.json(deletedProdcut);
	} catch (err) {
		console.log(err);
		return res.status(400).send("Product deletion failed");
	}
};

exports.readProduct = async (req, res) => {
	try {
		const readProduct = await ProductModel.findOne({
			slug: req.params.slug,
		})
			.populate("category")
			.populate("subCategories")
			.exec();
		res.json(readProduct);
	} catch (err) {
		console.log(err.message);
	}
};
// since we used find , the Query will be finding based on the slu9g
//to get the response populated , based on a single slug , we nedd to specify the index from the response (which is an array of single product)
//to avoid using (res.data[0] => to prepopulate the forms while uodating ) ===> we can use findOne , which is a more specific query.

exports.updateProduct = async (req, res) => {
	req.body.slug = req.body;
	try {
		const UpdatedProduct = await ProductModel.findOneAndUpdate(
			{
				slug: req.params.slug,
			},
			req.body,
			{ new: true }
		);
		res.json(UpdatedProduct);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err.message,
		});
	}
};
