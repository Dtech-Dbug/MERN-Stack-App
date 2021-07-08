import axios from "axios";

export const userCart = async (cart, authtoken) =>
	await axios.post(
		`http://localhost:8000/api/user/cart`,
		{ cart },
		{
			headers: {
				authtoken,
			},
		}
	);

//wrapping the cart in {} to be able to access it in the backend from req.body.cart
//if we didn't wrap we would get req,body to the backened , and then destructure {cart} from req.body

export const getUserCart = async (authtoken) =>
	await axios.get(`http://localhost:8000/api/user/cart`, {
		headers: {
			authtoken,
		},
	});

export const emptyUserCart = async (authtoken) =>
	await axios.put(`http://localhost:8000/api/user/cart`, {
		headers: {
			authtoken,
		},
	});
