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
import { History } from "./components/pages/protected-routes/user/history";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/curentUser";

import { UserRoute } from "./components/pages/protected-routes/user/userRoute";

//importing the axios function to send data to our bakcend

function App() {
	const dispatch = useDispatch();

	//to check firebase auth state
	useEffect(() => {
		const unSubscribe = auth.onAuthStateChanged(async (user) => {
			if (user) {
				const userIdToken = await user.getIdTokenResult();
				console.log("USer loged in ", user);

				currentUser(userIdToken.token)
					.then((res) => {
						console.log("res from own server , currentUSer ", res);
						dispatch({
							type: "USER_LOGGED_IN",
							payload: {
								email: user.email,
								token: userIdToken.token,
								name: res.data.name,
								role: res.data.role,
								_id: res.data._id,
							},
						});
					})
					.catch((err) => console.log(err));
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

			<Switch>
				<UserRoute exact path="/user/history" component={History} />
			</Switch>
		</div>
	);
}

export default App;
