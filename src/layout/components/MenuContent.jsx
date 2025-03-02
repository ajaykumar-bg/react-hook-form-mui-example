import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const mainListItems = [
	{ text: 'Home', icon: <HomeRoundedIcon />, routeLink: '/dashboard' },
	{ text: 'Users', icon: <PeopleRoundedIcon />, routeLink: '/users' },
	{ text: 'Analytics', icon: <AnalyticsRoundedIcon /> },
	{ text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
	{ text: 'Settings', icon: <SettingsRoundedIcon />, routeLink: '/settings' },
	{ text: 'About', icon: <InfoRoundedIcon />, routeLink: '/about' },
	{ text: 'Feedback', icon: <HelpRoundedIcon /> },
];

function MenuContent() {
	const navigate = useNavigate();
	const onMenuClick = (routeLink) => {
		if (!routeLink) return;
		navigate(routeLink);
	};
	return (
		<Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
			<List dense>
				{mainListItems.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: 'block' }}
						onClick={() => onMenuClick(item.routeLink)}
					>
						<ListItemButton selected={index === 0}>
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
						onClick={() => onMenuClick(item.routeLink)}
					>
						<ListItemButton>
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
