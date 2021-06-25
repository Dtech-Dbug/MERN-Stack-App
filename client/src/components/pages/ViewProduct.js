import React, { useState, useEffect } from "react";
import { readProduct } from "../../functions/productCRUD";
import SingleProductViewCard from "../reusable-Components/SingleProductViewCard";

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [product, setProduct] = useState([]);

	//state of stars, instead of hard coding
	const [star, setStar] = useState(0);

	useEffect(() => {
		readProduct(slug).then((res) => {
			console.log("Response in the single product", res.data);
			setProduct(res.data);
		});
	}, []);

	function onStarClick(newRating, name) {
		//name => id of the product which is being rated
		console.table(newRating, name);

		//setStar ti=o newrating=> whatver star number we useri is selecting
		setStar(newRating);
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
			</div>
		</div>
	);
};

export default ViewProduct;
