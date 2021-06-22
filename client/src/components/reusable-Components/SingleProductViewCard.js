import React from "react";

const SingleProductViewCard = ({ products }) => {
	const { title, description, slug, images } = products;
	return (
		<>
			<div className="col-md-7">
				<h2>Image craousel</h2>
			</div>

			<div className="col-md-5">
				<h3>{title}</h3>
			</div>
		</>
	);
};

export default SingleProductViewCard;
