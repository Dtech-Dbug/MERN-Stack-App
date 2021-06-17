import React from "react";
import { Card } from "antd";
import JS from "../../Default images/js logo.png";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
const { Meta } = Card;

const HomePageProductCard = ({ product }) => {
	const { images, title, description } = product;
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
				<>
					<EyeOutlined className="text-warning" /> <br /> view Prouct
				</>,

				<>
					<ShoppingCartOutlined className="text-warning" /> <br /> Add To Cart
				</>,
			]}
		>
			<Meta title={title} description={description} />
		</Card>
	);
};

export default HomePageProductCard;
