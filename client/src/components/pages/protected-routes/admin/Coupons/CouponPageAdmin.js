import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {} from "../../../../../functions/coupons";
import AdminNav from "../../../../Nav/Admin-Nav";

const CouponPageAdmin = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h1>Coupon</h1>
				</div>
			</div>
		</div>
	);
};

export default CouponPageAdmin;
