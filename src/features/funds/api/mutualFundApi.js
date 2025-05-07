import { MF_API } from '../../../constants';

export const fetchMutualFunds = async () => {
	try {
		const response = await fetch(`${MF_API}/mf`);
		if (!response.ok) throw new Error('Failed to fetch mutual funds');
		return await response.json();
	} catch (error) {
		throw error;
	}
};

export const fetchMutualFundById = async (id) => {
	try {
		const response = await fetch(`${MF_API}/mf/${id}`);
		if (!response.ok) throw new Error(`Failed to fetch mf with id ${id}`);
		return await response.json();
	} catch (error) {
		throw error;
	}
};
