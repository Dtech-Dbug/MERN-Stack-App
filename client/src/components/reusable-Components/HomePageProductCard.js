import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import JS from "../../Default images/js logo.png";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { showAverageRating } from "../../functions/rating";
const { Meta } = Card;

const HomePageProductCard = ({ product }) => {
	const { images, title, description, slug, price } = product;
	return (
		<>
			<div className="text-center">
				{product && product.ratings && product.ratings.length > 0 ? (
					showAverageRating(product)
				) : (
					<div className="text-center pt-1 pb-3">No rating yet</div>
				)}
			</div>
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
						<Link to={`/products/${slug}`}>
							<EyeOutlined className="text-warning" /> <br /> view Prouct
						</Link>
					</>,

					<a onClick={handleAddToCart}>
						<ShoppingCartOutlined className="text-warning" /> <br /> Add To Cart
					</a>,
				]}
			>
				<Meta title={`${title} - ${price}`} description={description} />
			</Card>
		</>
	);
};

export default HomePageProductCard;
