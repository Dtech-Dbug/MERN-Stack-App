const Category = require("../model/categoryModel");

const slugify = require("slugify");

exports.create = async (req, res) => {
	//
	try {
		//to create catgory : we need data from FE
		const { name } = req.body;

		//we need name , and slug to slugify the name.We generate slug using slugify
		const category = await new Cateogty({ name, slug: slugify(name) }).save();
		res.json(category);
	} catch (err) {
		res.status(400).send("Category Creation Failed");
	}
};

exports.read = async (req, res) => {
	//
};

exports.update = async (req, res) => {
	//
};

exports.remove = async (req, res) => {
	//
};

exports.list = (req, res) => {
	//
};
