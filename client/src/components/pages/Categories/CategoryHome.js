import React, { useState, useEffect } from "react";
import { getCategory } from "../../../functions/categoryCRUD";

const CategoryHome = ({ match }) => {
	const [loading, setLoading] = useState(false);
	const [category, setCategory] = useState();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		getCategory(match.params.slug).then((res) => console.log("res ::", res));
	});
	return (
		<div>
			<h3>Hello</h3>
		</div>
	);
};

export default CategoryHome;
