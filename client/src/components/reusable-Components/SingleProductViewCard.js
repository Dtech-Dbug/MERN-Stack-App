import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";

// import caraousel from react-responsive-caraousel
import {Carousel} from 'react-responsive-carousel'
//import css files for react-responsive-Carousel
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const { Meta } = Card;
const SingleProductViewCard = ({ products }) => {
	const { title, description, slug, images } = products;
	return (
		<>
			<div className="col-md-7">
				<h2>Image craousel</h2>
				<Carousel showArrows={true} autoPlay infiniteLoop>
					{images && images.map((i) => {
						 return <img src={i.url} key={i.public_id} alt='oops' />
					})}
				</Carousel>
			</div>

			<div className="col-md-5">
				<h3 className='text-center '>{title}</h3>
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
					
					<p>
						price/category/subs/shipping/color/brand/quantity available/sold
					</p>
				</Card>
			</div>
		</>
	);
};

export default SingleProductViewCard;
