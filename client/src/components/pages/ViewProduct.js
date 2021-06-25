import React, { useState, useEffect } from "react";
import { readProduct, productRating } from "../../functions/productCRUD";
import SingleProductViewCard from "../reusable-Components/SingleProductViewCard";
import { useSelector } from "react-redux";

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [product, setProduct] = useState([]);

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
		});
	};

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
			</div>
		</div>
	);
};

export default ViewProduct;
