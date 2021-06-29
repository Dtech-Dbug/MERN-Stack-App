import React, { useState, useEffect } from "react";
import { getCategory } from "../../../functions/categoryCRUD";

const CategoryHome = ({ match }) => {
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		getCategory(match.params.slug).then((res) => {
			console.log(match.params.slug);
			console.log("res ::", res);
			console.log("product from category ", res.data.product);
			setCategory(res.data.category);
			setProduct(res.data.product);
		});
	}, []);
	return (
		<>
			<h2 className="jumbotron text-center display-4">
				{product && product.length} Products under {category.name}
			</h2>
		</>
	);
};

export default CategoryHome;
