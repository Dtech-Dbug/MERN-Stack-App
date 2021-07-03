const ProductModel = require("../model/productModel");
const User = require("../model/userModel");
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
		if (req.body.title) {
			req.body.slug = slugify(req.body.title);
		}
		const UpdatedProduct = await ProductModel.findOneAndUpdate(
			{
				slug: req.params.slug,
			},
			req.body,
			{ new: true }
		).exec();
		console.log("Updated product ===> ", UpdatedProduct);
		res.json(UpdatedProduct);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err.message,
		});
	}
};

// exports.list = async (req, res) => {
// 	try {
// 		//destructure the options we need to send

// 		//sort : createdAt/Updatedat ; order : 'asc'/'desc;  limit : number
// 		const { sort, order, limit } = req.body;

// 		const recievedProducts = await ProductModel.find({})
// 			.populate("category")
// 			.populate("subcategories")
// 			.sort([[sort, order]]) // sort takes an array. If it more than one element , we use another array. so => [[sort , order]]
// 			.limit(limit)
// 			.exec();

// 		res.json(recievedProducts);
// 	} catch (err) {
// 		console.log(err);
// 		res.status(400).json({
// 			err: err.message,
// 		});
// 	}
// };

// Modify the list controller => to support pagination
exports.list = async (req, res) => {
	try {
		//destructure the options we need to send

		//sort : createdAt/Updatedat ; order : 'asc'/'desc;  limit : number
		// Skip prodcuts to avoid listing the same ones on every pagination
		//eg => if currentpage = 3 ; we skip=> (3-1)* 3 => skip 6 products and show the 7th-8th-9th prodcuts on the 3rd page.
		const { sort, order, page } = req.body;
		const currentPage = page || 1;
		const CountPerPage = 3; // 2

		const recievedProducts = await ProductModel.find({})
			.skip((currentPage - 1) * CountPerPage)
			.populate("category")
			.populate("subcategories")
			.sort([[sort, order]]) // sort takes an array. If it more than one element , we use another array. so => [[sort , order]]
			.limit(CountPerPage)
			.exec();

		res.json(recievedProducts);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err.message,
		});
	}
};

exports.getProductsCount = async (req, res) => {
	const TotalProductsCount = await ProductModel.find({})
		.estimatedDocumentCount()
		.exec();
	res.json(TotalProductsCount);
};

exports.rateProduct = async (req, res) => {
	//1. Find the product based on the productId
	//we can get the productId from req.params.productId
	const product = await ProductModel.findById(req.params.productId).exec();

	//2. we also need to find the user, for rating
	const user = await User.findOne({ email: req.user.email }).exec();

	//3. Who is rating or updating the rating.[we need to update rating, in case where user has already rated. Instead of repeating]
	//check if user logged-in user has already rated

	//4. destructur star from req.body => bcz we will send star from frontend
	const { star } = req.body;
	//whole idea =>
	//we find the product
	//add the star by the loggedIn user

	//refer to the ProductModel. We have ratings array => which is an array of objects
	//to check if user has already rated = we find for the userId in the rating object. Then update the rating.
	//If user has not rated previosly , we push the new rating
	//We have stored the product after quering our databse by the productId in the 'product' variable
	//we can easily access the ratings object of a single product(based on productId) from the productModel

	//5. we use the find method on the rating array to check , if the postedBy Id equals to the currently loggedIn user's ID
	//If it is true => then we get matching element object. [meaning user already rated]
	//or we get undefined [meaning: user has not rated the product yet]
	let existingRatingObject = product.ratings.find(
		(element) => element.postedBy.toString() == user._id.toString()
		//changed the IDs to trimg and made losse equal operation to make it work
		//without th toString , the ratings arrays in the FrontEnd kept pushing new ratings, instead of updating
	);

	//based on the existingratingProduct variable , we can add or update ratings.

	//If user has not rated before => then we push the new one in the rating array
	if (existingRatingObject === undefined) {
		//existingRatingObject === undefined means => user have not rated the product before
		//query the ProductModelbased on productId , use  findOneandUpdate Mongoose Method
		//takes two args => query , and what to update
		let addRating = await ProductModel.findByIdAndUpdate(
			product._id,
			{
				//Now , what to update?
				//we push the new rating to the ratings array using a special method => $push
				$push: { ratings: { star: star, postedBy: user._id } }, //these are the object that comprises the ratings array
			},
			{ new: true }
		).exec();

		console.log("Rating added:::", addRating);
		res.json(addRating);
	}
	//else we updatethe existing array if user has already rated the product once.
	else {
		const updateRating = await ProductModel.updateOne(
			//we find the product in the ratings array. But which one? The one stored in existingRating Object
			{ ratings: { $elemMatch: existingRatingObject } }, //query? matching elemet if it matches the existingRating object
			{ $set: { "ratings.$.star": star } }, //what to update? the star [number] only. using a special property $set
			{ new: true }
		).exec();
		res.json(updateRating);
		console.log("Rating Updated:::", updateRating);
	}
};

