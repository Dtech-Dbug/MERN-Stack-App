import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./components/pages/auth/login";
import { Register } from "./components/pages/auth/register";
import { RegisterComplete } from "./components/pages/auth/registerComplete";
import { ForgotPassword } from "./components/pages/auth/ForgotPassword";

import { Home } from "./components/pages/home";
import { Nav } from "./components/nav";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();

	//to check firebase auth state
	useEffect(() => {
		const unSubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userIdToken = await user.getIdTokenResult();
				console.log("USer ", user);
				dispatch({
					type: "USER_LOGGED_IN",
					payload: {
						email: user.email,
						token: userIdToken.token,
					},
				});
			}
		});
		//cleanup
		return () => unSubscribe();
	}, []);

	return (
		<div className="App">
			<Nav />
			<ToastContainer toastStyle={{ backgroundColor: "crimson" }} />

			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<Route path="/register/complete" exact component={RegisterComplete} />
			<Route path="/forgot/password" exact component={ForgotPassword} />
		</div>
	);
}

export default App;
