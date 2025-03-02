import React from 'react';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import { store } from './redux/store';
// import ResponsiveDrawer from './components/ResponsiveDrawer';

import Login from './features/auth/components/MuiLogin';
import Register from './features/auth/components/MuiRegister';
import ProtectedRoute from './components/ProtectedRoute';

import AppLayout from './features/layout/AppLayout';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/users'
						element={
							<ProtectedRoute>
								{/* <ResponsiveDrawer /> */}
								<AppLayout></AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route path='/' element={<Navigate to='/users' replace />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
