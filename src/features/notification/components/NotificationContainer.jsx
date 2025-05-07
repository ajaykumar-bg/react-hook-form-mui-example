// File: src/features/notification/NotificationContainer.js
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNotifications } from '../redux/notificationSlice';
import Notification from './Notification';

const NotificationContainer = () => {
	const notifications = useSelector(selectNotifications);

	return (
		<div className='fixed top-4 right-4 w-72 z-50'>
			{notifications.map((notification) => (
				<Notification key={notification.id} notification={notification} />
			))}
		</div>
	);
};

export default NotificationContainer;
