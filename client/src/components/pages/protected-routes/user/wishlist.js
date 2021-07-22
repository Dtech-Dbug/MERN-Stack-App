import React, { useState, useEffect } from "react";
import UserNav from "../../../Nav/userNav";
import axios from "axios";
import { useSelector } from "react-redux";
import { listWishlist, removeWishlist } from "../../../../functions/userCart";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";

const Wishlist = () => {
	const { user } = useSelector((state) => ({ ...state }));
	const [wishlist, setWishlist] = useState([]);

	useEffect(() => {
		loadAllWishlist();
	}, []);

	const loadAllWishlist = () =>
		listWishlist(user.token).then((res) => {
			console.log(res);
			setWishlist(res.data.wishlist);
		});

	const handleRemoveWishlist = (productId) =>
		removeWishlist(productId, user.token).then((res) => {
			toast.error("Deleted");
			loadAllWishlist();
		});

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<UserNav />
				</div>

				<div className="col-md-10">
					Wishlist
					{wishlist.map((p) => {
						return (
							<div className="alert alert-secondary">
								{p.title}{" "}
								<span className="btn btn-sm float-right">
									<DeleteOutlined onClick={() => handleRemoveWishlist(p._id)} />
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Wishlist;
