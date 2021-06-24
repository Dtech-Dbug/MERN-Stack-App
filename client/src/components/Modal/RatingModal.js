import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={() => setShowModal(true)}>
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
