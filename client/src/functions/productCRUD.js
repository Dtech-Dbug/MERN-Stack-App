import axios from "axios";

export const createProduct = async (product, authtoken) => {
	return axios.post("http://localhost:8000/api/product", product, {
		headers: {
			authtoken,
		},
	});
};
