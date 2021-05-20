/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
//access state : for user authtoken
import { useSelector } from "react-redux";
//function for interacting w backend
import {
	getCategoryLists,
	createCategory,
	removeCategory,
} from "../../../../../functions/categoryCRUD";
import { Link } from "react-router-dom";

export const CreateCategory = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [categoriesList, setCategoriesList] = useState(["dell"]);

	//to render the lists of category, using useEffect

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategoryLists().then((c) => setCategoriesList(c.data));

	function handleSubmit(e) {
		e.preventDefault();
		console.log(name);
		createCategory({ name }, user.token)
			.then((res) => {
				toast.success(`${name} has been created`);
				setName("");
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
						Welcome Admin. Ready to create categories?
					</h2>
					{categoryForm()}
					{categoriesList.length}

					{/* {categoriesList.map((c) => {
						return <div className={c._id}>hello</div>;
					})} */}
				</div>
			</div>
		</div>
	);
};
