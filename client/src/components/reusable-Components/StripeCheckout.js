import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";

const StripeCheckout = () => {
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => ({ ...state }));

	//state varaibles
	const [paymentSuccess, setPaymentSucces] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState("");
	const [cartTotal, setCartTotal] = useState(0);
	const [finalPrice, setFinalPrice] = useState(0);

	const stripe = useStripe();
	const elements = useElements();

	// Test card : 4242 4242 4242 4242

	useEffect(() => {
		console.log("use effect stripe");

		user && console.log("making request to backend with token", user.token);
		createPaymentIntent(user.token, coupon)
			.then((res) => {
				console.log("create payment intent response", res.data);
				console.log("Client secret stripe", res.data.clientSecret);
				setClientSecret(res.data.clientSecret);
				setCartTotal(res.data.info.Total);
				setFinalPrice(res.data.info.total);
			})
			.catch((err) =>
				console.log("err while client key fetching", err.message)
			);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setProcessing(true);
		console.log("client secret on submit", clientSecret);
		//once we get response from stripe
		//we set processing to false
		//to make req to stripe so we conform the card payment

		//use the stripe ; stripe = useStripe()
		//1st arg, : clientSecret
		//2nd arg : payment method and details

		const payload = await stripe.confirmCardPayment(clientSecret, {
			//access cardElement component and storing it in a variable
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: e.target.name.value,
				},
			},
		});

		//if error : handle error
		if (payload.error) {
			setError(`Pyament Failed ${payload.error.message}`);
			setProcessing(false);
			setPaymentSucces(false);
		}
		//esle show success message
		else {
			//here , we get result for sucessful payment
			//create order and save it in database for admin to process
			//dafter payment, remove order from cartfrom  redux , and localStorage
			setProcessing(true);
			console.log(JSON.stringify(payload, null, 4));
			setError("");
			setProcessing(false);
			setPaymentSucces(true);
		}
	};

	const handleChange = async (e) => {
		//listen fo changes in the cardElement & display any errors
		console.log(e.empty);
		setDisabled(e.empty);
		setError(e.error ? e.error.message : "");
	};

	const cartStyle = {
		style: {
			base: {
				color: "#32325d",
				fontFamily: "Arial, sans-serif",
				fontSmoothing: "antialiased",
				fontSize: "16px",
				"::placeholder": {
					color: "#32325d",
				},
			},
			invalid: {
				color: "#fa755a",
				iconColor: "#fa755a",
			},
		},
	};

	return (
		<>
			{coupon ? (
				<p className="alert alert-success">Coupon Apllied</p>
			) : (
				<p className="alert alert-danger">No Coupon Apllied</p>
			)}
			<p
				className={
					paymentSuccess === true ? "result-message" : "result-message hidden"
				}
			>
				Payment Success! <Link to="/user/history">View your order here.</Link>
			</p>

			<div className="text-center pb-5">
				<Card
					actions={[
						<>
							<DollarOutlined className="text-info" /> <br /> Total: {cartTotal}
						</>,

						<>
							<CheckOutlined className="text-info" /> <br /> Payable:{" "}
							{finalPrice}
						</>,
					]}
				/>
			</div>
			<form id="payment-form" className="stripe-form" onSubmit={handleSubmit}>
				<CardElement
					id="card-element"
					options={cartStyle}
					onChange={handleChange}
				/>

				<button
					className="stripe-button"
					//	disabled={processing || disabled || paymentSuccess}
				>
					<span id="button-text">
						{processing ? <div className="spinner" id="spinner"></div> : "Pay"}
					</span>
				</button>

				<br />
				{error && (
					<div className="card-error" role="alert">
						{error}
					</div>
				)}
			</form>
		</>
	);
};

export default StripeCheckout;
