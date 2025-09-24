import React from 'react';
import { Box, Typography } from '@mui/material';
import Tree from 'react-d3-tree';
import { MOCK_FAMILY_TREE } from '../data/familyTree.mock';

function FamilyTree() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				// maxWidth: { sm: '100%', md: '1700px' },
			}}
		>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Family Tree
			</Typography>
			<Typography variant='subtitle2' gutterBottom>
				This is the Family Tree page.
			</Typography>
			<Box sx={{ my: 3, height: '500px', width: '100%' }}>
				<Tree
					data={MOCK_FAMILY_TREE}
					orientation='vertical'
					pathFunc='step'
					translate={{ x: window.innerWidth / 2, y: 50 }}
					separation={{ siblings: 2, nonSiblings: 2 }}
				/>
			</Box>
		</Box>
	);
}

export default FamilyTree;
