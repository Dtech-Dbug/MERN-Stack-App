const admin = require("../firebase/index");

exports.createOrUpdateUserMiddleware = async (req, res, next) => {
	//console.log(req.headers);
	//lets just console.log the request headers: so we will be sending the auth token from FE to BE in headers

	//to validate the token that is posted in the header from the client
	try {
		const firebaseUser = await admin
			.auth()
			.verifyIdToken(req.headers.authtoken);
		console.log("FIREBASE USER : ", firebaseUser);

		//we can add more properties in the request and access them from everywrhre , controllers
		// the req, res are shared through oyt the app ,hence adding request methods will help us access the userToken easily and pass it to the controller , in the routes
		req.user = firebaseUser;

		next();
	} catch (err) {
		alert(err.message);
	}

	//next() : just passes onto the next function
};
