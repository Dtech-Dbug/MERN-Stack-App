import axios from "axios";

export const createProduct = async (product, authtoken) => {
	return axios.post("http://localhost:8000/api/product", product, {
		headers: {
			authtoken,
		},
	});
};

export const listAllProducts = async (count) => {
	return axios.get(`http://localhost:8000/api/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
	return await axios.delete(`http://localhost:8000/api/product/${slug}`, {
		headers: {
			authtoken,
		},
	});
};

export const readProduct = async (slug) => {
	return await axios.get(`http://localhost:8000/api/product/${slug}`);
};

export const updateProduct = async (slug, product, authtoken) => {
	return axios.put(`http://localhost:8000/api/product/${slug}`, product, {
		headers: {
			authtoken,
		},
	});
};

/// list products based on options => for new sellers , best sellers
export const listOrderedProducts = async (sort, order, page) =>
	await axios.post(`http://localhost:8000/api/products`, {
		sort,
		order,
		page,
	});

export const getProductsCount = async () => {
	return await axios.get(`http://localhost:8000/api/products/totalcount`);
};

export const productRating = async (productId, star, authtoken) => {
	return await axios.put(
		`http://localhost:8000/api/product/star/${productId}`,
		{ star },
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const relatedProducts = async (productId) => {
	return axios.get(`http://localhost:8000/api/product/related/${productId}`);
};

export const searchedProducts = async (arg) => {
	return await axios.post(`http://localhost:8000/api/search/filter`, arg);
};
