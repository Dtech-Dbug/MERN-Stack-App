/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";

//access state : for user authtoken
import { useSelector } from "react-redux";
//function for interacting w backend
import {
	getCategory,
	getCategoryLists,
} from "../../../../../functions/categoryCRUD";
import {
	getSubcategoryList,
	updateSubcategory,
} from "../../../../../functions/subCategoryCrud";
import { Link } from "react-router-dom";

export const UpdateSubCategory = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [categories, setCategories] = useState([]);
	const [parentCategory, setParentCategory] = useState("");

	//to render the lists of category, using useEffect

	useEffect(() => {
		console.log(match);
		loadCategories();

		loadSubCategories();
	}, []);

	const loadCategories = () => {
		getCategoryLists().then((res) => {
			console.log(res);
			setCategories(res.data);
		});
	};

	const loadSubCategories = () => {
		getSubcategoryList(match.params.slug).then((res) => {
			setName(res.data.name);
			setParentCategory(res.data.parent);
		});
	};

	function handleSubmit(e) {
		e.preventDefault();
		console.log(match.params.slug);
		updateSubcategory(
			match.params.slug,
			{ name, parent: parentCategory },
			user.token
		)
			.then((res) => {
				toast.success(`${name} has been updated`);
				history.push("/admin/subCategory");
			})
			.catch((err) => {
				toast.error(err.message);
			});
	}

	const categoryForm = () => {
		return (
			<form onSubmit={handleSubmit}>
				<div className="categoryOptions">
					<label>Select Category</label>
					<select
						className="form-control"
						onChange={(e) => setParentCategory(e.target.value)}
					>
						<option>Please Select a Category</option>

						{categories.map((c) => {
							return (
								<option
									key={c._id}
									value={c._id}
									selected={c._id === parentCategory}
								>
									{c.name} <span>{JSON.stringify(c._id)}</span>
									<span>{parentCategory}</span>
								</option>
							);
						})}
					</select>
				</div>

				<div className="form-group">
					<label>
						<h3>Name:</h3>
					</label>
					<input
						value={name}
						placeholder="Create Category"
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
						Welcome Admin. Ready to update Sub-Categories?
					</h2>
					{categoryForm()}

					{parentCategory}
					{}
				</div>
			</div>
		</div>
	);
};
