import axios from "axios";

export const createPaymentIntent = async (authtoken) => {
	return await axios.post(
		"http://localhost:8000/api/create-payment-intent",
		{},
		{
			headers: {
				authtoken,
			},
		}
	);
};
