import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
	const dispatch = useDispatch();
	const { cart, user } = useSelector((state) => ({ ...state }));

	//define thw function to get total proce
	function getTotal() {
		return cart.reduce((current, next) => {
			return current + next.price * next.count;
		}, 0);
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-8">
					<h4>Cart / {cart.length}</h4>

					{!cart.length ? (
						<p>
							No products in cart. <Link to="/shop">Continue Shopping.</Link>
						</p>
					) : (
						"show cart items"
					)}
				</div>

				<div className="col-md-4">
					<h4>Order Summary</h4>
					<hr />
					<p>Products</p>
					<hr />
					{cart &&
						cart.length > 0 &&
						cart.map((c, i) => {
							return (
								<div key={i}>
									<p>
										{c.title} x {c.count} = ${c.price * c.count}
									</p>
								</div>
							);
						})}
					<hr />
					Total :<b>${getTotal()}</b>
					<hr />
					{user ? (
						<button className="btn btn-sm btn-primary btn-raised">
							Proceed to checkout
						</button>
					) : (
						<button className="btn btn-sm btn-primary btn-raised">
							<Link
								to={{
									pathname: "/login",
									state: { from: "cart" },
								}}
							>
								Login to checkout
							</Link>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
