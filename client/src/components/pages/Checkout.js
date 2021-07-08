import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getUserCart,
	emptyUserCart,
	saveUserAddress,
} from "../../functions/userCart";
import { toast } from "react-toastify";

//import plugIn for rich text editor and the css , without that unexpected outcomes will be shwn
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = () => {
	//state of products
	const [cartProducts, setCartProducts] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);
	const [address, setAddress] = useState("");
	const [addressSaved, setAddressSaved] = useState(false);
	const dispatch = useDispatch();

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		// let token = user.token;
		// console.log("user token ", token);
		// getUserCart(token).then((res) =>
		// 	console.log("response from DB of user Cart in checkout", res)
		// );
		user && fetchCart();
	}, [user]);

	const fetchCart = () =>
		getUserCart(user.token).then((res) => {
			console.log("res from cart BE", res);
			setCartProducts(res.data.products);
			setCartTotal(res.data.cartTotal);
		});

	//emoty cart from localstorage, redux and DB
	function emptyCart() {
		console.log("empty cart?");
		if (typeof window !== "undefined") {
			//remove from Local Storage
			localStorage.removeItem("cart");

			//remove from redux
			dispatch({
				type: "ADD_TO_CART",
				payload: [],
			});

			//remove from Backend
			emptyUserCart(user.token).then((res) => {
				setCartProducts([]);
				setCartTotal(0);
				toast.success("Cart Emptied. Continue shopping? 🛒");
			});
		}
	}

	function saveAddressToDb() {
		//make request to backend to save address
		saveUserAddress(address, user.token)
			.then((res) => {
				if (res.data.ok) {
					setAddressSaved(true);
					toast.success(`Address saved. Continue to checkout & place order 😁`);
				}
			})
			.catch((err) => console.log(err));
	}
	return (
		<div className="row">
			<div className="col-md-6">
				<h4>Delivery Address</h4>
				<br />
				<br />
				<ReactQuill theme="snow" value={address} onChange={setAddress} />
				<button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
					Save
				</button>
				<hr />
				<h4>Got Coupon?</h4>
				<br />
				coupon input and apply button
			</div>

			<div className="col-md-6">
				<h4>Order Summary</h4>
				<hr />
				<p>
					Products : <b>{cartProducts.length}</b>
				</p>
				<hr />

				<p>
					<u>List of Products</u>
				</p>
				{cartProducts.map((p, i) => {
					return (
						<div kry={i}>
							<p>
								{p.product.title} ({p.color}) x {p.count} = {p.product.price} x{" "}
								{p.count}
							</p>
						</div>
					);
				})}
				<hr />
				<p>
					Cart Total: <b>${cartTotal}</b>
				</p>

				<div className="row">
					<div className="col-md-6">
						<button
							disabled={!addressSaved || !cartProducts.length}
							className="btn btn-primary"
						>
							Place Order
						</button>
					</div>

					<div className="col-md-6">
						<button
							disabled={!cartProducts.length}
							onClick={emptyCart}
							className="btn btn-primary"
						>
							Empty Cart
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
