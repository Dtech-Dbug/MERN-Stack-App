import React, { useState } from "react";
import { Modal, Button } from "antd";
import { useSelector } from "react";
import { StarOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={() => setShowModal(true)}>
				<StarOutlined /> <br /> {user ? "Rate Product" : "Login To Rate"}
			</div>

			<Modal
				title="Leave a Rating :)"
				centered
				visible={showModal}
				onOk={() => {
					setShowModal(false);
					toast.suces("Thanks for your review");
				}}
				oncancel={() => {
					setShowModal(false);
				}}
			></Modal>
		</>
	);
};

export default RatingModal;
