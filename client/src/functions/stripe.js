import axios from "axios";

export const createPaymentIntent = (authtoken) => {
	axios.post("http://loacalhost:8000/api/create-payment-intent", {
		headers: {
			authtoken,
		},
	});
};
