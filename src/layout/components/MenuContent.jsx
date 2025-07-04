import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
// import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
// import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ShowChartIcon from '@mui/icons-material/ShowChart';

import { getAppRoutes } from '../../constants/route.constants';

const mainListItems = [
	{ text: 'Home', icon: <HomeRoundedIcon />, path: '/dashboard' },
	{ text: 'Users', icon: <PeopleRoundedIcon />, path: '/users' },
	{ text: 'Exercises', icon: <FitnessCenterIcon />, path: '/exercises' },
	{ text: 'Charts', icon: <ShowChartIcon />, path: '/charts' },
	{
		text: 'Cricket Live scores',
		icon: <ShowChartIcon />,
		path: '/cricket-live-score',
	},
	{ text: 'Mutual Funds', icon: <ShowChartIcon />, path: '/mutual-funds' },
	{
		text: 'Investment Portfolio Tracker - V1',
		icon: <ShowChartIcon />,
		path: '/investment-portfolio-tracker-v1',
	},
	{
		text: 'Investment Portfolio Tracker - V2',
		icon: <ShowChartIcon />,
		path: '/investment-portfolio-tracker-v2',
	},
	// { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
	{
		text: 'TransferList',
		icon: <SettingsRoundedIcon />,
		path: '/transfer-list',
	},
	{ text: 'Settings', icon: <SettingsRoundedIcon />, path: '/settings' },
	{ text: 'About', icon: <InfoRoundedIcon />, path: '/about' },
	{ text: 'Contact', icon: <HelpRoundedIcon />, path: '/contact' },
];

function MenuContent() {
	const appRoutes = useMemo(() => getAppRoutes(), []);
	const location = useLocation();
	const currentRoute = appRoutes.find((r) => r.path === location.pathname);

	const navigate = useNavigate();
	const onMenuClick = (path) => {
		if (!path) return;
		navigate(path);
	};
	return (
		<Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
			<List dense>
				{mainListItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => onMenuClick(item.path)}
					>
						<ListItemButton selected={item.path === currentRoute?.path}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<List dense>
				{secondaryListItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => onMenuClick(item.path)}
					>
						<ListItemButton selected={item.path === currentRoute?.path}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Stack>
	);
}

export default MenuContent;
