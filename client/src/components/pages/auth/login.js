import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//importing the function for sending the authToekn from FE to backend
import { createOrUpdateUser } from "../../../functions/create-update-user-async";

//for fetching

export const Login = ({ history }) => {
	const [email, setEmail] = useState(
		"dwaipayan.chakroborty.fiem.ece18@teamfuture.in"
	);
	const [password, setPassword] = useState("123456");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) {
			history.push("/");
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		//console.table("email ", email, " password ", password);
		try {
			const result = await auth.signInWithEmailAndPassword(email, password);
			const { user } = result;
			const userIdToken = await user.getIdTokenResult();

			//instead of firebase , we get response from our own server and dispatch them to the redux store
			createOrUpdateUser(userIdToken.token)
				.then((res) => {
					console.log("create-update-user from Our DB: ", res);
					dispatch({
						type: "USER_LOGGED_IN",
						payload: {
							name: res.data.user.name,
							email: user.email,
							token: userIdToken.token,
							role: res.data.user.role,
							_id: res.data.user._id,
						},
					});
				})
				.catch((err) => alert(err.message));

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

			createOrUpdateUser(userIdToken.token)
				.then((res) => {
					console.log("create-update-user : ", res);
					dispatch({
						type: "USER_LOGGED_IN",
						payload: {
							name: res.data.user.name,
							email: user.email,
							token: userIdToken.token,
							role: res.data.user.role,
							_id: res.data.user._id,
						},
					});
				})
				.catch((err) => alert(err.message));

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
