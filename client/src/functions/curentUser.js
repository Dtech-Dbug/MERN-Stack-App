import axios from "axios";

export const currentUser = async (authtoken) => {
	return await axios.post(
		"http://localhost:8000/api/current-user",
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
