import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { searchReducer } from "./search";
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";
import { cashOnDeliveryReducer } from "./cashOnDelivery";

export const rootReducer = combineReducers({
	user: userReducer,
	search: searchReducer,
	cart: cartReducer,
	drawer: drawerReducer,
	coupon: couponReducer,
	COD: cashOnDeliveryReducer,
});
