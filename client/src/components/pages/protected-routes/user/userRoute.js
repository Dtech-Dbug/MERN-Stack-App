import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const UserRoute = ({ children, ...rest }) => {
	//access the user for protection
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		<Route {...rest} render={() => children} />
	) : (
		<h3>LogIn first</h3>
	);
};

//if the user is logged in ,,we pass in th rest of the props and return the children content
//else we will show them something else ; like login first or maybe a redirect counrdown timer?
