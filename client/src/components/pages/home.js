import React, { useEffect, useState } from "react";
import { listAllProducts } from "../../functions/productCRUD";

export const Home = () => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		listAllProducts(5).then((res) => {
			setProducts(res.data);
		});
	};

	return (
		<>
			<h2>Home</h2>;{JSON.stringify(products)}
		</>
	);
};
