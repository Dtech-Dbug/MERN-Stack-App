/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";

//access state : for user authtoken
import { useSelector } from "react-redux";
//function for interacting w backend

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
	images: [],
};

export const CreateProduct = () => {
	//redux state
	const { user } = useSelector((state) => ({ ...state }));

	const [values, setValues] = useState(initialState);

	//show sub options only when category is selected,
	const [showSubcategories, setShowSubcategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(false);
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
					<h3>Create Product</h3>

					<div className="p-3">
						<FileUpload values={values} setValues={setValues} />
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
					/>
				</div>
			</div>
		</div>
	);
};
