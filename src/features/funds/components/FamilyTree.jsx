import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Tree from 'react-d3-tree';

const myTreeData = [
	{
		name: 'Vasumathi',
		attributes: {
			husband: 'Pachan',
			job: '',
			husbandJob: 'Teacher', //Not sure
		},
		children: [
			{
				name: 'Lalitha',
				attributes: {
					husband: 'Thadi',
					nickname: 'Thadi',
				},
				children: [
					{
						name: 'Ashokan',
						attributes: {},
					},
					{
						name: 'Mohanan',
						attributes: {},
					},
					{
						name: 'Sindhu',
						attributes: {},
					},
				],
			},
			{
				name: 'Subashini',
				attributes: {
					husband: 'Thadi',
					nickname: 'Thadi',
				},
				children: [
					{
						name: 'Bindhu',
						attributes: {},
					},
					{
						name: 'Prakash',
						attributes: {},
					},
				],
			},
		],
	},
];

function FamilyTree() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				maxWidth: { sm: '100%', md: '1700px' },
			}}
		>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Family Tree
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the Family Tree page.
			</Typography>
			<Divider />
			<Box sx={{ my: 3 }}>
				<Tree data={myTreeData} />
				{/* <Grid container spacing={2}>
					<Grid item>
						<Typography>Update your language here</Typography>
					</Grid>
					<Grid item>
						<LanguageSelector />
					</Grid>
				</Grid> */}
			</Box>
			<Divider />
		</Box>
	);
}

export default FamilyTree;
