import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector((state) => ({ ...state }));

	return (
		<div className="container-fluid">
			<div className="row">Cart</div>

			{JSON.stringify(cart)}
		</div>
	);
};

export default Cart;
