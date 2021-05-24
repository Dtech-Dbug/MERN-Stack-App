import React from "react";

export const FilterForm = ({ keyword, setKeyword }) => {
	function handleSearchInputChange(e) {
		e.preventDefault();
		setKeyword(e.target.value);
	}
	return (
		<input
			placeholder="Filter"
			className="form-control mb-4"
			type="search"
			onChange={handleSearchInputChange}
			value={keyword}
		/>
	);
};
