import React from 'react';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const UserTable = ({ users, onEdit, onDelete }) => {
	const { t } = useTranslation();

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t('table.name')}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t('table.email')}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t('table.phone')}
							</Typography>
						</TableCell>
						<TableCell>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t('table.role')}
							</Typography>
						</TableCell>
						<TableCell align='center'>
							<Typography variant='subtitle1' fontWeight='bold'>
								{t('table.actions')}
							</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.length > 0 ? (
						users.map((user) => (
							<TableRow key={user.id}>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.phone}</TableCell>
								<TableCell>{user.role}</TableCell>
								<TableCell align='center'>
									<IconButton
										color='primary'
										onClick={() => onEdit(user)}
										size='small'
										data-testid='edit-button'
									>
										<EditIcon />
									</IconButton>
									<IconButton
										color='error'
										onClick={() => onDelete(user.id)}
										size='small'
										data-testid='delete-button'
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={5} align='center'>
								<Typography variant='body1'>{t('table.noUsers')}</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserTable;
