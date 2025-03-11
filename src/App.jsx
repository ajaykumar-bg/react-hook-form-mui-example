import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

import { store } from './redux/store';

import Login from './features/auth/components/MuiLogin';
import Register from './features/auth/components/MuiRegister';
import ProtectedRoute from './components/ProtectedRoute';

import AppLayout from './layout/AppLayout';

import MainGrid from './layout/components/MainGrid';
import UserManagement from './features/users/components/UserManagement';
import Settings from './components/Settings';
import About from './components/About';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Account from './components/Account';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<AppLayout>
									<MainGrid />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/users'
						element={
							<ProtectedRoute>
								<AppLayout>
									<UserManagement />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/settings'
						element={
							<ProtectedRoute>
								<AppLayout>
									<Settings />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/about'
						element={
							<ProtectedRoute>
								<AppLayout>
									<About />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/contact'
						element={
							<ProtectedRoute>
								<AppLayout>
									<Contact />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<AppLayout>
									<Profile />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<AppLayout>
									<Account />
								</AppLayout>
							</ProtectedRoute>
						}
					/>
					<Route path='/' element={<Navigate to='/dashboard' replace />} />
				</Routes>
			</Router>
		</Provider>
	);
};

export default App;
