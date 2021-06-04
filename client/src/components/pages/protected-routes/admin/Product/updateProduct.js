import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

//access state : for user authtoken
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

//import product crate form
import { ProductCreateForm } from "../../../../reusable-Components/productCreateForm";

//import FileUpload component
import { FileUpload } from "../../../../reusable-Components/fileUpload";
//import function for fetching all categories
import {
	getCategoryLists,
	getSubs,
} from "../../../../../functions/categoryCRUD";
const initialState = {
	title: "",
	description: "",
	price: "",
	quantity: "",
	shipping: "",
	color: "",
	colors: ["Red", "Blue", "Green", "Black", "White"],
	categories: [],
	category: "",
	subCategories: [],
	images: [
		// {
		// 	public_id: "jwrzeubemmypod99e8lz",
		// 	url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480909/jwrzeubemmypod99e8lz.jpg",
		// },
		// {
		// 	public_id: "j7uerlvhog1eic0oyize",
		// 	url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480912/j7uerlvhog1eic0oyize.jpg",
		// },
		// {
		// 	public_id: "ho6wnp7sugyemnmtoogf",
		// 	url: "https://res.cloudinary.com/dcqjrwaoi/image/upload/v1599480913/ho6wnp7sugyemnmtoogf.jpg",
		// },
	],
};

export const UpdateProduct = () => {
	//redux state
	const { user } = useSelector((state) => ({ ...state }));

	const [values, setValues] = useState(initialState);

	//show sub options only when category is selected,
	const [showSubcategories, setShowSubcategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(false);
	const [loading, setLoading] = useState(false);
	// destructure yhe values so we dont have to use value.field
	useEffect(() => {
		loadCategories();
	}, []);

	function loadCategories() {
		getCategoryLists().then((res) =>
			setValues({ ...values, categories: res.data })
		);
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					{loading ? (
						<LoadingOutlined className="alert alert-danger" />
					) : (
						<h3>Update Product</h3>
					)}
					<hr />

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							loading={loading}
							setLoading={setLoading}
						/>
					</div>

					{JSON.stringify(values.images)}
				</div>
			</div>
		</div>
	);
};
