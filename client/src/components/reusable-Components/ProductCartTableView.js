import React from "react";

const ProductCartTableView = ({ product }) => {
	return (
		<tbody>
			<tr>
				<td>Image</td>
				<td>{product.title}</td>
				<td>${product.price}</td>
				<td>Color </td>
				<td>{product.count}</td>
				<td>Shipping</td>
				<td>Delete icon</td>
			</tr>
		</tbody>
	);
};

export default ProductCartTableView;
