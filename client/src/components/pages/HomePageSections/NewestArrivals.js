import React, { useEffect, useState } from "react";
import {
	listAllProducts,
	listOrderedProducts,
	getProductsCount,
} from "../../../functions/productCRUD";
import HomePageProductCard from "../../reusable-Components/HomePageProductCard";
import LoadingCardComponent from "../../reusable-Components/LoadingCardComponent";

//import Pagination from antd
import { Pagination } from "antd";

export const NewestArrivals = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	//to store the state of the current page
	const [pageCount, setPageCount] = useState(1);
	const [productsCount, setProductsCount] = useState();

	useEffect(() => {
		loadAllProducts();
	}, [pageCount]);

	useEffect(() => {
		getProductsCount().then((res) => setProductsCount(res.data));
	});

	const loadAllProducts = () => {
		setLoading(true);
		listOrderedProducts("createdAt", "desc", pageCount).then((res) => {
			setProducts(res.data);
			console.log("res from new funtion ", res);
			setLoading(false);
		});
	};

	return (
		<>
			<div className="container">
				{productsCount}
				{loading ? (
					<LoadingCardComponent count={3} />
				) : (
					<div className="row">
						{products.map((product) => (
							<div key={product._id} className="col-md-4">
								<HomePageProductCard product={product} />
							</div>
						))}
					</div>
				)}
			</div>

			<div className="row">
				<nav className="col-md-4 offset-md-4 text-center p-3">
					<Pagination
						current={pageCount}
						total={(productsCount / 3) * 10}
						onChange={(value) => setPageCount(value)}
					/>
				</nav>
			</div>
		</>
	);
};
