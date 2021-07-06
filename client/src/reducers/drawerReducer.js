export const drawerReducer = (state = false, action) => {
	switch (action.type) {
		case "SHOW_CART_DRAWER":
			return action.payload;

		default:
			return state;
	}
};
