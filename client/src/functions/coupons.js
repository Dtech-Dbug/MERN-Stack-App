import axios from "axios";

export const getCoupons = async () =>
	await axios.get(`http:localhost:8000/api/coupons`);

export const removeCoupon = async (couponId, authtoken) =>
	await axios.delete(`http:localhost:8000/api/coupon:${couponId}`, {
		headers: { authtoken },
	});

export const createCoupon = async (coupon, authtoken) =>
	await axios.post(`http:localhost:8000/api/coupon`, coupon, {
		headers: { authtoken },
	});
