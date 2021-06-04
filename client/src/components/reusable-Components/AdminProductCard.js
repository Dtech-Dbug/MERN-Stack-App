import React from "react";
import JS from "../../Default images/js logo.png";
import { Link } from "react-router-dom";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
	// destructure
	const { title, description, images, slug } = product;

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
				<Link to={`product/${slug}`}>
					<EditTwoTone
						className="btn btn-outline-primary btn-raised"
						style={{ width: "50%" }}
						title="Edit Product"
					/>
				</Link>,
				<DeleteTwoTone
					className="btn btn-outline-danger btn-raised"
					style={{ width: "50%" }}
					title="Delete Product"
					onClick={() => handleRemove(slug)}
				/>,
			]}
		>
			<Meta title={title} description={description} />
		</Card>
	);
};

export default AdminProductCard;

/*  */
