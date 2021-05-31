//install cloudinary from NPM to be able to ue the cloudinary ENV variable
const cloudinary = require("cloudinary");

//config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create the controllers upload and remove

exports.upload = async (req, res) => {
	//functions : we get the uploader.upload method with the package itself
	// function () : is a invoking function which gets called
	// whereas function withput the ( ) : is basically a referance to the function
	//for form data : req.files.file.path
	// fpr json/binary data just req.body.image (since we resize the image in the FE  the data is binary)
	//the upload finction takes two args
	//1st arg : data path//2nd arg : object
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, //this is the id publicly visible
		resource_type: "auto",
		//jpeg/png all file type
	});

	// send the res
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

exports.remove = (req, res) => {
	//to remove we need the image id
	let image_id = req.body.public_id;
	//easch uploaded image will have a publc_id : so we can use that to remove an image
	cloudinary.uploader.destroy(image_id, (err, result) => {
		if (err) {
			console.log(err);
			return res.json({
				success: false,
				err,
			});
		}

		//since it is a selete function
		//we do not have anything to retur  tp the client
		//except for the success stautus upon sucesfull task completeion
		res.send(`Deleted Succesfully`);
	});
};
