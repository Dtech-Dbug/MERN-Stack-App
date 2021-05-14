import React, { useState } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export const Register = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		//console.log(process.env.REACT_APP_REGISTER_REDIRECT_URL);

		//we need a config object , which wil have the URL ; from firebase email signin docs
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};

		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}. Click the link sent to the email for completing registration process.`
		);

		//save user email to locally store user email, so that user dont have to enter email again
		window.localStorage.setItem("UserEmail", email);

		//clear state after user has  submit the button
		setEmail("");
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				autoFocus
			/>

			<button type="submit" className="btn btn-raised mt-2">
				Register
			</button>
		</form>
	);

	return (
		//p-5 means padding ; 1-5 is the range
		//when we crate container div , we create another div inside naming row for adding many columns , maximum columns : 12 columns
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-2">
					<h3>Register</h3>

					{registerForm()}
				</div>
			</div>
		</div>
	);
};
