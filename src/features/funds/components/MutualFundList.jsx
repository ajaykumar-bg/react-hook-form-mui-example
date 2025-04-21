import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';

function MutualFundList(props) {
	const { funds, selectedMutualFund, handleSelect } = props;

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 360,
				bgcolor: 'background.paper',
			}}
		>
			{funds.map((fund) => (
				<ListItem key={fund.schemeCode} onClick={() => handleSelect(fund)}>
					<ListItemAvatar>
						<Avatar>
							<WorkIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary={fund.schemeName} secondary={fund.schemeCode} />
				</ListItem>
			))}
		</List>
	);
}

export default MutualFundList;
