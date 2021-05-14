import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import {
	SmileTwoTone,
	UserOutlined,
	UserAddOutlined,
	HomeTwoTone,
	LogoutOutlined,
} from "@ant-design/icons";

import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const { SubMenu, Item } = Menu;

export const Nav = () => {
	const [current, setCurrent] = useState("home");
	const dispatch = useDispatch();
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

			<Item key="register" icon={<UserAddOutlined />} className="float-right">
				<Link to="/register">Register</Link>
			</Item>

			<Item
				key="login"
				icon={<UserOutlined twoToneColor="crimson" />}
				className="float-right"
			>
				<Link to="/login">Login</Link>
			</Item>

			<SubMenu icon={<SmileTwoTone twoToneColor="crimson" />} title="User">
				<Item key="setting:1">Option 1</Item>
				<Item icon={<LogoutOutlined />} onClick={logout}>
					Logout
				</Item>
			</SubMenu>
		</Menu>
	);
};
