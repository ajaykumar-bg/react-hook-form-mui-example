import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	notifications: [],
};

export const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification: (state, action) => {
			// Generate a unique ID for each notification
			const id = Date.now().toString();
			state.notifications.push({
				id,
				type: action.payload.type || 'info',
				message: action.payload.message,
				duration: action.payload.duration || 5000,
			});
		},
		removeNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== action.payload
			);
		},
		clearAllNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const { addNotification, removeNotification, clearAllNotifications } =
	notificationSlice.actions;

export const selectNotifications = (state) => state.notification.notifications;

export default notificationSlice.reducer;
