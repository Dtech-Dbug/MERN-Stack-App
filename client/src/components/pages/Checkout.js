import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserCart } from "../../functions/userCart";

const Checkout = () => {
	//state of products
	const [cartProducts, setCartProducts] = useState([]);
	const [cartTotal, setCartTotal] = useState(0);

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

	function saveAddressToDb() {
		//
	}
	return (
		<div className="row">
			<div className="col-md-6">
				<h4>Delivery Address</h4>
				<br />
				<br />
				textarea
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
						<button className="btn btn-primary">Place Order</button>
					</div>

					<div className="col-md-6">
						<button className="btn btn-primary">Empty Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
