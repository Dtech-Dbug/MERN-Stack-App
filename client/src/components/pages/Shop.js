import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import { listAllProducts } from "../../functions/productCRUD";

const Shop = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	useEffect(() => {
		loadProducts();
	}, []);

	useEffect(() => {
		console.log("Pattern 🖌 ---> ", text);
	}, [text]);

	const loadProducts = () => {
		listAllProducts(9).then((res) => {
			setLoading(false);
			setProducts(res.data);
		});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3"> Search / Filter Menu</div>

				<div className="col-md-9">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4 className="info-bg">Products</h4>
					)}

					<div className="row pb-5">
						{products &&
							products.map((p) => {
								return (
									<div className="col-md-4 mt-3" key={p._id}>
										<HomePageProductCard product={p} />
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
