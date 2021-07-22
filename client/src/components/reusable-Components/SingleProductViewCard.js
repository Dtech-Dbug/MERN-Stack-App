import React, { useState } from "react";
import SingleProductInfo from "./SingleProductInfo";
import { Link } from "react-router-dom";
import { Card, Tabs, Tooltip } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { showAverageRating } from "../../functions/rating";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
//import modal component
import RatingModal from "../Modal/RatingModal";

// import caraousel from react-responsive-caraousel
import { Carousel } from "react-responsive-carousel";
//import css files for react-responsive-Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addToWishlist } from "../../functions/userCart";
import { useHistory } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProductViewCard = ({ product, onStarClick, star }) => {
	const [tooltip, setTooltip] = useState("Click to add to cart");
	const { title, images, description, _id, ratings } = product;
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();
	const history = useHistory();

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

			dispatch({
				type: "SHOW_CART_DRAWER",
				payload: true,
			});
		}
	};

	const handleAddToWishList = (e) => {
		e.preventDefault();
		addToWishlist(product._id, user.token).then((res) => {
			toast.success("Added To Wihslist");
			console.log(res.data);
		});
	};

	return (
		<>
			<div className="col-md-7">
				<Carousel showArrows={true} autoPlay infiniteLoop>
					{images &&
						images.map((i) => {
							return <img src={i.url} key={i.public_id} alt="oops" />;
						})}
				</Carousel>

				<Tabs type="card">
					<TabPane tab="Description" key="1">
						{description && description}
					</TabPane>
					<TabPane tab="More" key="2">
						<p>Contact Us For more Info , here 🤜 xxxxxxxx</p>
					</TabPane>
				</Tabs>
			</div>

			<div className="col-md-5">
				<h3 className="bg-info text-center ">{title}</h3>
				{product && ratings && ratings.length > 0 ? (
					showAverageRating(product)
				) : (
					<div className="text-center pt-1 pb-3">No rating yet</div>
				)}

				<Card
					actions={[
						<Tooltip title={tooltip}>
							<a onClick={handleAddToCart}>
								<ShoppingCartOutlined className="text-success" /> <br />
								Add to Cart
							</a>
						</Tooltip>,
						<a onClick={handleAddToWishList}>
							<HeartOutlined className="text-info" /> <br /> Add to Wishlist
						</a>,
						<RatingModal>
							<StarRatings
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor="Yellow"
							/>
						</RatingModal>,
					]}
				>
					<SingleProductInfo product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProductViewCard;
