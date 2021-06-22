import React, { useState, useEffect } from "react";
import { readProduct } from "../../functions/productCRUD";
import SingleProductViewCard from "../reusable-Components/SingleProductViewCard";

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [products, setProducts] = useState([]);

	useEffect(() => {
		readProduct(slug).then((res) => {
			console.log("Response in the single product", res.data);
			setProducts(res.data);
		});
	}, []);

	return (
		<div>
			<h1>Welcome</h1>
			<h3>{slug}</h3>

			<br />
			<br />

			{JSON.stringify(products)}

			<div className="container-fluid">
				<div className="row pt-3 p-3">
					<SingleProductViewCard products={products} />
				</div>

				<div className="row">
					<h3>Related Prodcuts</h3>
				</div>
			</div>
		</div>
	);
};

export default ViewProduct;
