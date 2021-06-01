import React from "react";
import JS from "../../Default images/js logo.png";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product }) => {
	// destructure
	const { title, description, images } = product;

	return (
		<Card
			className="m-3"
			style={{ border: "1px solid black" }}
			cover={
				<img
					src={images && images.length ? images[0].url : JS}
					style={{ height: "150px", objectFit: "cover" }}
					className="col-md-6 offset-md-2 mt-1"
					alt="oops"
				/>
			}
			actions={[
				<EditTwoTone
					className="btn btn-outline-primary btn-raised"
					style={{ width: "50%" }}
					title="Edit Product"
				/>,
				<DeleteTwoTone
					className="btn btn-outline-danger btn-raised"
					style={{ width: "50%" }}
					title="Delete Product"
				/>,
			]}
		>
			<Meta title={title} description={description} />
		</Card>
	);
};

export default AdminProductCard;

/*  */
