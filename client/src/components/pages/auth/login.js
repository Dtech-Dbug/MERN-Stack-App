import React, { useState, useEffect } from "react";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

export const Login = ({ history }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.table("email ", email, " password ", password);
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
					<h3>Login</h3>
					{LoginForm()}
				</div>
			</div>
		</div>
	);
};
