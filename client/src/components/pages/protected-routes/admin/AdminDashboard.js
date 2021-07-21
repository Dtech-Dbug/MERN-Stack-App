import React, { useState, useEffect } from "react";
import AdminNav from "../../../Nav/Admin-Nav";
import {
	adminOrderList,
	adminUpdateOrdersStatus,
} from "../../../../functions/adminOrder";
import { useSelector } from "react-redux";

export const AdminDashboard = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	// useEffect(() => {
	// 	user &&

	// }, []);

	function test(e) {
		e.preventDefault();
		console.log("Test Buttton Pressed");

		user && console.log(user.token);
		adminOrderList(user.token)
			.then((res) => {
				console.log("RES oredr admin", res.data);
			})
			.catch((err) => console.log(err.message));
	}
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					Welcome Admin to your dashboard.
					<button onClick={test}>Test</button>
				</div>
			</div>
		</div>
	);
};
