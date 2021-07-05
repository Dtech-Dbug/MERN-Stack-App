import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import HomePageProductCard from "../reusable-Components/HomePageProductCard";
import StarFilter from "../reusable-Components/StarFilter";
import { getCategoryLists } from "../../functions/categoryCRUD";
import { getSubcategoryLists } from "../../functions/subCategoryCrud";
import { listAllProducts } from "../../functions/productCRUD";
import { searchedProducts } from "../../functions/productCRUD";
import { Menu, Slider, Checkbox, Radio } from "antd";
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

	//subCatgory
	const [subCategories, setSubCategories] = useState([]);

	//clicked subCategory state that will be sent to backend to fetch products
	const [subCategory, setSubCategory] = useState("");

	//state for stars
	const [star, setStar] = useState("");

	//state for colors and color selected
	const [colors, setColors] = useState([
		"Red",
		"Blue",
		"Green",
		"Black",
		"White",
	]);

	const [color, setColor] = useState("");

	//state for shipping
	const [shipping, setShipping] = useState("");

	const dispatch = useDispatch();

	//1st useEffect
	useEffect(() => {
		loadProducts();
		getCategoryLists().then((res) => setCategories(res.data));
		getSubcategoryLists().then((res) => setSubCategories(res.data));
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
		searchedProducts(arg).then((res) => {
			setLoading(true);
			setProducts(res.data);
			setLoading(false);
		});
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
		setColor("");
		setShipping("");

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
		setColor("");
		setShipping("");
		console.log("Star Filter :", num);
		setStar(num);
		loadSearchedProducts({ stars: num });
	};

	const showSubCategoriesList = () =>
		subCategories.map((s) => {
			return (
				<div
					key={s._id}
					className="badge badge-secondary m-1"
					onClick={() => handleSubCategoryChange(s)}
					style={{ cursor: "pointer" }}
				>
					{s.name}
				</div>
			);
		});

	const handleSubCategoryChange = (sub) => {
		console.log("sub clicked", sub);
		//reset other filters
		setSubCategory(sub);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([]);
		setCategoryIds([]);
		setStar("");
		setColor("");
		setShipping("");

		loadSearchedProducts({ subCategory: sub });
	};

	const showColors = () =>
		colors.map((c) => {
			return (
				<div key={c._id}>
					<Radio
						className="pb-2 pl-4 pr-4"
						value={c}
						name="color"
						checked={c === color}
						onChange={handleColorChange}
					/>{" "}
					{c}
				</div>
			);
		});

	const handleColorChange = (e) => {
		//reset other filters
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([]);
		setCategoryIds([]);
		setStar("");
		setShipping("");

		setColor(e.target.value);
		loadSearchedProducts({ color: e.target.value });
	};

	const showShipping = () => {
		return (
			<>
				<Checkbox
					className="pb-2 pl-4 pr-4"
					onChange={handleShippingChange}
					value="Yes"
					checked={shipping === "Yes"}
				>
					Yes
				</Checkbox>
				<br />
				<Checkbox
					className="pb-2 pl-4 pr-4"
					onChange={handleShippingChange}
					value="No"
					checked={shipping === "No"}
				>
					No
				</Checkbox>
			</>
		);
	};

	const handleShippingChange = (e) => {
		//reset
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});

		setPrice([]);
		setCategoryIds([]);
		setStar("");
		//set Shippong and send tp BE
		setShipping(e.target.value);
		loadSearchedProducts({ shipping: e.target.value });
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

						<SubMenu
							key="SubCategories"
							title={
								<span className="h6">
									<DollarOutlined /> Sub Categories
								</span>
							}
						>
							<div className="pl-4 pr-4"> {showSubCategoriesList()}</div>
						</SubMenu>

						<SubMenu
							key="Color"
							title={
								<span className="h6">
									<DollarOutlined /> Color
								</span>
							}
						>
							<div className="pl-4 pr-4"> {showColors()}</div>
						</SubMenu>

						<SubMenu
							key="shipping"
							title={
								<span className="h6">
									<DollarOutlined /> Shipping
								</span>
							}
						>
							<div className="pl-4 pr-4"> {showShipping()}</div>
						</SubMenu>
					</Menu>
				</div>

				<div className="col-md-9">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4 className="info-Bg">Products</h4>
					)}

					<div className="row pb-5">
						{products && products.length > 0 ? (
							products &&
							products.map((p) => {
								return (
									<div className="col-md-4 mt-3" key={p._id}>
										<HomePageProductCard product={p} />
									</div>
								);
							})
						) : (
							<h2 className="col-md-4 mt-3">No Products Found ☹</h2>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
