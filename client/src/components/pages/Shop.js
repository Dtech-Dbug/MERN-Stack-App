import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import StarFilter from "../reusable-Components/StarFilter";
import { getCategoryLists } from "../../functions/categoryCRUD";
import { listAllProducts } from "../../functions/productCRUD";
import { searchedProducts } from "../../functions/productCRUD";
import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, StarOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Shop = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState([]);
	const [price, setPrice] = useState([0, 0]);
	const [ok, setOk] = useState(false);
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;
	const [categories, setCategories] = useState([]);
	//state for categoryids
	const [categoryIds, setCategoryIds] = useState([]);

	//state for stars
	const [star, setStar] = useState("");

	const dispatch = useDispatch();

	//1st useEffect
	useEffect(() => {
		loadProducts();
		getCategoryLists().then((res) => setCategories(res.data));
	}, []);

	const loadProducts = () => {
		listAllProducts(9).then((res) => {
			setLoading(false);
			setProducts(res.data);
			console.log("shop page ", res);
		});
	};

	//2nd useEffect
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

	const showCategoriesList = () =>
		categories.map((c) => {
			return (
				<div key={c._id}>
					<Checkbox
						className="pb-2 pl-4 pr-4"
						value={c._id}
						name="category"
						onChange={handleCategoryChange}
						checked={categoryIds.includes(c._id)}
					/>{" "}
					{c.name}
				</div>
			);
		});

	const handleCategoryChange = (e) => {
		//reset price & search
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([]);
		setStar("");

		//push categoryIds to search, and not duplicate

		let inTheState = [...categoryIds];
		let justChecked = e.target.value;
		//check if the user click is alredy in the state , and if checked , find the index
		//indexOF returns : -1 if flase, if true returns the index of the element
		let foundInState = inTheState.indexOf(justChecked);

		if (foundInState === -1) {
			inTheState.push(justChecked);
		} else {
			//if the category is already clicked
			//find the index of the element, and pull one element out based on the index
			inTheState.splice(foundInState, 1);
		}

		//set Categoryids with the the Ids that are in teh state
		setCategoryIds(inTheState);

		//run the function with category : inTheState
		loadSearchedProducts({ category: inTheState });
	};

	const showStar = () => {
		return (
			<>
				{" "}
				<StarFilter starClick={handleStarClicks} numberOfStars={5} />
				<StarFilter starClick={handleStarClicks} numberOfStars={4} />
				<StarFilter starClick={handleStarClicks} numberOfStars={3} />
				<StarFilter starClick={handleStarClicks} numberOfStars={2} />
				<StarFilter starClick={handleStarClicks} numberOfStars={1} />
			</>
		);
	};
	const handleStarClicks = (num) => {
		//reset other filters
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([]);
		setCategoryIds([]);
		console.log("Star Filter :", num);
		setStar(num);
		loadSearchedProducts({ stars: num });
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

						<SubMenu
							key="categories"
							title={
								<span className="h6">
									<DollarOutlined /> Categories
								</span>
							}
						>
							<div> {showCategoriesList()}</div>
						</SubMenu>

						<SubMenu
							key="stars"
							title={
								<span className="h6">
									<StarOutlined /> Rating
								</span>
							}
						>
							<div className="pb-2 pl-4 pr-4">{showStar()}</div>
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
