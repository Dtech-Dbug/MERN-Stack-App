import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCartTableView from "../reusable-Components/ProductCartTableView";

//import function to save cartItem in backedn under user loggedin
import { userCart } from "../../functions/userCart";

const Cart = ({ history }) => {
	const dispatch = useDispatch();
	const { cart, user } = useSelector((state) => ({ ...state }));

	//define thw function to get total proce
	function getTotal() {
		return cart.reduce((current, next) => {
			return current + next.price * next.count;
		}, 0);
	}

	function saveCartItemsToDb() {
		console.log("Cart", JSON.stringify(cart, null, 4));

		//save the cartItems in the backedn. databasse under the loggedIn user
		userCart(cart, user.token)
			.then((res) => {
				console.log(res);
				if (res.data.ok) history.push("/checkout");
			})
			.catch((err) => console.log("cart save error", err));
	}

	//saveCashOrders
	function saveCashOrders() {
		console.log("Cart", JSON.stringify(cart, null, 4));

		dispatch({
			type: "CASH_ON_DELIVERY",
			payload: true,
		});

		//save the cartItems in the backedn. databasse under the loggedIn user
		userCart(cart, user.token)
			.then((res) => {
				console.log(res);
				if (res.data.ok) history.push("/checkout");
			})
			.catch((err) => console.log("cart save error", err));
	}

	//creatingthe card table in a fncn
	const showCartTable = () => {
		return (
			<table className="table table-bordered">
				<thead className="thead-light">
					<tr>
						<th scope="col"> Image</th>
						<th scope="col"> Title</th>
						<th scope="col"> Price</th>
						<th scope="col"> Color</th>
						<th scope="col"> Count</th>
						<th scope="col"> Shipping</th>
						<th scope="col"> Remove</th>
					</tr>
				</thead>

				{cart.map((p) => (
					<ProductCartTableView key={p._id} product={p} />
				))}
			</table>
		);
	};

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
						showCartTable()
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
						<>
							<button
								onClick={saveCartItemsToDb}
								className="btn btn-sm btn-primary btn-raised"
							>
								Proceed to checkout
							</button>

							<br />

							<button
								onClick={saveCashOrders}
								className="btn btn-sm btn-secondary btn-raised"
							>
								Cash On Delivery
							</button>
						</>
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
