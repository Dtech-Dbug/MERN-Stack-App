const express = require("express");
const router = express.Router();

//Middlewares : because this is a prtected path
const {
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
} = require("../middlewares/authMiddleware");

//controllers
const { upload, remove } = require("../controllers/cloudinaryControllers");

router.post(
	"/imagesupload",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	upload
);

router.post(
	"/imageremove",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	remove
);

module.exports = router;
