import React, { useState, useEffect } from "react";
import { getCategoryLists } from "../../../functions/categoryCRUD";
import { Link } from "react-router-dom";

const CategoryLists = () => {
	const [loading, setLoading] = useState(false);
	const [allCategories, setAllCategories] = useState([]);

	useEffect(() => {
		getCategoryLists().then((res) => {
			setLoading(true);
			setAllCategories(res.data);
			setLoading(false);
		});
	}, []);

	const showCategories = () =>
		allCategories &&
		allCategories.map((c) => {
			return (
				<div key={c._id} className="col btn btn-primary btn-raised m-1">
					{c.name}
				</div>
			);
		});

	return (
		<div className="container">
			<div className="row">
				{loading ? (
					<h4 className="text-center">Loading...</h4>
				) : (
					showCategories()
				)}
			</div>
		</div>
	);
};

export default CategoryLists;
