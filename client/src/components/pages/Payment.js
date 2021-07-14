import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//load strip outside component to be sure it doesnt recreate on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHER_KEY);

const Payment = () => {
	return (
		<div className="container p5 text-center">
			<h4>Continue Your Purchase</h4>
			<Elements stripe={promise}>
				<div className="col-md-8 offset-md-2">
					<h3>Payment</h3>
				</div>
			</Elements>
		</div>
	);
};

export default Payment;
