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

//importing the filer component
import { FilterForm } from "../../../../reusable-Components/filterForm";

export const CreateCategory = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [name, setName] = useState("");
	const [categoriesList, setCategoriesList] = useState([]);

	//step2 : keyword states for search
	const [keyword, setKeyword] = useState("");

	//step1 & 3 : searChInputChange function : moved to seperate components

	// step4 : search function
	const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

	//to render the lists of category, using useEffect

	useEffect(() => {
		console.log("use effct in effect");

		loadCategories();
	}, []);

	const loadCategories = () =>
		getCategoryLists().then((c) => setCategoriesList(c.data));

	const removeItem = async (slug) => {
		removeCategory(slug, user.token);
		let answer = window.confirm(`Sure, you wanna delete ${slug}`);

		if (answer) {
			removeCategory(slug, user.token)
				.then((res) => {
					console.group(res);
					toast.error(`${slug} has been deleted`);
					loadCategories();
				})
				.catch((err) => toast.error(err.message));
		}
	};

	function handleSubmit(e) {
		e.preventDefault();

		createCategory({ name }, user.token)
			.then((res) => {
				setName("");
				console.log(res);
				toast.success(`${res.data.name} has been created`);
				loadCategories();
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

					<FilterForm keyword={keyword} setKeyword={setKeyword} />

					{categoriesList.filter(searched(keyword)).map((c) => {
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
									<Link to={`/admin/category/${c.slug}`}>
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
