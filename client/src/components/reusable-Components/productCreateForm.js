import React from "react";

export const ProductCreateForm = ({ handleChange, handleSubmit, values }) => {
	const { title, description, price, quantity, shipping, color, colors } =
		values;

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

			<button onClick={handleSubmit} className="btn btn-raised btn-primary">
				Save
			</button>
		</form>
	);
};
