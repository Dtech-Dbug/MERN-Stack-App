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
	await axios.delete(`http://localhost:8000/api/user/cart`, {
		headers: {
			authtoken,
		},
	});

//savve address to DB
export const saveUserAddress = async (address, authtoken) =>
	await axios.post(
		`http://localhost:8000/api/user/address`,
		{ address },
		{
			headers: {
				authtoken,
			},
		}
	);

//function to make request to backEnd Api endpoint to apply discount after coupon code is valid
export const applyCoupon = async (coupon, authtoken) =>
	await axios.post(`http://localhost:8000/api/user/cart/coupon`, coupon, {
		headers: { authtoken },
	});

//we can send {coupon } as req.body , and in the backend it will be recived as req.body.coupon
//we can also send , coupon as the parameter, but the argument should be what is expected like in the frinEnd while making request wiuth the above applyCOupon fyunction , the arguement can be {coupon : coupon} just to let the fuction know what is expected. And in the backend it will be accessed as <req className="body coupon">
//if we dont use {} to define object anywhere in this function or using it , req.body will be {} : null object

// user function to create a new order

export const newOrder = async (stripeResponse, authtoken) =>
	await axios.post(
		`http://localhost:8000/api/user/order`,
		{ stripeResponse },
		{
			headers: {
				authtoken,
			},
		}
	);

export const userOrders = async (authtoken) => {
	return await axios.get(`http://localhost:8000/api/user/orders`, {
		headers: { authtoken },
	});
};

//wishlist fronetnd functions
export const addToWishlist = async (productId, authtoken) => {
	return await axios.post(
		`http://localhost:8000/api/user/wishlist`,
		{
			productId,
		},
		{ headers: { authtoken } }
	);
};

export const listWishlist = async (authtoken) =>
	await axios.get(`http://localhost:8000/api/user/wishlist`, {
		headers: { authtoken },
	});

export const removeWishlist = async (productId, authtoken) => {
	return await axios.put(
		`http://localhost:8000/api/user/wishlist/${productId}`,
		{},
		{ headers: { authtoken } }
	);
};

//fronten function to save user order with cash on delivery
export const createCashOrder = async (authtoken) =>
	await axios.post(
		`http://localhost:8000/api/cash-order`,
		{},
		{ headers: { authtoken } }
	);
