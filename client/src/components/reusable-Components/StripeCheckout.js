import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";

const StripeCheckout = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	//state varaibles
	const [paymentSuccess, setPaymentSucces] = useState(false);
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState("");

	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		console.log("use effect stripe");
		user &&
			createPaymentIntent(user.token)
				.then((res) => {
					console.log("create payment intent response", res);
					setClientSecret(res.data.clientSecret);
				})
				.catch((err) =>
					console.log("err while client key fetching", err.message)
				);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("waitinf for client secret key");
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
