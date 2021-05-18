import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
	return await axios.post(
		process.env.REACT_APP_API_BACKEND,
		{
			//leaving it empty , bcz currently not sending anything in the body
			//sending token in headers
		},
		{
			headers: {
				authToken,
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			},
		}
	);
};
