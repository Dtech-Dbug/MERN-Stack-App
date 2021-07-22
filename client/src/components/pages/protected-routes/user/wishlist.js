import React, { useState, useEffect } from "react";
import UserNav from "../../../Nav/userNav";
import axios from "axios";
import { useSelector } from "react-redux";
import { userOrders } from "../../../../functions/userCart";
import { toast } from "react-toastify";

const Wishlist = () => {
	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>

				<div className="col-md-10">Wishlist</div>
			</div>
		</div>
	);
};

export default Wishlist;
