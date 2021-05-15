const express = require("express");

const router = express.Router();

router.get("/user", (req, res) => {
	res.json({
		data: "wowo, reached user end point?",
	});
});

module.exports = router;
