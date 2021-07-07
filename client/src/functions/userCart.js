import axios from "axios";

export const userCart = (cart, authtoken) =>
	axios.post(
		`http://localhost:8000/api/user/cart`,
		{ cart },
		{ headers: { authtoken } }
	);

//wrapping the cart in {} to be able to access it in the backend from req.body.cart
//if we didn't wrap we would get req,body to the backened , and then destructure {cart} from req.body
