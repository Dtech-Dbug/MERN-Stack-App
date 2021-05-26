/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
//access state : for user authtoken
import { useSelector } from "react-redux";

//function for interacting w backend
import { getCategoryLists } from "../../../../../functions/categoryCRUD";

import {
	createSubcategory,
	removeSubcategory,
	getSubcategoryLists,
} from "../../../../../functions/subCategoryCrud";
import { Link } from "react-router-dom";

//importing the filer component
import { FilterForm } from "../../../../reusable-Components/filterForm";

export const CreateSubCategory = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [categoriesList, setCategoriesList] = useState([]);
	const [parentCategory, setParentCategory] = useState("");
	const [subcategoriesList, setSubcategoriesList] = useState([]);

	//step2 : keyword states for search
	const [keyword, setKeyword] = useState("");

	//step1 & 3 : searChInputChange function : moved to seperate components

	// step4 : search function
	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	//to render the lists of category, using useEffect

	useEffect(() => {
		console.log("use effct in effect");

		loadCategories();
		loadSubCategories();
	}, []);

	const loadCategories = () =>
		getCategoryLists().then((c) => setCategoriesList(c.data));

	// for subcategories
	const loadSubCategories = () =>
		getSubcategoryLists().then((s) => setSubcategoriesList(s.data));

	const removeItem = async (slug) => {
		let answer = window.confirm(`Sure, you wanna delete ${slug}`);

		if (answer) {
			removeSubcategory(slug, user.token)
				.then((res) => {
					console.group(res);
					toast.error(`${slug} has been deleted`);
					loadSubCategories();
				})
				.catch((err) => toast.error(err.message));
		}
	};

	function handleSubmit(e) {
		e.preventDefault();

		createSubcategory({ name, parent: parentCategory }, user.token)
			.then((res) => {
				console.log(res);
				setName("");
				toast.success(`${res.data.name} has been created`);
				loadSubCategories();
			})
			.catch((err) => {
				console.log(err);
				toast.error(`Something went wrong!`);
			});
	}
	const categoryForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>
						<h3>Name:</h3>
					</label>
					<input
						value={name}
						placeholder="Create Sub Category"
						className="form-control"
						type="text"
						autoFocus
						required
						onChange={(e) => setName(e.target.value)}
					/>
					<button className="btn btn-raised btn-primary mt-2">Save</button>
				</div>
			</form>
		);
	};
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">
					<h2 className="text-warning">
						Welcome Admin. Ready to create Sub-Categories?
					</h2>

					<div className="categoryOptions">
						<label>Select Category</label>
						<select
							className="form-control"
							onChange={(e) => setParentCategory(e.target.value)}
						>
							<option>Please Select a Category</option>

							{categoriesList.length > 0 &&
								categoriesList.map((c) => {
									return (
										<option key={c._id} value={c._id}>
											{c.name}
										</option>
									);
								})}
						</select>
					</div>
					{JSON.stringify(parentCategory)}
					{categoryForm()}

					<FilterForm keyword={keyword} setKeyword={setKeyword} />

					{subcategoriesList.filter(searched(keyword)).map((c) => {
						return (
							<div key={c._id} className="alert alert-primary">
								{c.name}
								<span>
									<DeleteTwoTone
										onClick={() => removeItem(c.slug)}
										className="btn btn-raised btn-danger ml-1  float-right"
									/>
								</span>

								<span>
									<Link to={`/admin/subCategory/${c.slug}`}>
										<EditTwoTone className="btn btn-raised btn-primary float-right" />
									</Link>
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
