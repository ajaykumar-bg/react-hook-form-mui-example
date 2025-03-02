import React, { useState } from 'react';
import { Link } from 'react-router';
import {
	AppBar,
	Box,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import InfoIcon from '@mui/icons-material/Info';
import MailIcon from '@mui/icons-material/Mail';
import SettingsIcon from '@mui/icons-material/Settings';

import Home from '../components/Home';
import Contact from '../components/Contact';
import Settings from '../components/Settings';
import About from '../components/About';

import UserManagement from '../features/users/components/UserManagement';

const drawerWidth = 240;

function ResponsiveDrawer() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const [activeItem, setActiveItem] = useState('Home');

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{ text: 'Home', icon: <HomeIcon /> },
		{ text: 'Users', icon: <PeopleIcon /> },
		{ text: 'About', icon: <InfoIcon /> },
		{ text: 'Contact', icon: <MailIcon /> },
		{ text: 'Settings', icon: <SettingsIcon /> },
	];

	const drawer = (
		<div>
			<Toolbar>
				<Typography variant='h6' noWrap component='div'>
					React Workspace
				</Typography>
			</Toolbar>
			<Divider />
			<List>
				{menuItems.map((item) => (
					<ListItem key={item.text} disablePadding>
						<ListItemButton
							selected={activeItem === item.text}
							onClick={() => setActiveItem(item.text)}
						>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
						My Application
					</Typography>
					<Link
						to={{
							pathname: '/login',
						}}
					>
						Login
					</Link>
				</Toolbar>
			</AppBar>
			<Box
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					sx={{
						display: { xs: 'none', sm: 'block' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: drawerWidth,
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<>
					{activeItem === 'Home' && <Home />}
					{activeItem === 'Users' && <UserManagement />}
					{activeItem === 'About' && <About />}
					{activeItem === 'Contact' && <Contact />}
					{activeItem === 'Settings' && <Settings />}
				</>
			</Box>
		</Box>
	);
}
export default ResponsiveDrawer;
