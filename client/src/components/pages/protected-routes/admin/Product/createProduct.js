/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

//access state : for user authtoken
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

//importing functions FE
import { createProduct } from "../../../../../functions/productCRUD";

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

export const CreateProduct = () => {
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

	function handleSubmit(e) {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				console.log(window.location.href);
				window.alert(`${res.data.title} is created`);
				//window.location.reload();
			})
			.catch((err) => toast.error(err.response.data.err));
	}

	function handleChange(e) {
		e.preventDefault();

		setValues({ ...values, [e.target.name]: e.target.value });
	}

	function handleCategoryChange(e) {
		e.preventDefault();
		console.log("Parent ID ----> ", e.target.value);
		setValues({ ...values, subCategories: [], category: e.target.value });

		getSubs(e.target.value).then((res) => {
			console.log(res);
			setShowSubcategories(res.data);
		});
		setSelectedCategory(true);
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
						<h3>Create Product</h3>
					)}

					<div className="p-3">
						<FileUpload
							values={values}
							setValues={setValues}
							loading={loading}
							setLoading={setLoading}
						/>
					</div>

					{JSON.stringify(values.images)}

					<ProductCreateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
						setValues={setValues}
						handleCategoryChange={handleCategoryChange}
						showSubcategories={showSubcategories}
						selectedCategory={selectedCategory}
						loading={loading}
						setLoading={setLoading}
					/>
				</div>
			</div>
		</div>
	);
};
