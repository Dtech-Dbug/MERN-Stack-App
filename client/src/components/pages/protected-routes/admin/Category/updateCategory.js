/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";

//access state : for user authtoken
import { useSelector } from "react-redux";
//function for interacting w backend
import {
	getCategory,
	updateCategory,
} from "../../../../../functions/categoryCRUD";
import { Link } from "react-router-dom";

export const UpdateCategory = ({ history, match }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");

	//to render the lists of category, using useEffect

	useEffect(() => {
		console.log(match);
		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategory(match.params.slug).then((c) => setName(c.data.name));

	function handleSubmit(e) {
		e.preventDefault();
		console.log(match.params.slug);
		updateCategory(match.params.slug, { name }, user.token)
			.then((res) => {
				toast.success(`${name} has been updated`);
				history.push("/admin/category");
			})
			.catch((err) => {
				toast.error(err.message);
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
				</div>
			</div>
		</div>
	);
};
