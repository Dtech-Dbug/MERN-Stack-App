import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { listAllProducts } from "../../../../../functions/productCRUD";
import AdminProductCard from "../../../../reusable-Components/AdminProductCard";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
const { default: AdminNav } = require("../../../../Nav/Admin-Nav");

const ListAllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadAllProducts();
	}, []);

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
								<AdminProductCard product={product} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ListAllProducts;
