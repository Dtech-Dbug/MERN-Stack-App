import React, { useState } from "react";
import ModalImage from "react-modal-image";
import JS from "../../Default images/js logo.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from "@ant-design/icons";

const ProductCartTableView = ({ product }) => {
	const colors = ["Red", "Blue", "Green", "Black", "White"];

	const dispatch = useDispatch();

	const handleColorChange = (e) => {
		//
		console.log("color changed to ", e.target.value);
		let cart = [];

		if (typeof window !== undefined) {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}

			cart.map((cartItem, i) => {
				//check if the products'sid matched with the item in the cart that is being modified'
				if (cartItem._id === product._id) {
					console.log("cartItem clicked", cartItem.title);
					console.table(
						cartItem._id,
						product._id,
						cartItem.title,
						product.title
					);

					//set the color of cart[i] = cartItem to the e.target.value
					cart[i].color = e.target.value;
				}
				//save that to local storage
				localStorage.setItem("cart", JSON.stringify(cart));

				//dispatching to redux to save the state globally
				dispatch({
					type: "ADD_TO_CART",
					payload: cart,
				});
			});
		}
	};

	const handleCountChange = (e) => {
		//use case 1: to prevent negative quntity
		console.log("quantiti", product.quantity);
		let count = e.target.value < 1 ? 1 : e.target.value;
		if (count > product.quantity) {
			toast.error(
				`Maximum available units ${product.quantity}. You have exceeded the total available units`
			);
			return;
		}

		console.log("count value", e.target.value);

		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			cart.map((item, i) => {
				if (item._id === product._id) {
					cart[i].count = count;
				}
			});

			localStorage.setItem("cart", JSON.stringify(cart));

			dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};

	return (
		<tbody>
			<tr>
				<td>
					<div style={{ width: "100px", height: "auto" }}>
						{product.images ? (
							<ModalImage
								small={product.images[0].url}
								large={product.images[0].url}
							/>
						) : (
							<ModalImage small={JS} large={JS} />
						)}
					</div>
				</td>
				<td>{product.title}</td>
				<td>${product.price}</td>
				<td>
					<select
						onChange={handleColorChange}
						name="color"
						className="form-control"
					>
						{product.color ? (
							<option vlaue={product.color}>{product.color}</option>
						) : (
							<option>Select</option>
						)}
						{colors
							.filter((c) => c !== product.color)
							.map((c) => (
								<option value={c} key={c}>
									{c}
								</option>
							))}
					</select>
				</td>
				<td>
					<input
						type="number"
						className="form-control"
						value={product.count}
						onChange={handleCountChange}
					/>
				</td>
				<td>
					{product.shipping === "Yes" ? (
						<CheckCircleOutlined className="text-success" />
					) : (
						<CloseCircleOutlined className="text-danger" />
					)}
				</td>
				<td>Delete icon</td>
			</tr>
		</tbody>
	);
};

export default ProductCartTableView;
