import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { store } from './redux/store';
import Login from './features/auth/components/Login';
import UserManagement from './features/users/components/UserManagement';
import ProtectedRoute from './components/ProtectedRoute';


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/users" replace />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;