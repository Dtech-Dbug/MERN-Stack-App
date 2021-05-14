import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { useSelector } from "react-redux";

export const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const config = {
			url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
			handleCodeInApp: true,
		};

		await auth
			.sendPasswordResetEmail(email, config)
			.then(() => {
				setEmail("");
				setLoading(false);
				toast.success("Check your email for password reset link");
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
				console.log("ERROR MSG IN FORGOT PASSWORD", error);
			});
	};

	return (
		<div className="container">
			<div className="col-md-6 offset-md-3 p-5">
				<h2>Forgot Password</h2>
			</div>

			<form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
				<input
					type="email"
					className="form-control"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Type your email"
					autoFocus
				/>
				<br />
				<button className="btn btn-raised" disabled={!email}>
					Submit
				</button>
			</form>
		</div>
	);
};
