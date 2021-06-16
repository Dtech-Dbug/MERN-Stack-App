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
import {
	readProduct,
	updateProduct,
} from "../../../../../functions/productCRUD";
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

export const UpdateProduct = ({ match, history }) => {
	//redux state
	const { user } = useSelector((state) => ({ ...state }));

	const [values, setValues] = useState(initialState);

	//show sub options only when category is selected,
	const [showSubcategories, setShowSubcategories] = useState([]);

	//new array to store array of sub Categories Id : for useing it in values of SELECT element in antd
	const [arrayOfSubcategoriesId, setArrayOfSubcategoriesId] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(false);

	//a new state for the categories
	const [categories, setCategories] = useState([]);
	// destructure yhe values so we dont have to use value.field
	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	function loadProduct() {
		readProduct(match.params.slug).then((res) => {
			//1. Load single product
			console.log("response fater readig product ==> ", res);

			//2. spread the values
			setValues({ ...values, ...res.data });

			//get subs based on category ID
			getSubs(res.data.category._id).then((res) => {
				//show sub categories based on parent categpry ID
				setShowSubcategories(res.data);
			});

			//pushing ids of subCategories in an array
			// to work woth SELECT component from antd
			//bcx it accepets simple arrays, and our subCategories array was array of objects
			const arrayOfIds = [];
			res.data.subCategories.map((item) => {
				return arrayOfIds.push(item._id);
			});
			console.log("ARRAY OF IDS", arrayOfIds);
			setArrayOfSubcategoriesId((prev) => arrayOfIds);
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
		//append the ew states to the values object
		//subcategory and category

		values.subCategories = arrayOfSubcategoriesId;
		values.category = selectedCategory ? selectedCategory : values.category;
		updateProduct(match.params.slug, values, user.token)
			.then((res) => {
				console.log("Updaet response ==> ", res);
				toast.success(`${res.data.title} Product is updated`);
				history.push("/admin/products");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.response.data.err);
			});
	}

	function handleChange(e) {
		e.preventDefault();

		setValues({ ...values, [e.target.name]: e.target.value });
	}
	function handleCategoryChange(e) {
		e.preventDefault();
		console.log("Parent ID ----> ", e.target.value);
		setValues({ ...values });

		getSubs(e.target.value).then((res) => {
			console.log(res);
			setShowSubcategories(res.data);
		});
		// in here , setSelectedCategory holds the state of the categories that the user clicks on in the update form
		// We chech the target.value with default catgory id to restore the subcategories, if user wishes to stick to it;ss choice of creation
		setSelectedCategory(e.target.value);
		console.log("default category ", values.category);
		console.log("selected Ctaegory on update ", e.target.value);

		//we check if the default category id is equal to the new category that user clicked
		//we show the subs while creation

		//set The array of subcategpries to empty when the categories changes,
		// So , as they do not persisit
		//e.g => lenovo subCategories, are deleted from the subcategory SELECT Option when admin chooses a different category
		setArrayOfSubcategoriesId([]);
		if (values.category._id === e.target.value) {
			loadProduct();
		}
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
							setLoading={setLoading}
						/>
					</div>

					{JSON.stringify(values)}

					<ProductUpdateForm
						handleChange={handleChange}
						handleSubmit={handleSubmit}
						handleCategoryChange={handleCategoryChange}
						values={values}
						setValues={setValues}
						categories={categories}
						showSubcategories={showSubcategories}
						arrayOfSubcategoriesId={arrayOfSubcategoriesId}
						setArrayOfSubcategoriesId={setArrayOfSubcategoriesId}
						selectedCategory={selectedCategory}
					/>
				</div>
			</div>
		</div>
	);
};
