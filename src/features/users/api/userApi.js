/*
import axios from 'axios';
import { API_URL } from '../constants';

export const userApi = {
	fetchUsers: () => {
		return axios.get(`${API_URL}/users`);
	},

	createUser: (userData) => {
		return axios.post(`${API_URL}/users`, userData);
	},

	updateUser: (userData) => {
		return axios.put(`${API_URL}/users/${userData.id}`, userData);
	},

	deleteUser: (userId) => {
		return axios.delete(`${API_URL}/users/${userId}`);
	},
};
*/

import { API_URL } from '../../../constants';

export const fetchUsers = async () => {
	try {
		const response = await fetch(`${API_URL}/users`);
		if (!response.ok) throw new Error('Failed to fetch users');
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const fetchUserById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/users/${id}`);
		if (!response.ok) throw new Error(`Failed to fetch user with id ${id}`);
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const createUser = async (userData) => {
	try {
		const response = await fetch(`${API_URL}/users`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		if (!response.ok) throw new Error('Failed to create user');
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const updateUser = async (id, userData) => {
	try {
		const response = await fetch(`${API_URL}/users/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});
		if (!response.ok) throw new Error(`Failed to update user with id ${id}`);
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const deleteUser = async (id) => {
	try {
		const response = await fetch(`${API_URL}/users/${id}`, {
			method: 'DELETE',
		});
		if (!response.ok) throw new Error(`Failed to delete user with id ${id}`);
		return id;
	} catch (error) {
		throw error;
	}
};
