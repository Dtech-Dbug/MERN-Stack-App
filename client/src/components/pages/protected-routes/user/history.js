import React from "react";
import UserNav from "../../../Nav/userNav";

//we will have to protect this route , so only logged in users can see this page. if the route is not proteted anyone can navigate to this page without even logging

export const History = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>
				<div className="col">user history page</div>
			</div>
		</div>
	);
};
