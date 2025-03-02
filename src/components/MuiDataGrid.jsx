import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const paginationModel = { page: 0, pageSize: 5 };

export default function MuiDataGrid(props) {
	const { pRows, pColumns } = props;
	return (
		<Paper sx={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={pRows}
				columns={pColumns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
				checkboxSelection
				sx={{ border: 0 }}
			/>
		</Paper>
	);
}
