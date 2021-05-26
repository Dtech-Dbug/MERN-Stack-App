import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login } from "./components/pages/auth/login";
import { Register } from "./components/pages/auth/register";
import { RegisterComplete } from "./components/pages/auth/registerComplete";
import { ForgotPassword } from "./components/pages/auth/ForgotPassword";

import { Home } from "./components/pages/home";
import { Nav } from "./components/Nav/nav";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { currentUser } from "./functions/curentUser";

//protected routes/user
import { UserRoute } from "./components/pages/protected-routes/user/userRoute";
import { History } from "./components/pages/protected-routes/user/history";
import { UserPassword } from "./components/pages/protected-routes/user/passwordUpdate";

//protected routes / admin
import { AdminDashboard } from "./components/pages/protected-routes/admin/AdminDashboard";
import { AdminRoute } from "./components/pages/protected-routes/admin/AdminRoute";
import { CreateCategory } from "./components/pages/protected-routes/admin/Category/categoryCreate";
import { UpdateCategory } from "./components/pages/protected-routes/admin/Category/updateCategory";
import { CreateSubCategory } from "./components/pages/protected-routes/admin/Category/sub-categoryCreate";
import { UpdateSubCategory } from "./components/pages/protected-routes/admin/Category/updateSubcategory";
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
			<ToastContainer />

			<Route path="/" exact component={Home} />
			<Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} />
			<Route path="/register/complete" exact component={RegisterComplete} />
			<Route path="/forgot/password" exact component={ForgotPassword} />

			<Switch>
				<UserRoute exact path="/user/history" component={History} />
				<UserRoute exact path="/user/password" component={UserPassword} />
				<AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
				<AdminRoute exact path="/admin/category" component={CreateCategory} />
				<AdminRoute
					exact
					path="/admin/category/:slug"
					component={UpdateCategory}
				/>
				<AdminRoute
					exact
					path="/admin/subCategory"
					component={CreateSubCategory}
				/>
				<AdminRoute
					exact
					path={`/admin/subCategory/:slug`}
					component={UpdateSubCategory}
				/>
			</Switch>
		</div>
	);
}

export default App;
