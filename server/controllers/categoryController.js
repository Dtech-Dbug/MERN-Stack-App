const Category = require("../model/categoryModel");

const slugify = require("slugify");

exports.create = async (req, res) => {
	//
	try {
		//to create catgory : we need data from FE
		const { name } = req.body;

		//we need name , and slug to slugify the name.We generate slug using slugify
		const category = await new Category({ name, slug: slugify(name) }).save();
		console.log("Category name :", category);
		res.json(category);
	} catch (err) {
		console.log(err);
		res.status(400).send("Category Creation Failed , due to ");
	}
};

exports.read = async (req, res) => {
	const readCategory = await Category.findOne({ slug: req.params.slug }).exec();
	//if we were not using asybc/await , we can assign a callback to the exec function : like exec((err, data)=> {data will be the category})
	// params : parameeter for requests : that is => category/params
	//the slug : name should be same as in the routes, in the routes we named it catergoy/:slug , so we used slug method, if we had named it id , it would be => slug : req.params.id
	res.json(readCategory);
};

exports.update = async (req, res) => {
	// query the product by slug which needs to be updated
	//updatethe name and slug as well
	const { name } = req.body;
	try {
		const updateCategory = await Category.findOneAndUpdate(
			{ slug: req.params.slug },
			{ name, slug: slugify(name) },
			{ new: true }
		);
		console.log(updateCategory);
		res.json(updateCategory);
	} catch (err) {
		res.status(400).send("Update Failed");
		console.log(err);
	}
};

exports.remove = async (req, res) => {
	//
	try {
		//we can use a mrthod called fineOneAndDelete

		const deletedCategory = await Category.findOneAndDelete({
			slug: req.params.slug,
		});
		res.json(deletedCategory);
	} catch (err) {
		res.status(400).send("Error in deletion");
	}
};

exports.list = async (req, res) => {
	const List = await Category.find({}).sort({ createdAt: -1 }).exec();
	res.json(List);
};

//createdAt : -1 : returns the latest created category
//
