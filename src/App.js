import React, { useState } from 'react';
import { Container, Box, Typography, Snackbar, Alert } from '@mui/material';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import AddUserButton from './components/AddUserButton';
import LanguageSelector from './components/LanguageSelector';
import { useTranslation } from 'react-i18next';
import './i18n/i18n'; // Import i18n initialization

// Initial data
const initialUsers = [
	{
		id: 1,
		name: 'John Doe',
		email: 'john@example.com',
		phone: '1234567890',
		role: 'Admin',
	},
	{
		id: 2,
		name: 'Jane Smith',
		email: 'jane@example.com',
		phone: '0987654321',
		role: 'User',
	},
];

function App() {
	const [users, setUsers] = useState(initialUsers);
	const [openDialog, setOpenDialog] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success',
	});
	const { t } = useTranslation();

	// Handle dialog open for create/edit
	const handleOpenDialog = (user = null) => {
		setCurrentUser(user);
		setOpenDialog(true);
	};

	// Handle dialog close
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setCurrentUser(null);
	};

	// Handle form submission
	const handleSubmitUser = async (data) => {
		try {
			// Validate with yup schema (already validated by react-hook-form with yupResolver)
			if (currentUser) {
				// Update existing user
				const updatedUsers = users.map((user) =>
					user.id === currentUser.id ? { ...user, ...data } : user
				);
				setUsers(updatedUsers);
				showNotification(t('notifications.userUpdated'), 'success');
			} else {
				// Add new user
				const newUser = {
					id:
						users.length > 0
							? Math.max(...users.map((user) => user.id)) + 1
							: 1,
					...data,
				};
				setUsers([...users, newUser]);
				showNotification(t('notifications.userAdded'), 'success');
			}
			handleCloseDialog();
		} catch (error) {
			showNotification(error.message, 'error');
		}
	};

	// Handle user deletion
	const handleDeleteUser = (id) => {
		const updatedUsers = users.filter((user) => user.id !== id);
		setUsers(updatedUsers);
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
				user={currentUser}
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
