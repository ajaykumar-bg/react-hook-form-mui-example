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
