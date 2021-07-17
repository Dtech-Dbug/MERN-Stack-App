import React, { useState } from "react";
import UserNav from "../../../Nav/userNav";
import axios from "axios";
import { useSelector } from "react-redux";

//we will have to protect this route , so only logged in users can see this page. if the route is not proteted anyone can navigate to this page without even logging

export const History = () => {
	const [orders, setOrders] = useState("");
	const { user } = useSelector((state) => ({ ...state }));

	const test = async (authtoken) => {
		return await axios.get(`http://localhost:8000/api/user/orders`, {
			headers: { authtoken },
		});
	};

	function testing() {
		console.log("wrokin");
		test(user.token).then((res) => setOrders(res.data));
	}
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col">
					user history page
					<button onClick={testing}>Test</button>
					{JSON.stringify(orders)}
				</div>
			</div>
		</div>
	);
};
