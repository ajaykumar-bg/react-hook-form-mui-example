import axios from 'axios';

const AUTH_URL = 'https://api.example.com/auth';

export const authApi = {
	login: (credentials) => {
		return axios.post(`${AUTH_URL}/login`, credentials);
	},

	logout: () => {
		return axios.post(`${AUTH_URL}/logout`);
	},

	getCurrentUser: () => {
		return axios.get(`${AUTH_URL}/me`);
	},
};
