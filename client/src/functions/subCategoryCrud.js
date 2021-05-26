import axios from "axios";

export const getSubcategoryLists = async () => {
	return await axios.get("http://localhost:8000/api/subCategories");
};

export const getSubcategoryList = async (slug) => {
	return await axios.get(`http://localhost:8000/api/subCategory/${slug}`);
};

export const createSubcategory = async (subC, authtoken) => {
	return await axios.post("http://localhost:8000/api/subCategory", subC, {
		headers: {
			authtoken,
		},
	});
};

export const updateSubcategory = async (slug, name, authtoken) => {
	return await axios.put(
		`http://localhost:8000/api/subCategory/${slug}`,
		name,

		{
			headers: {
				authtoken,
			},
		}
	);
};

export const removeSubcategory = async (slug, authtoken) => {
	return await axios.delete(`http://localhost:8000/api/subCategory/${slug}`, {
		headers: {
			authtoken,
		},
	});
};
