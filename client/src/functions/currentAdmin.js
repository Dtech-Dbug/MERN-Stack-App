import axios from "axios";

export const currentAdmin = async (authtoken) => {
	return await axios.post(
		"http://localhost:8000/api/current-admin",
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
