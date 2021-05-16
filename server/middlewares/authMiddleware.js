const admin = require("../firebase/index");

exports.createOrUpdateUserMiddleware = (req, res, next) => {
	console.log(req.headers);

	//lets just console.log the request headers: so we will be sending the auth token from FE to BE in headers

	next();
	//next() : just passes onto the next function
};
