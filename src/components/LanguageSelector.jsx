import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
	const { i18n } = useTranslation();

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
				defaultValue='en'
				id='language-select'
				name='language'
				value={i18n.language}
				label='Language'
				onChange={changeLanguage}
			>
				<MenuItem name='english' value='en'>
					English
				</MenuItem>
				<MenuItem name='spanish' value='es'>
					Spanish
				</MenuItem>
			</Select>
		</FormControl>
	);
};

export default LanguageSelector;
