import React from "react";

//we will have to protect this route , so only logged in users can see this page. if the route is not proteted anyone can navigate to this page without even logging

export const History = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col">WELCOME TO USER History PAGE</div>
			</div>
		</div>
	);
};
