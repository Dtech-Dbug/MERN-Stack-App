import React from "react";
import { Link } from "react-router-dom";

const SingleProductInfo = ({ product }) => {
	const { price, category, subCategories, shipping, color, quantity, sold } =
		product;
	return (
		<ul className="list-group">
			<li className="list-group-item">
				Price{" "}
				<span className="label label-default label-pill pull-xs-right ">
					$ {price}
				</span>
			</li>
			{category && (
				<li className="list-group-item">
					Category{" "}
					<Link
						to={`/category/${category.slug}`}
						className="label label-default label-pill pull-xs-right"
					>
						{category.name}
					</Link>
				</li>
			)}
			<li className="list-group-item">
				Sub Categories{" "}
				{subCategories &&
					subCategories.map((s) => {
						return (
							<Link
								to={`subcategory/${s.slug}`}
								key={s._id}
								className="label label-default label-pill pull-xs-right "
							>
								{s.name}
							</Link>
						);
					})}
			</li>
			<li className="list-group-item">
				Shipping{" "}
				<span className="label label-default label-pill pull-xs-right ">
					{shipping}
				</span>
			</li>
			<li className="list-group-item">
				Color{" "}
				<span className="label label-default label-pill pull-xs-right ">
					{color}
				</span>
			</li>
			<li className="list-group-item">
				In Stock
				<span className="label label-default label-pill pull-xs-right ">
					{quantity}
				</span>
			</li>
			<li className="list-group-item">
				Sold Items
				<span className="label label-default label-pill pull-xs-right ">
					{sold}
				</span>
			</li>
		</ul>
	);
};

export default SingleProductInfo;

//pull-xs-right => Is the className that moves the content to the right in the card
