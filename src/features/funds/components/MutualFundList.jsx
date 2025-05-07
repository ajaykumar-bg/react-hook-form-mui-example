import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

function MutualFundList(props) {
	const { funds, handleSelect, selectedMutualFund } = props;

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 360,
				bgcolor: 'background.paper',
				maxHeight: 800,
				overflow: 'auto',
			}}
		>
			{funds.map((fund) => (
				<ListItemButton
					selected={selectedMutualFund?.schemeCode === fund.schemeCode}
					sx={{ cursor: 'pointer' }}
					key={fund.schemeCode}
					onClick={() => handleSelect(fund)}
				>
					<ListItemAvatar>
						<Avatar>
							<WorkIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={fund.schemeName} secondary={fund.schemeCode} />
				</ListItemButton>
			))}
		</List>
	);
}

export default MutualFundList;
