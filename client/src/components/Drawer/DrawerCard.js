import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button } from "antd";
import JS from "../../Default images/js logo.png";

const DrawerCard = () => {
	const { drawer, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const imageStyle = {
		height: "8rem",
		width: "100%",
		margin: ".2rem .2rem",
	};

	return (
		<Drawer
			onClose={() =>
				dispatch({
					type: "SHOW_CART_DRAWER",
					payload: false,
				})
			}
			className="text-center"
			title={`cart / ${cart.length} Products`}
			visible={drawer}
		>
			{cart.map((items) => {
				return (
					<div className="row" key={items._id}>
						<div className="col">
							{items.images && items.images.length && items.images[0] ? (
								<>
									<img
										src={items.images[0].url}
										alt="Oops!"
										style={imageStyle}
									/>
									<p className="text-center bg-secondary text-light">
										{items.title}
									</p>
								</>
							) : (
								<>
									<img src={JS} alt="Oops!" style={imageStyle} />
									<p className="text-center bg-secondary text-light">
										{items.title}
									</p>
								</>
							)}
						</div>
					</div>
				);
			})}
		</Drawer>
	);
};

export default DrawerCard;
