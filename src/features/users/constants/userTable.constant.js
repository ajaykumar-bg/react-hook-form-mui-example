import { Trans } from 'react-i18next';

export const getUserColumns = () => [
	{
		field: 'name',
		headerName: <Trans i18nKey='table.name' />,
		width: 200,
	},
	{ field: 'email', headerName: <Trans i18nKey='table.email' />, width: 230 },
	{
		field: 'phone',
		headerName: <Trans i18nKey='table.phone' />,
		type: 'number',
		width: 100,
	},
	{
		field: 'role',
		headerName: <Trans i18nKey='table.role' />,
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 100,
		// valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
	},
	{
		field: 'actions',
		headerName: <Trans i18nKey='table.actions' />,
		description: 'This column has a value getter and is not sortable.',
		sortable: false,
		width: 160,
	},
];
