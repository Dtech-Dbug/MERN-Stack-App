import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
	const [count, setCount] = useState(5);
	let history = useHistory();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 1000);
		// redirect once count is equal to 0
		if (count === 0) {
			console.log("count reacged : ", count);
			console.log("TIME TO CLEAR INTERVAL AND PUSH");

			clearInterval(interval);
			history.push("/");
		}
	}, [count]);

	return (
		<div className="container p-5 text-center">
			<p>Redirecting you in {count} seconds</p>
		</div>
	);
};

export default LoadingToRedirect;
