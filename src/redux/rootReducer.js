// Import reducers
import usersReducer from '../features/users/redux/usersSlice';
import authReducer from '../features/auth/redux/authSlice';

export const rootReducer = {
	users: usersReducer,
	auth: authReducer,
};
