import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
	SmileTwoTone,
	UserOutlined,
	UserAddOutlined,
	HomeTwoTone,
	LogoutOutlined,
	DashboardTwoTone,
	ShoppingTwoTone,
	ShoppingCartOutlined,
} from "@ant-design/icons";

import Search from "../reusable-Components/Search";

import firebase from "firebase";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

export const Nav = () => {
	const [current, setCurrent] = useState("home");
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	const history = useHistory();

	const handleClick = (e) => {
		//
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();

		dispatch({
			type: "USER_LOGGED_OUT",
			payload: null,
		});

		history.push("/login");
	};

	return (
		<Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
			<Item key="home" icon={<HomeTwoTone twoToneColor="crimson" />}>
				<Link to="/">Home</Link>
			</Item>

			<Item key="shop" icon={<ShoppingTwoTone twoToneColor="crimson" />}>
				<Link to="/shop">Shop</Link>
			</Item>

			<Item key="cart" icon={<ShoppingCartOutlined />}>
				<Link to="/cart">Cart</Link>
			</Item>

			{!user && (
				<Item key="register" icon={<UserAddOutlined />} className="float-right">
					<Link to="/register">Register</Link>
				</Item>
			)}

			{!user && (
				<Item
					key="login"
					icon={<UserOutlined twoToneColor="crimson" />}
					className="float-right"
				>
					<Link to="/login">Login</Link>
				</Item>
			)}

			{user && (
				<SubMenu
					icon={<SmileTwoTone twoToneColor="crimson" />}
					title={user.email && user.email.split("@")[0]}
					//.split('@) to split at '@' : e.g => name@gmail.com split at @ => ['name' , 'gmail.com'] we need the 0th element for the name
					className="float-right"
				>
					{user && user.role === "admin" && (
						<Item icon={<DashboardTwoTone />}>
							<Link to="/admin/dashboard">Dashboard</Link>
						</Item>
					)}

					{user && user.role !== "admin" && (
						<Item icon={<DashboardTwoTone />}>
							<Link to="/user/history">User History/Dashboard</Link>
						</Item>
					)}

					<Item icon={<LogoutOutlined />} onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}

			<span className="float-right">
				<Search />
			</span>
		</Menu>
	);
};
