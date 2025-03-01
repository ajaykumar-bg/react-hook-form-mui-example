import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import AddUserButton from './components/AddUserButton';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUsersRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  selectUserForEdit,
  selectUsers,
  selectSelectedUser,
} from './redux/users/usersSlice';

function App() {
	// const [users, setUsers] = useState([]);
	const dispatch = useDispatch();
	const users = useSelector(selectUsers);
	const selectedUser = useSelector(selectSelectedUser);
	const [openDialog, setOpenDialog] = useState(false);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	});
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchUsersRequest());
	  }, [dispatch]);

	// Handle dialog open for create/edit
	const handleOpenDialog = (user = null) => {
		dispatch(selectUserForEdit(user));
		setOpenDialog(true);
	};

	// Handle dialog close
	const handleCloseDialog = () => {
		setOpenDialog(false);
		dispatch(selectUserForEdit(null));
	};

	// Handle form submission
	const handleSubmitUser = async (formData) => {
		try {
			// Validate with yup schema (already validated by react-hook-form with yupResolver)
			if (selectedUser) {
				// Update existing user
				dispatch(updateUserRequest({
					...selectedUser,
					...formData,
				}));
				showNotification(t('notifications.userUpdated'), 'success');
			} else {
				// Add new user
				dispatch(createUserRequest(formData));
				showNotification(t('notifications.userAdded'), 'success');
			}
			handleCloseDialog();
		} catch (error) {
			showNotification(error.message, 'error');
		}
	};

	// Handle user deletion
	const handleDeleteUser = (id) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUserRequest(id));
		}
		showNotification(t('notifications.userDeleted'), 'success');
	};

	// Show notification
	const showNotification = (message, severity = 'success') => {
		setSnackbar({ open: true, message, severity });
	};

	// Close snackbar
	const handleCloseSnackbar = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return (
		<Container maxWidth='md'>
			<Box sx={{ my: 4 }}>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					mb={2}
				>
					<Typography variant='h4' component='h1' gutterBottom>
						{t('app.title')}
					</Typography>
					<LanguageSelector />
				</Box>

				<Box display='flex' justifyContent='flex-end' mb={2}>
					<AddUserButton onAddClick={() => handleOpenDialog()} />
				</Box>

				<UserTable
					users={users}
					onEdit={handleOpenDialog}
					onDelete={handleDeleteUser}
				/>
			</Box>

			<UserForm
				open={openDialog}
				user={selectedUser}
				onClose={handleCloseDialog}
				onSubmit={handleSubmitUser}
			/>

			<Snackbar
				open={snackbar.open}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Container>
	);
}

export default App;
