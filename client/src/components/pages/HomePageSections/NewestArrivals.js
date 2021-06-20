import React, { useEffect, useState } from "react";
import {
	listAllProducts,
	listOrderedProducts,
} from "../../../functions/productCRUD";
import HomePageProductCard from "../../reusable-Components/HomePageProductCard";
import LoadingCardComponent from "../../reusable-Components/LoadingCardComponent";
import TypewriterComponent from "../../reusable-Components/TypewriterComponent";

export const NewestArrivals = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		listOrderedProducts("createdAt", "desc", 3).then((res) => {
			setProducts(res.data);
			console.log("res from new funtion ", res);
			setLoading(false);
		});
	};

	return (
		<>
			<div className="container">
				{loading ? (
					<LoadingCardComponent count={3} />
				) : (
					<div className="row">
						{products.map((product) => (
							<div key={product._id} className="col-md-4">
								<HomePageProductCard product={product} />
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};
