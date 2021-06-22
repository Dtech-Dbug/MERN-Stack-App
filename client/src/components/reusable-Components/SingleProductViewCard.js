import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

const { Meta } = Card;
const SingleProductViewCard = ({ products }) => {
	const { title, description, slug, images } = products;
	return (
		<>
			<div className="col-md-7">
				<h2>Image craousel</h2>
			</div>

			<div className="col-md-5">
				<Card
					actions={[
						<>
							<ShoppingCartOutlined className="text-success" /> <br />
							Add to Cart
						</>,
						<Link to="/">
							<HeartOutlined className="text-info" /> <br /> Add to Wishlist
						</Link>,
					]}
				>
					<Meta title={title} description={description} />
					<p>
						price/category/subs/shipping/color/brand/quantity available/sold
					</p>
				</Card>
			</div>
		</>
	);
};

export default SingleProductViewCard;
