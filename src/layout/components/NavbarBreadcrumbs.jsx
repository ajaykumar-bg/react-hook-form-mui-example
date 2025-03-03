import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { getAppRoutes } from '../../constants/route.constants';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
	margin: theme.spacing(1, 0),
	[`& .${breadcrumbsClasses.separator}`]: {
		color: (theme.vars || theme).palette.action.disabled,
		margin: 1,
	},
	[`& .${breadcrumbsClasses.ol}`]: {
		alignItems: 'center',
	},
}));

function NavbarBreadcrumbs() {
	const appRoutes = useMemo(() => getAppRoutes(), []);
	const location = useLocation();
	const currentRoute = appRoutes.find((r) => r.path === location.pathname);
	return (
		<StyledBreadcrumbs
			aria-label='breadcrumb'
			separator={<NavigateNextRoundedIcon fontSize='small' />}
		>
			<Typography variant='body1'>
				<Trans i18nKey='page.home' />
			</Typography>
			<Typography
				variant='body1'
				sx={{ color: 'text.primary', fontWeight: 600 }}
			>
				{currentRoute?.label}
			</Typography>
		</StyledBreadcrumbs>
	);
}

export default NavbarBreadcrumbs;
