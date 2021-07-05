import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import JS from "../../Default images/js logo.png";
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { showAverageRating } from "../../functions/rating";
import _ from "lodash";
const { Meta } = Card;

const HomePageProductCard = ({ product }) => {
	const [tootltip, setTooltip] = useState("click to add to cart");
	const { images, title, description, slug, price } = product;
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

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

			//remove duplicate
			//using lodash for that = uniqwith method of lodash
			let unique = _.uniqWith(cart, _.isEqual);

			//save the new items to LS, when user adds to cart for forst time
			localStorage.setItem("cart", JSON.stringify(unique));
			setTooltip("Added");

			//add to redux
			dispatch({
				type: "ADD_TO_CART",
				payload: unique,
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

					<Tooltip title={tootltip}>
						<a onClick={handleAddToCart}>
							<ShoppingCartOutlined className="text-warning" /> <br /> Add To
							Cart
						</a>
					</Tooltip>,
				]}
			>
				<Meta title={`${title} - ${price}`} description={description} />
			</Card>
		</>
	);
};

export default HomePageProductCard;
