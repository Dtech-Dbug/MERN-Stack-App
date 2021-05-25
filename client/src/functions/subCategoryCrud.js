import axios from "axios";

export const getSubcategoryLists = async () => {
	await axios.get("http://localhost:8000/api/subCategories");
};

export const getSubcategoryList = async (slug) => {
	await axios.get(`http://localhost:8000/api/subCategory/${slug}`);
};

export const createSubcategory = async (subC, authtoken) => {
	await axios.post("http://localhost:8000/api/subCategory", subC, {
		headers: {
			authtoken,
		},
	});
};

export const updateSubcategory = async (slug, name, authtoken) => {
	await axios.put(`http://localhost:8000/api/subCategory/${slug}`, name, {
		headers: {
			authtoken,
		},
	});
};

export const removeSubcategory = async (slug, authtoken) => {
	await axios.delete(`http://localhost:8000/api/subCategory/${slug}`, {
		headers: {
			authtoken,
		},
	});
};
