import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({ ...state }));
	//destrcuture text from state
	const { text } = search;

	const history = useHistory();

	const handleChange = (e) => {
		//
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: e.target.value },
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//
		history.push(`/shop?${text}`);
	};
	return (
		<form className="form-inline my-lg-0" onSubmit={handleSubmit}>
			<input
				onChange={handleChange}
				placeholder="Search"
				className="form-control mr-sm-2"
				type="search"
				value={text}
			/>

			<SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
		</form>
	);
};

export default Search;
