export const Search = (state = { text: "" }, action) => {
	switch (action.type) {
		case "SEARCH_QUERY":
			return action.payload;
		default:
			return state;
	}
};
