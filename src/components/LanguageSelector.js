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
			<InputLabel id='language-select-label'>
				{t('languageSelector.language')}
			</InputLabel>
			<Select
				labelId='language-select-label'
				id='language-select'
				value={i18n.language}
				label={t('languageSelector.language')}
				onChange={changeLanguage}
			>
				<MenuItem value='en'>{t('languageSelector.english')}</MenuItem>
				<MenuItem value='es'>{t('languageSelector.spanish')}</MenuItem>
			</Select>
		</FormControl>
	);
};

export default LanguageSelector;
