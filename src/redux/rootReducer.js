// Import reducers
import usersReducer from '../features/users/redux/usersSlice';
import authReducer from '../features/auth/redux/authSlice';
import mutualFundsReducer from '../features/funds/redux/mutualFundsSlice';

export const rootReducer = {
	users: usersReducer,
	auth: authReducer,
	mutualFunds: mutualFundsReducer,
};
