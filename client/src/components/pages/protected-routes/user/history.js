import React, { useState, useEffect } from "react";
import UserNav from "../../../Nav/userNav";
import axios from "axios";
import { useSelector } from "react-redux";
import { userOrders } from "../../../../functions/userCart";
import { toast } from "react-toastify";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

//we will have to protect this route , so only logged in users can see this page. if the route is not proteted anyone can navigate to this page without even logging

export const History = () => {
	const [orders, setOrders] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		user &&
			userOrders(user.token)
				.then((res) => {
					console.log("Order of user", JSON.stringify(res.data, null, 4));
					setOrders([res.data]);
				})
				.catch((err) => console.log(err.message));
	}, []);

	const showOrders = () =>
		orders.map((order, i) => (
			<div key={i} className="m-5 p-3 card">
				<h4>Payment Info</h4>
				{showOrderInTable(order)}
				<div className="row">
					<di className="col">PDF Download</di>
				</div>
			</div>
		));

	const showOrderInTable = (order) => <p>Orders </p>;

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col text-center">
					<h4>
						{orders.length > 0
							? `${orders.length} Orders`
							: "	No Orders , found"}
					</h4>

					{showOrders()}
				</div>
			</div>
		</div>
	);
};
