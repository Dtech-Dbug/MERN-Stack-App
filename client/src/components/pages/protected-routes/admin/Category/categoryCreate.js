import React from "react";
import AdminNav from "../../../../Nav/Admin-Nav";

export const CreateCategory = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col">Welcome Admin. Ready to create categories?</div>
			</div>
		</div>
	);
};
