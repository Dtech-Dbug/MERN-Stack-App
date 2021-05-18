import React from "react";
import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingToRedirect from "../user/redirectCountdown";
import { toast } from "react-toastify";

import { currentAdmin } from "../../../../functions/currentAdmin";

//we will use useEffect so when the component mounts , we send request to our backend a, get the response and do what needs to be done

export const AdminRoute = ({ children, ...rest }) => {
	//access the user for protection
	const { user } = useSelector((state) => ({ ...state }));

	const [ok, setOk] = useState(false);

	useEffect(() => {
		//first we check ,we have a user logged in

		if (user && user.token) {
			currentAdmin(user.token)
				.then((res) => {
					console.log("response from curent ADmin function ", res);
					setOk(true);
				})
				.catch((err) => {
					toast.error(err.message);
					setOk(false);
				});
		}
	}, [user]);

	return ok ? <Route {...rest} /> : <LoadingToRedirect />;
	//if it is ok [that is user role is admin] show the route else redirect
};

//if the user is logged in ,,we pass in th rest of the props and return the children content
//else we will show them something else ; like login first or maybe a redirect counrdown timer?
