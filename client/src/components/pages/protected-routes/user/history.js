import React, { useState, useEffect } from "react";
import UserNav from "../../../Nav/userNav";
import axios from "axios";
import { useSelector } from "react-redux";
import { userOrders } from "../../../../functions/userCart";
import { toast } from "react-toastify";
import {
	CheckCircleOutlined,
	CheckOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
import { PDFDownloadLink } from "@react-pdf/renderer";

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
				{ShowPaymentInfo(order.order)}
				{showOrderInTable(order)}
				<div className="row">
					<div className="col">PDF Download??</div>
				</div>
			</div>
		));

	const showOrderInTable = (order) => (
		<table className="table table-bordered">
			<thead className="thead-light">
				<tr>
					<th scope="col">Title</th>
					<th scope="col">Price</th>
					<th scope="col">Quantity</th>
					<th scope="col">Color</th>
					<th scope="col">Shipping</th>
					<th scope="col">Order Status</th>
				</tr>
			</thead>
			<tbody>
				{order.order.products.map((p, i) => (
					<tr key={i}>
						<td>{p.product.title}</td>
						<td>{p.product.price}</td>
						<td>{p.product.quantity}</td>
						<td>{p.product.color}</td>
						<td>
							{p.product.shipping === "Yes" ? (
								<CheckCircleOutlined style={{ color: "green" }} />
							) : (
								<CloseCircleOutlined style={{ color: "red" }} />
							)}
						</td>
						<td className="badge bg-primary text-white m-1">
							<b>{order.order.orderStatus}</b>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);

	const ShowPaymentInfo = (order) => (
		<div>
			<p>
				<b>Order id :</b> {order._id}
				{""}
			</p>
			<p>
				<b>Order Created :</b> {new Date(order.createdAt).toLocaleString()}
			</p>

			<p>
				<b>Payment Status :</b> {order.paymentIntent.status.toUpperCase()}
			</p>
		</div>
	);

	const showDownloadPdfLink = (order) => (
		<PDFDownloadLink
			document={<Invoice order={order} />}
			fileName="oreder-invoice.pdf"
			className="btn btn-sm btn-block btn-outline-primary btn-raised"
		></PDFDownloadLink>
	);

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
