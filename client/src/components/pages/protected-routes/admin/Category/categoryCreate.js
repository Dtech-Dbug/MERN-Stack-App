import React, { useEffect, useState } from "react";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import { EditTwoToned, DeleteTwoToned } from "@ant-design/icons";
//access state : for user authtoken
import { useSelector } from "react-redux";
//function for interacting w backend
import {
	getCategoryLists,
	createCategory,
	removeCategory,
} from "../../../../../functions/categoryCRUD";

export const CreateCategory = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [categoriesList, setCategoriesLists] = useState([]);

	//to render the lists of category, using useEffect

	useEffect(() => {
		loadLists();
	}, []);

	const loadLists = () =>
		getCategoryLists()
			.then((res) => {
				console.log(res);
				setCategoriesLists(res.data);
			})
			.catch((err) => {
				toast.error(`A booboo happened`);
			});

	function handleSubmit(e) {
		e.preventDefault();
		console.log(name);
		createCategory({ name }, user.token)
			.then((res) => {
				setCategoriesLists(res.data.name);
				toast.success(`${name} has been created`);
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

					{categoriesList.map((c) => (
						<div className="alert alert-primary" key={c._id}>
							{c.name}
							<span></span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
