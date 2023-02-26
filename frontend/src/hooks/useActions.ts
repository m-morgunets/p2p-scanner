import { bundlesAction } from './../store/bundles/bundles.slice';
import { settingsAction } from './../store/settings/settings.slice';
import { userActions } from "./../store/user/user.slice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

// Тут храняться все экшены из githubSlice
const actions = {
	...userActions,
	...settingsAction,
	...bundlesAction
};

// Хук сделан для того, чтобы не делать каждый раз обёртку dispatch(action)
// bindActionCreators сам создаёт обёртку dispatch (второй параметр)
// и в компонентах можно будет использовать экшены сразу как функции
export const useActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(actions, dispatch);
};
