import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import { listAllProducts } from "../../functions/productCRUD";
import { searchedProducts } from "../../functions/productCRUD";
import { Menu, Slider } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [price, setPrice] = useState([0, 0]);
	const [ok, setOk] = useState(false);
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	const dispatch = useDispatch();

	useEffect(() => {
		loadProducts();
	}, []);

	useEffect(() => {
		//delay requests for optimization

		const delay = setTimeout(() => {
			loadSearchedProducts({ query: text });
		}, 300);

		return () => clearTimeout(delay);
	}, [text]);

	//3rd useEffect to laod products based n price and render only price changes
	useEffect(() => {
		loadSearchedProducts({ price });
	}, [ok]);

	const loadProducts = () => {
		listAllProducts(9).then((res) => {
			setLoading(false);
			setProducts(res.data);
			console.log("shop page ", res);
		});
	};

	const loadSearchedProducts = (arg) => {
		searchedProducts(arg).then((res) => setProducts(res.data));
	};
	const handleSlider = (value) => {
		//clear the state of the search
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		//set price to value of slider
		setPrice(value);

		//delay requests to optimize and avoid multiple requets
		setTimeout(() => {
			setOk(!ok);
		}, 300);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-3">
					{" "}
					Search / Filter Menu
					<hr />
					<Menu mode="inline" defaultOpenKeys={["slider"]}>
						<SubMenu
							key="slider"
							title={
								<span className="h6">
									<DollarOutlined /> Price
								</span>
							}
						>
							<div>
								<Slider
									className="ml-4 mr-4"
									tipFormatter={(v) => `$${v}`}
									range
									value={price}
									onChange={handleSlider}
									max="4999"
								/>
							</div>
						</SubMenu>
					</Menu>
				</div>

				<div className="col-md-9">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4 className="info-bg">Products</h4>
					)}

					<div className="row pb-5">
						{products &&
							products.map((p) => {
								return (
									<div className="col-md-4 mt-3" key={p._id}>
										<HomePageProductCard product={p} />
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
