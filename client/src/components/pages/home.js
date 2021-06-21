import React, { useEffect, useState } from "react";
import {
	listAllProducts,
	listOrderedProducts,
} from "../../functions/productCRUD";

import TypewriterComponent from "../reusable-Components/TypewriterComponent";
import { NewestArrivals } from "./HomePageSections/NewestArrivals";
import { BestSellers } from "./HomePageSections/BestSellers";

export const Home = () => {
	return (
		<>
			<h2>Home</h2>;
			<div className="jumbotron text-center h1 font-wright-bold">
				<TypewriterComponent
					text={["Latest Arrivals", "Hottest Deals", "Sale!Sale!Sale"]}
				/>
			</div>
			<hr />
			<h3 className="display-6 jumbotron text-center mt-1 mb-1">
				Newset Deals
			</h3>
			<NewestArrivals />
			<br />
			<br />
			<h3 className="display-6 jumbotron text-center mt-1 mb-1">
				Best Sellers
			</h3>
			<BestSellers />
		</>
	);
};
