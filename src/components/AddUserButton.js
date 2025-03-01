import React from 'react';
import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const AddUserButton = ({ onAddClick }) => {
	const { t } = useTranslation();

	return (
		<Button variant='contained' startIcon={<AddIcon />} onClick={onAddClick}>
			{t('buttons.addUser')}
		</Button>
	);
};

export default AddUserButton;
