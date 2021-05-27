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

	// destructure yhe values so we dont have to use value.field
	const { title, description, price, quantity, shipping, color, colors } =
		values;

	function handleSubmit(e) {
		e.preventDefault();
		createProduct(values, user.token)
			.then((res) => {
				console.log(res);
				console.log(window.location.href);
				window.alert(`${res.data.title} is created`);
			})
			.catch((err) => toast.error(err.message));
	}

	function handleChange(e) {
		e.preventDefault();

		setValues({ ...values, [e.target.name]: e.target.value });
	}
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h3>Create Product</h3>

					<ProductCreateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
					/>
				</div>
			</div>
		</div>
	);
};
