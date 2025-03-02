import axios from 'axios';

const API_URL = 'http://localhost:5000';

const userApi = {
	getUsers: async () => {
		return await axios.get(`${API_URL}/users`);
	},

	getUserById: async (id) => {
		return await axios.get(`${API_URL}/users/${id}`);
	},

	createUser: async (user) => {
		return await axios.post(`${API_URL}/users`, user);
	},

	updateUser: async (id, user) => {
		return await axios.put(`${API_URL}/users/${id}`, user);
	},

	deleteUser: async (id) => {
		return await axios.delete(`${API_URL}/users/${id}`);
	},
};

export default userApi;
