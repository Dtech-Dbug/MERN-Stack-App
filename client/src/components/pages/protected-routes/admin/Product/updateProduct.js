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
import { readProduct } from "../../../../../functions/productCRUD";
import { ProductUpdateForm } from "../../../../reusable-Components/productUpdateForm";
const initialState = {
	title: "",
	description: "",
	price: "",
	quantity: "",
	shipping: "",
	color: "",
	colors: ["Red", "Blue", "Green", "Black", "White"],
	category: "",
	subCategories: [],
	images: [],
};

export const UpdateProduct = ({ match }) => {
	//redux state
	const { user } = useSelector((state) => ({ ...state }));

	const [values, setValues] = useState(initialState);

	//show sub options only when category is selected,
	const [showSubcategories, setShowSubcategories] = useState([]);

	const [selectedCategory, setSelectedCategory] = useState(false);
	const [loading, setLoading] = useState(false);

	//a new state for the categories
	const [categories, setCategories] = useState([]);
	// destructure yhe values so we dont have to use value.field
	useEffect(() => {
		loadCategory();
	}, []);

	function loadCategory() {
		readProduct(match.params.slug).then((res) => {
			console.log("response fater readig product ==> ", res);
			setValues({ ...values, ...res.data });
		});
	}
	//Creating a new state for the categories , in the updateComponent
	//As the categpries from the values can override any othr declarations
	//delete categoried from the initialState object and put it in a different state,and popualate it with data from server on component mount
	function loadCategories() {
		getCategoryLists().then((res) => {
			console.log("Res : category Losts in update Produyct page ==>", res.data);
			setCategories(res.data);
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		// createProduct(values, user.token)
		// 	.then((res) => {
		// 		console.log(res);
		// 		console.log(window.location.href);
		// 		window.alert(`${res.data.title} is created`);
		// 		//window.location.reload();
		// 	})
		// 	.catch((err) => toast.error(err.response.data.err));
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

					{JSON.stringify(values)}

					<ProductUpdateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						values={values}
						setValues={setValues}
						categories={categories}
					/>
				</div>
			</div>
		</div>
	);
};
