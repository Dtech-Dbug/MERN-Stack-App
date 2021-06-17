import React, { useEffect, useState } from "react";
import { listAllProducts } from "../../functions/productCRUD";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import TypewriterComponent from "../reusable-Components/TypewriterComponent";

export const Home = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		listAllProducts(3).then((res) => {
			setProducts(res.data);
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
				<div className="row">
					{products.map((product) => (
						<div key={product._id} className="col-md-4">
							<HomePageProductCard product={product} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};
