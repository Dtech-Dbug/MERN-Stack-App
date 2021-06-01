import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { listAllProducts } from "../../../../../functions/productCRUD";
import { useSelector } from "react-redux";
import AdminProductCard from "../../../../reusable-Components/AdminProductCard";
import { removeProduct } from "../../../../../functions/productCRUD";

const { default: AdminNav } = require("../../../../Nav/Admin-Nav");

const ListAllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadAllProducts();
	}, []);

	function handleRemove(slug) {
		console.log("deleted product slug ===>", slug);
		let answer = window.confirm("Sure, you want to delete?");
		if (answer) {
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.error(`${res.data.title} has been deleted`);
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data);
					console.log(err);
				});
		}
	}

	const loadAllProducts = () => {
		setLoading(true);
		listAllProducts(10)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col">
					{loading ? <h4>Loading</h4> : <h4>All Products</h4>}

					<div className="row">
						{products.map((product) => (
							<div key={product._id} className="col-md-4">
								<AdminProductCard
									product={product}
									handleRemove={handleRemove}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListAllProducts;
