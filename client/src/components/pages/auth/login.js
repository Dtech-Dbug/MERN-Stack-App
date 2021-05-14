import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Login = ({ history }) => {
	const [email, setEmail] = useState("good@gmail.com");
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		//console.table("email ", email, " password ", password);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const userIdToken = await user.getIdTokenResult();

			dispatch({
				type: "USER_LOGGED_IN",
				payload: {
					email: user.email,
					token: userIdToken.token,
				},
			});
			history.push("/");
		} catch (error) {
			console.log(error.message);
			setLoading(false);
		}
	};

	const googleLogin = async (e) => {
		try {
			const result = await auth.signInWithPopup(googleAuthProvider);
			const { user } = result;
			const userIdToken = await user.getIdTokenResult();

			dispatch({
				type: "USER_LOGGED_IN",
				payload: {
					email: user.email,
					token: userIdToken.token,
				},
			});
			history.push("/");
		} catch (error) {
			console.log(error.message);
		}
	};

	const LoginForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Your email"
				autoFocus
			/>

			<br />

			<input
				type="password"
				className="form-control"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Your password"
			/>

			<Button
				icon={<MailOutlined />}
				onClick={handleSubmit}
				block
				shape="round"
				size="large"
				type="primary"
				disabled={!email || password.length < 6}
				className="mt-2 mb-2"
			>
				Login with Email/Password
			</Button>
		</form>
	);

	return (
		//p-5 means padding ; 1-5 is the range
		//when we crate container div , we create another div inside naming row for adding many columns , maximum columns : 12 columns
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-2">
					{loading ? (
						<h3 className="text-danger">Loading...</h3>
					) : (
						<h3>Login</h3>
					)}
					{LoginForm()}
					<Button
						icon={<GoogleOutlined />}
						onClick={googleLogin}
						block
						shape="round"
						size="large"
						type="danger"
						disabled={!email || password.length < 6}
						className="mt-2 mb-2"
					>
						Login with Google
					</Button>

					<br />
					<Link to="/forgot/password" className="float-right mr-3">
						Forgot Password
					</Link>
				</div>
			</div>
		</div>
	);
};
