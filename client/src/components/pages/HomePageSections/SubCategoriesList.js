import React, { useState, useEffect } from "react";
import { getSubcategoryLists } from "../../../functions/subCategoryCrud";
import { Link } from "react-router-dom";

const SubCategoriesList = () => {
	const [loading, setLoading] = useState(false);
	const [subCategories, setSubCategories] = useState([]);

	useEffect(() => {
		getSubcategoryLists().then((res) => {
			setLoading(true);
			setSubCategories(res.data);
			setLoading(false);
		});
	}, []);

	const showSubCategories = () =>
		subCategories &&
		subCategories.map((c) => {
			return (
				<div
					key={c._id}
					className="col btn btn-outlined-primary btn-lg btn-raised m-3"
				>
					<Link to={`/category/${c.slug}`}>{c.name}</Link>
				</div>
			);
		});

	return (
		<div className="container">
			<div className="row">
				{loading ? (
					<h4 className="text-center">Loading...</h4>
				) : (
					showSubCategories()
				)}
			</div>
		</div>
	);
};

export default SubCategoriesList;
