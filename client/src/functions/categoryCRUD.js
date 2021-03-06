import axios from "axios";

//REACT_API_BACKEND_COMMON = "http://localhost:8000/api"

// function for viwing the list / get all the lists
export const getCategoryLists = async () => {
	return await axios.get(`http://localhost:8000/api/categories`);
};

//function for getting a single categpory/ read
export const getCategory = async (slug) => {
	return axios.get(`http://localhost:8000/api/category/${slug}`);
};

//to remove a category
export const removeCategory = async (slug, authtoken) => {
	return await axios.delete(`http://localhost:8000/api/category/${slug}`, {
		headers: {
			authtoken,
		},
	});
};

//o update category // 3args => slug , newName and authtoken , bcz it willbe done by admin only : the newNameCategory is the newName that il be sent in the req.body in the backened for processing
export const updateCategory = async (slug, categoryName, authtoken) => {
	return await axios.put(
		`http://localhost:8000/api/category/${slug}`,
		categoryName,
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const createCategory = async (category, authtoken) => {
	return await axios.post(
		`http://localhost:8000/api/category`,

		category,
		{
			headers: {
				authtoken,
			},
		}
	);
};

export const getSubs = async (_id) => {
	return await axios.get(
		`http://localhost:8000/api/category/subcategory/${_id}`
	);
};