exports.listRelatedProducts = async (req, res) => {
	//
	try {
		const product = await ProductModel.findById(req.params.productId).exec();

		const relatedProducts = await ProductModel.find({
			_id: { $ne: product._id },
			category: product.category,
		})
			.limit(3)
			.populate("category")
			.populate("subCategories")
			.populate("postedBy")
			.exec();

		res.json(relatedProducts);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			err: err.message,
		});
	}
};

//controller for advanced search filter
const handleQuery = async (req, res, query) => {
	const products = await ProductModel.find({
		$text: { $search: query },
	})
		.populate("category", "_id name")
		.populate("subCategories", "_id name")
		.exec();

	res.json(products);
};

const handlePrice = async (req, res, price) => {
	try {
		const products = await ProductModel.find({
			//using special mongoose method: greather than , less than
			// price [100, 200]
			//search for prodcuts greater than 100. That is 0th index of prioce array
			//and products less than max proce :200// 1st index of price array
			price: {
				$gte: price[0],
				$lte: price[1],
			},
		})
			.populate("category", "_id name")
			.populate("subCategories", "_id name")
			.exec();

		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

const handleCategory = async (req, res, category) => {
	try {
		products = await ProductModel.find({ category })
			.populate("category", "_id name")
			.populate("subCategories", "_id name")
			.exec();

		res.json(products);
	} catch (err) {
		console.log(err);
	}
};

const handleStars = async (req, res, stars) => {
	//use a new method of mongoose : project Aggregation
	//lets you add new features to the model , that does not exist in the existing model
	ProductModel.aggregate([
		{
			$project: {
				document: "$$ROOT",
				//total access to the document => model
				floorAverage: {
					// native of math.floor and math.ceiling
					// mongoose has its method floor : which does ethe same
					//for rates 4.4 and below we show 4
					//but for 4.5 or more we show 5
					$floor: { $avg: "$ratings.star" },
				},
			},
		},
		{ $match: { floorAverage: stars } },
		//every product will have their floorAverage generated
		//we match the stars for the floorAvereage generated
	])
		.limit(12)
		.exec((err, agg) => {
			if (err) console.log("aggregates error", err);

			//esle find thr model based on id => which is agg in the exec parameter
			ProductModel.find({ _id: agg })
				.populate("category", "_id name")
				.populate("subCategories", "_id name")
				.exec((err, products) => {
					if (err) console.log("Prodcyt Aggregate error", err);
					res.json(products);
				});
		});
};

const handleSubCategory = async (req, res, subCategory) => {
	const products = await ProductModel.find({ subCategories: subCategory })
		.populate("category", "_id name")
		.populate("subCategories", "_id name")
		.exec();

	res.json(products);
};

const handleShipping = async (req, res, shipping) => {
	const products = await ProductModel.find({ shipping })
		.populate("category", "_id name")
		.populate("subCategories", "_id name")
		.exec();

	res.json(products);
};

const handleColor = async (req, res, color) => {
	const products = await ProductModel.find({ color })
		.populate("category", "_id name")
		.populate("subCategories", "_id name")
		.exec();

	res.json(products);
};

exports.searchFilter = async (req, res) => {
	const { query, price, category, stars, subCategory, shipping, color } =
		req.body;

	if (query) {
		console.log("search Query :", query);
		//use a custome function to handle all queries(search , price, filter etc)
		await handleQuery(req, res, query);
	}

	if (price !== undefined) {
		console.log(price);
		//proce will be array like : [100,200] : min: 100 / max:200
		await handlePrice(req, res, price);
	}

	if (category) {
		console.log("search category :", category);
		//use a custome function to handle all queries(search , price, filter etc)
		await handleCategory(req, res, category);
	}
	if (stars) {
		console.log(stars);
		await handleStars(req, res, stars);
	}

	if (subCategory) {
		console.log(subCategory);
		await handleSubCategory(req, res, subCategory);
	}

	if (shipping) {
		console.log(shipping);
		await handleShipping(req, res, shipping);
	}

	if (color) {
		console.log(color);
		await handleColor(req, res, color);
	}
};
