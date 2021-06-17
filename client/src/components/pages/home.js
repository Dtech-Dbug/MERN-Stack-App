import React, { useEffect, useState } from "react";
import { listAllProducts } from "../../functions/productCRUD";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";

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
			<div className="jumbotron text-center font-wright-bold">Hello</div>
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
