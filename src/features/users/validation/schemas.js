// validation/schemas.js (updated with i18n)
import * as yup from 'yup';
import i18n from '../../../i18n/i18n';

export const createUserSchema = () => {
	return yup.object().shape({
		name: yup
			.string()
			.required(i18n.t('validation.nameRequired'))
			.min(3, i18n.t('validation.nameMinLength')),
		email: yup
			.string()
			.required(i18n.t('validation.emailRequired'))
			.email(i18n.t('validation.emailInvalid')),
		phone: yup
			.string()
			.required(i18n.t('validation.phoneRequired'))
			.matches(/^\d{10}$/, i18n.t('validation.phoneFormat')),
		role: yup.string().required(i18n.t('validation.roleRequired')),
	});
};
