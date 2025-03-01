import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import usersReducer from './redux/reducers/usersSlice';
import authReducer from './redux/reducers/authSlice';

// Import root saga
import { rootSaga } from './redux/sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		users: usersReducer,
		auth: authReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
