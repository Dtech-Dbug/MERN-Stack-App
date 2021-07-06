import React from "react";
import { useSelector, useDispacth } from "react-redux";
import { Drawer, Button } from "antd";

const DrawerCard = ({ children }) => {
	const { drawer, cart } = useSelector((state) => ({ ...state }));

	return <Drawer visible={true}>{JSON.stringify(cart)}</Drawer>;
};

export default DrawerCard;
