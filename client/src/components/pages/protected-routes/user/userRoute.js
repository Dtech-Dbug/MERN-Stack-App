import React from "react";
import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import LoadingToRedirect from "./redirectCountdown";

export const UserRoute = ({ children, ...rest }) => {
	//access the user for protection
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		<Route {...rest} render={() => children} />
	) : (
		<LoadingToRedirect />
	);
};

//if the user is logged in ,,we pass in th rest of the props and return the children content
//else we will show them something else ; like login first or maybe a redirect counrdown timer?
