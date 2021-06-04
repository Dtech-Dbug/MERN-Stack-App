import React, { useEffect } from "react";
import { Select } from "antd";
const { Option } = Select;

export const ProductUpdateForm = ({
	handleChange,
	handleSubmit,
	handleCategoryChange,
	values,
	setValues,
}) => {
	useEffect(() => {
		console.log(categories);
	}, []);
	const {
		title,
		description,
		price,
		quantity,
		shipping,
		color,
		colors,
		categories,
		subCategories,
	} = values;

	return (
		<form onSubmit={handleSubmit}>
			<div className="form-group">
				<label>Title</label>
				<input
					className="form-control"
					type="text"
					name="title"
					value={title}
					required
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Description</label>
				<input
					type="text"
					name="description"
					className="form-control"
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Price</label>
				<input
					type="number"
					name="price"
					className="form-control"
					value={price}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Shipping</label>
				<select
					name="shipping"
					className="form-control"
					onChange={handleChange}
				>
					<option>Please select</option>
					<option value="No">No</option>
					<option value="Yes">Yes</option>
				</select>
			</div>
			<div className="form-group">
				<label>Quantity</label>
				<input
					type="number"
					name="quantity"
					className="form-control"
					value={quantity}
					onChange={handleChange}
				/>
			</div>
			<div className="form-group">
				<label>Color</label>
				<select name="color" className="form-control" onChange={handleChange}>
					<option>Please select</option>
					{colors.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
			{/* <div className="form-group">
				<label>Select Category</label>
				<select className="form-control" onChange={handleCategoryChange}>
					<option>Please Select a Category</option>

					{categories.length > 0 &&
						categories.map((c) => {
							return (
								<option key={c._id} value={c._id}>
									{c.name}
								</option>
							);
						})}
				</select>

				{showSubcategories.length}
			</div>

			{selectedCategory && (
				<div>
					<label>Sub Categories</label>
					<Select
						mode="multiple"
						style={{ width: "100%" }}
						placeholder="Please select"
						value={subCategories}
						onChange={(value) => setValues({ ...values, subCategories: value })}
					>
						{showSubcategories.length &&
							showSubcategories.map((sub) => (
								<Option key={sub._id} value={sub._id}>
									{sub.name}
								</Option>
							))}
					</Select>
				</div>
			)} */}
			<button onClick={handleSubmit} className="btn btn-raised btn-primary">
				Save
			</button>
		</form>
	);
};
