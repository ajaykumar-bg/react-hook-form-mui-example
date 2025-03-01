import React, { useEffect } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../validation/schemas';
import { useTranslation } from 'react-i18next';

const UserForm = ({ open, user, onClose, onSubmit }) => {
	const { t, i18n } = useTranslation();

	const schema = createUserSchema();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			role: '',
		},
		resolver: yupResolver(schema),
	});

	// Effect to set form values when editing
	useEffect(() => {
		if (user) {
			setValue('name', user.name);
			setValue('email', user.email);
			setValue('phone', user.phone);
			setValue('role', user.role);
		}
	}, [user, setValue]);

	// Reset form when dialog closes
	useEffect(() => {
		if (!open) {
			reset();
		}
	}, [open, reset]);

	// Update validation schema when language changes
	useEffect(() => {
		// This forces a re-render when language changes
	}, [i18n.language]);

	return (
		<Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
			<DialogTitle>{user ? t('form.editUser') : t('form.addUser')}</DialogTitle>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<TextField
						margin='dense'
						label={t('form.nameLabel')}
						fullWidth
						variant='outlined'
						{...register('name')}
						error={!!errors.name}
						helperText={errors.name?.message}
					/>
					<TextField
						margin='dense'
						label={t('form.emailLabel')}
						type='email'
						fullWidth
						variant='outlined'
						{...register('email')}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						margin='dense'
						label={t('form.phoneLabel')}
						fullWidth
						variant='outlined'
						{...register('phone')}
						error={!!errors.phone}
						helperText={errors.phone?.message}
					/>
					<TextField
						margin='dense'
						label={t('form.roleLabel')}
						fullWidth
						variant='outlined'
						{...register('role')}
						error={!!errors.role}
						helperText={errors.role?.message}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color='primary'>
						{t('form.cancel')}
					</Button>
					<Button type='submit' color='primary' variant='contained'>
						{user ? t('form.update') : t('form.add')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default UserForm;
