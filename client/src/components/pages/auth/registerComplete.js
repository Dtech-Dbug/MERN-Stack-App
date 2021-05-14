import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";

export const RegisterComplete = ({ history }) => {
	useEffect(() => {
		console.log(window.localStorage.getItem("UserEmail"));
		const storedEmail = window.localStorage.getItem("UserEmail");
		setEmail(storedEmail);
		console.log(window.location.href);
	}, []);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error(`Password is required`);
			return;
		}

		if (password.length < 6) {
			toast.error(`Password must be minimum 6 characters`);
			return;
		}

		try {
			const result = await auth.signInWithEmailLink(
				email,
				window.location.href
			); // takes two args: arg and the URL

			//console.log("result :", result);

			//remove user from local storage
			if (result.user.emailVerified) {
				window.localStorage.removeItem("UserEmail");
			}

			//get user ID token
			const user = auth.currentUser;
			await user.updatePassword(password); //to update user Password

			const userIdToken = await user.getIdTokenResult();

			console.log("User : ", user, "UserIDToken: ", userIdToken);

			//redux store : to update state globally for evry auth: login,logouts

			//redirect
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const registerFormCompletion = () => (
		<form onSubmit={handleSubmit}>
			<input type="email" className="form-control" value={email} disabled />

			<input
				type="password"
				className="form-control"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit" className="btn btn-raised mt-2">
				Complete Registration
			</button>
		</form>
	);

	return (
		//p-5 means padding ; 1-5 is the range
		//when we crate container div , we create another div inside naming row for adding many columns , maximum columns : 12 columns
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-2">
					<h3>Complete Registration</h3>

					{registerFormCompletion()}
				</div>
			</div>
		</div>
	);
};
