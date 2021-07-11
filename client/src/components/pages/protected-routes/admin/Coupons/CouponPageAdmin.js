import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	createCoupon,
	removeCoupon,
	getCoupons,
} from "../../../../../functions/coupons";
import AdminNav from "../../../../Nav/Admin-Nav";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const fields = { coupon: "", discount: "" };
const CouponPageAdmin = () => {
	const [expiry, setExpiry] = useState("");
	const [values, setValues] = useState(fields);
	const { coupon, discount } = values;
	const [coupons, setCoupons] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		getCoupons().then((res) => setCoupons(res.data));
	}, []);

	const handleChange = (e) => {
		e.preventDefault();
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	function handleSubmit(e) {
		e.preventDefault();

		let couponValues = { name: coupon, discount: discount, expiry: expiry };

		console.table(couponValues);

		createCoupon(couponValues, user.token).then(toast.success("Created"));
	}

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>

				<div className="col-md-10">
					<h1>Coupon</h1>

					<form>
						<div className="from-group">
							<label className="text-muted"> Coupon Name</label>
							<input
								name="coupon"
								className="form-control"
								type="text"
								autoFocus
								required
								onChange={handleChange}
								value={coupon}
							/>
						</div>

						<div className="from-group">
							<label className="text-muted"> Discount</label>
							<input
								name="discount"
								className="form-control"
								type="text"
								required
								value={discount}
								onChange={handleChange}
							/>
						</div>

						<div className="from-group">
							<label className="text-muted"> Expiry</label>
							<br />
							<DatePicker
								className="form-control"
								selected={expiry}
								value={expiry}
								onChange={(date) => setExpiry(date)}
							/>
						</div>

						<button
							onClick={handleSubmit}
							className="btn btn-raised btn-primary mt-2"
						>
							Save
						</button>
					</form>

					<hr />

					{JSON.stringify(coupons)}
				</div>
			</div>
		</div>
	);
};

export default CouponPageAdmin;
