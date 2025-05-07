import React from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../redux/notificationSlice';

const ExampleComponent = () => {
	const dispatch = useDispatch();

	const showNotification = (type) => {
		dispatch(
			addNotification({
				type,
				message: `This is a ${type} notification!`,
				duration: 5000,
			})
		);
	};

	return (
		<div className='max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-lg font-semibold mb-4'>Test Notifications</h2>
			<div className='space-y-2'>
				<button
					onClick={() => showNotification('success')}
					className='w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
				>
					Show Success
				</button>
				<button
					onClick={() => showNotification('error')}
					className='w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
				>
					Show Error
				</button>
				<button
					onClick={() => showNotification('warning')}
					className='w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600'
				>
					Show Warning
				</button>
				<button
					onClick={() => showNotification('info')}
					className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
				>
					Show Info
				</button>
			</div>
		</div>
	);
};

export default ExampleComponent;
