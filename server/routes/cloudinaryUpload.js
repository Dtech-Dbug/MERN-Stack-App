const express = require("require");
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

router.delete(
	"/imageremove",
	createOrUpdateUserMiddleware,
	adminCheckMiddleware,
	remove
);

module.exports = router;
