const express = require("express");

const router = express.Router();

router.get("/create-update-user", (req, res) => {
	res.json({
		data: "wowo, slowly gettin there",
	});
});

module.exports = router;
