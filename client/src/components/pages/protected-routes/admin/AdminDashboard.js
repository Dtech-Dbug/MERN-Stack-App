import React from "react";
import AdminNav from "../../../Nav/Admin-Nav";

export const AdminDashboard = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">Welcome Admin to your dashboard.</div>
			</div>
		</div>
	);
};
