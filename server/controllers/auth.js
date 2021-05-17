const User = require("../model/userModel");

exports.createOrUpdateUser = async (req, res) => {
	// res.json({
	// 	data: "hmm, slowly geting there Buddy . Great job, genius",
	// });

	const { name, email, picture } = req.user;

	//once we have thse info (bcz the middleware runs before this controller) , we decide to either create user or if user already exitsin our DB we update them

	const user = await User.findOneAndUpdate(
		{ email },
		{ name, picture },
		{ new: true }
	);
	//this findOneAndUpdate method takes a few args , if the user exits we :
	//1st arg : what we wanna search by
	//2nd arg : after searching what we wish to update : in the abiove code , it is name and picture
	//3rd arg : new: true => returns the newly updated user , otherwise , we might get the old info as well

	//now, whatif user doesn not exist?
	if (user) {
		console.log("User updated : ", user);
		res.json({
			user,
		});
	} else {
		//if user doesn't exist we create a newUser
		//new instance of the User mongoose model
		//create new user : based on name , picure and email
		//and then save them by .save

		const newUser = await new User({ email, name, picture }).save();
		console.log("User Created : ", newUser);
		res.json({
			newUSer,
		});
	}
};
