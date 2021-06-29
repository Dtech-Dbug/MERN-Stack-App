import React, { useState, useEffect } from "react";
import {
	readProduct,
	productRating,
	relatedProducts,
} from "../../functions/productCRUD";
import SingleProductViewCard from "../reusable-Components/SingleProductViewCard";
import { useSelector } from "react-redux";
import { Card } from "antd";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
const { Meta } = Card;

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [product, setProduct] = useState([]);
	const [relatedProductsList, setRelatedProductsList] = useState([]);

	//state of stars, instead of hard coding
	const [star, setStar] = useState(0);

	//access to the usrr, to pass the user.token
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadProduct();
	}, []);

	const loadProduct = () => {
		readProduct(slug).then((res) => {
			console.log("Response in the single product", res.data);
			setProduct(res.data);
			relatedProducts(res.data._id).then((res) => {
				console.log("related Products:", res.data);
				setRelatedProductsList(res.data);
			});
		});
	};

	useEffect(() => {
		//to show the selected star rating
		if (product.ratings && user) {
			let existingRatingObject = product.ratings.find(
				(element) => element.postedBy.toString() === user._id.toString()
				//changed the IDs to trimg and made losse equal operation to make it work
				//without th toString , the ratings arrays in the FrontEnd kept pushing new ratings, instead of updating
			);
			existingRatingObject && setStar(existingRatingObject.star); //to show the selected stars by the user
		}
	});

	function onStarClick(newRating, name) {
		//name => id of the product which is being rated
		console.table(newRating, name);

		//setStar ti=o newrating=> whatver star number we useri is selecting
		setStar(newRating);
		productRating(name, newRating, user.token).then((res) => {
			console.log("Rating Given", res);
			loadProduct(); //immediately reflecet change
		});
	}

	return (
		<div>
			<h1>Welcome</h1>

			<div className="container-fluid">
				<div className="row pt-3 p-3">
					<SingleProductViewCard
						product={product}
						onStarClick={onStarClick}
						star={star}
					/>
				</div>

				<div className="row">
					<div className="col p-3 text-center">
						<h3 className="font-weight-bold">
							<u>Related Prodcuts</u>
						</h3>
					</div>
				</div>

				<div className="row p-3 pb-3">
					{relatedProductsList &&
						relatedProductsList.map((p, index) => {
							return (
								<div className="col-md-4" key={index}>
									<HomePageProductCard
										product={p}
										onStarClick={onStarClick}
										star={star}
									/>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default ViewProduct;
