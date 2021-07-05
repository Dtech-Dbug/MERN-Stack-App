import React from "react";
import ModalImage from "react-modal-image";
import JS from "../../Default images/js logo.png";

const ProductCartTableView = ({ product }) => {
	return (
		<tbody>
			<tr>
				<td>
					<div style={{ width: "100px", height: "auto" }}>
						{product.images ? (
							<ModalImage
								small={product.images[0].url}
								large={product.images[0].url}
							/>
						) : (
							<ModalImage small={JS} large={JS} />
						)}
					</div>
				</td>
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
