const express = require("express");

const router = express.Router();

//controllers
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

//middlewares
const {
	createOrUpdateUserMiddleware,
} = require("../middlewares/authMiddleware");

router.post(
	"/create-update-user",
	createOrUpdateUserMiddleware,
	createOrUpdateUser
);
//we will recieve info from FE here, so the method will be post

// creatinga  new end point to get the details of the current user
router.post("/current-user", createOrUpdateUserMiddleware, currentUser);

module.exports = router;

// Just for fun
//const myOwnMiddleware = (req, res, next) => {
// 	console.log("created own middleware , yaaaaaay");
// 	next();
// };
// router.get("/testing", myOwnMiddleware, (req, res) => {
// 	res.json({
// 		data: "yaya , genius",
// 	});
// });
