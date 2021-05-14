export const userReducer = (state = null, action) => {
	switch (action.type) {
		case "USER_LOGGED_IN":
			return action.payload;

		case "USER_LOGGED_OUT":
			return action.payload;
		default:
			return state;
	}
};
