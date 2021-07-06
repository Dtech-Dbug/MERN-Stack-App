import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button } from "antd";

const DrawerCard = ({ children }) => {
	const { drawer, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	return (
		<Drawer
			onClose={() =>
				dispatch({
					type: "SHOW_CART_DRAWER",
					payload: false,
				})
			}
			className="text-center"
			title={`cart / ${cart.length} Products`}
			visible={drawer}
		>
			{JSON.stringify(cart)}
		</Drawer>
	);
};

export default DrawerCard;
