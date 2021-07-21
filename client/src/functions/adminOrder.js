import axios from "axios";

export const adminOrderList = async (authtoken) => {
	return await axios.get(`http://localhost:8000/api/admin/orders`, {
		headers: {
			authtoken,
		},
	});
};

export const adminUpdateOrdersStatus = async (
	orderId,
	orderStatus,
	authtoken
) => {
	return await axios.put(
		"http://localhost:8000/api/admin/order-status",
		{
			orderId,
			orderStatus,
		},
		{ headers: { authtoken } }
	);
};
