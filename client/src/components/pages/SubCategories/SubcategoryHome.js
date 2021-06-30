import React, { useState, useEffect } from "react";
import { getSubcategoryList } from "../../../functions/subCategoryCrud";
import HomePageProductCard from "../../reusable-Components/HomePageProductCard";

const SubcategoryHome = ({ match }) => {
	const [loading, setLoading] = useState(false);
	const [subCategory, setSubCategory] = useState();
	const [product, setProduct] = useState([]);

	useEffect(() => {
		getSubcategoryList(match.params.slug).then((res) => {
			setSubCategory(res.data.category);
			setProduct(res.data.product);
		});
	}, []);
	return (
		<>
			<h2 className="jumbotron text-center display-4">
				{product && product.length} Products under {subCategory.name}
			</h2>

			<div className="row">
				{product &&
					product.map((p) => {
						return (
							<div className="col" key={p._id}>
								<HomePageProductCard product={p} />;
							</div>
						);
					})}
			</div>
		</>
	);
};

export default SubcategoryHome;
