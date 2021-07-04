import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import JS from "../../Default images/js logo.png";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { showAverageRating } from "../../functions/rating";
const { Meta } = Card;

const HomePageProductCard = ({ product }) => {
	const { images, title, description, slug, price } = product;

	const handleAddToCart = () => {
		//create an array of cart to save the array in LocalStorgae
		let cart = [];

		//check if window === true , add cart to localStorage
		if (typeof window !== undefined) {
			//and localStorage has the cart already = case when user has already added one to cart
			if (localStorage.getItem("cart")) {
				//use JSON.parse to get the stored data a JS objects
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			//push newProduct to cart
			//spread the product prop : to access all it's values
			//and add a new key called count to the product object
			cart.push({
				...product,
				count: 1,
			});
		}
	};
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
