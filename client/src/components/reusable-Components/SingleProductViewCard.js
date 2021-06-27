import React from "react";
import SingleProductInfo from "./SingleProductInfo";
import { Link } from "react-router-dom";
import { Card, Tabs } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import showAverageRating from "../../functions/rating";

//import modal component
import RatingModal from "../Modal/RatingModal";

// import caraousel from react-responsive-caraousel
import { Carousel } from "react-responsive-carousel";
//import css files for react-responsive-Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { Meta } = Card;
const { TabPane } = Tabs;
const SingleProductViewCard = ({ product, onStarClick, star }) => {
	const { title, images, description, _id } = product;
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
				{product && product.ratings.length > 0 ? (
					showAverageRating(product)
				) : (
					<div className="text-center pt-1 pb-3">No rating yet</div>
				)}

				<Card
					actions={[
						<>
							<ShoppingCartOutlined className="text-success" /> <br />
							Add to Cart
						</>,
						<Link to="/">
							<HeartOutlined className="text-info" /> <br /> Add to Wishlist
						</Link>,
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
