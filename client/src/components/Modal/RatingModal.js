import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [showModal, setShowModal] = useState(false);
	const { slug } = useParams();
	const history = useHistory();
	function handleModal() {
		if (user && user.token) {
			setShowModal(true);
		} else {
			//we want to redirect the user from this page to logIn page
			//if user is not signed in
			history.push({
				pathname: "/login",
				state: { from: `products/${slug}` },
			});
		}
	}

	return (
		<>
			<div onClick={handleModal}>
				<StarOutlined className="text-danger" /> <br />{" "}
				{user ? "Leave rating" : "Login to leave rating"}
			</div>

			<Modal
				title="Leave your rating"
				centered
				visible={showModal}
				onOk={() => {
					setShowModal(false);
					toast.success("Thanks for your review. It will apper soon");
				}}
				onCancel={() => setShowModal(false)}
			>
				{children}
			</Modal>
		</>
	);
};

export default RatingModal;
