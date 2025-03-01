import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
	const { t, i18n } = useTranslation();

	const changeLanguage = (event) => {
		const language = event.target.value;
		i18n.changeLanguage(language);
		localStorage.setItem('language', language);
	};

	return (
		<FormControl sx={{ minWidth: 120 }}>
			<InputLabel id='language-select-label'>Language</InputLabel>
			<Select
				labelId='language-select-label'
				id='language-select'
				name='language'
				value={i18n.language}
				label='Language'
				onChange={changeLanguage}
				data-testid='language-select'
			>
				<MenuItem
					name='english'
					data-testid='language-option-english'
					value='en'
				>
					English
				</MenuItem>
				<MenuItem
					name='spanish'
					data-testid='language-option-spanish'
					value='es'
				>
					Spanish
				</MenuItem>
			</Select>
		</FormControl>
	);
};

export default LanguageSelector;
