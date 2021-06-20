import React, { useEffect, useState } from "react";
import {
	listAllProducts,
	listOrderedProducts,
} from "../../functions/productCRUD";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import LoadingCardComponent from "../reusable-Components/LoadingCardComponent";
import TypewriterComponent from "../reusable-Components/TypewriterComponent";

export const Home = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		listOrderedProducts("createdAt", "asc", 2).then((res) => {
			setProducts(res.data);
			setLoading(false);
		});
	};

	return (
		<>
			<h2>Home</h2>;
			<div className="jumbotron text-center h1 font-wright-bold">
				<TypewriterComponent
					text={["Latest Arrivals", "Hottest Deals", "Sale!Sale!Sale"]}
				/>
			</div>
			<hr />
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
