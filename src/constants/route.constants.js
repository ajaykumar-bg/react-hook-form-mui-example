import { Trans } from 'react-i18next';

export const getAppRoutes = () => [
	{
		label: <Trans i18nKey='page.home' />,
		path: '/',
	},
	{
		label: <Trans i18nKey='page.home' />,
		path: '/dashboard',
	},
	{
		label: <Trans i18nKey='page.login' />,
		path: '/login',
	},
	{
		label: <Trans i18nKey='page.register' />,
		path: '/register',
	},
	{
		label: <Trans i18nKey='page.users' />,
		path: '/users',
	},
	{
		label: <Trans i18nKey='page.exercises' />,
		path: '/exercises',
	},
	{
		label: <Trans i18nKey='page.settings' />,
		path: '/settings',
	},
	{
		label: <Trans i18nKey='page.about' />,
		path: '/about',
	},
	{
		label: <Trans i18nKey='page.contact' />,
		path: '/contact',
	},
	{
		label: <Trans i18nKey='page.profile' />,
		path: '/profile',
	},
	{
		label: <Trans i18nKey='page.account' />,
		path: '/account',
	},
];
