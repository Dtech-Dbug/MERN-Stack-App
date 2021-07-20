import axios from "axios";

export const adminORderList = async (authotoken) => {
	return await axios.get(`http://localhost3000/api/admin/orders`, {
		headers: {
			authotoken,
		},
	});
};

export const adminUpdateOrdersStatus = async (
	orderId,
	orderStatus,
	authtoken
) => {
	return await axios.put(
		"http://localhost3000/api/admin/order-status",
		{
			orderId,
			orderStatus,
		},
		{ headers: { authtoken } }
	);
};
