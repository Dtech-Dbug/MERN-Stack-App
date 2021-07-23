export const cashOnDeliveryReducer = (state = false, action) => {
	switch (action.type) {
		case "CASH_ON_DELIVERY":
			return action.payload;

		default:
			return state;
	}
};
