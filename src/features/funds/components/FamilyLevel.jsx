import React from 'react';
import {
	Box,
	Typography,
	Card,
	CardContent,
	Grid,
	Divider,
} from '@mui/material';
import { MOCK_FAMILY_TREE } from '../data/familyTree.mock';

const FamilyMemberCard = ({ member }) => {
	return (
		<Card
			sx={{
				minWidth: 200,
				m: 1,
				backgroundColor: '#f5f5f5',
				'&:hover': {
					backgroundColor: '#e0e0e0',
					boxShadow: 3,
				},
			}}
		>
			<CardContent>
				<Typography variant='h6' component='div' gutterBottom>
					{member.name}
				</Typography>
				{member.attributes && Object.entries(member.attributes).length > 0 && (
					<>
						<Divider sx={{ my: 1 }} />
						{Object.entries(member.attributes).map(([key, value]) => (
							<Typography key={key} variant='body2' color='text.secondary'>
								{key.charAt(0).toUpperCase() + key.slice(1)}: {value}
							</Typography>
						))}
					</>
				)}
			</CardContent>
		</Card>
	);
};

const FamilyLevel = ({ members }) => {
	return (
		<Grid container justifyContent='center' spacing={2}>
			{members.map((member, index) => (
				<Grid item key={`${member.name}-${index}`}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<FamilyMemberCard member={member} />
						{member.children && member.children.length > 0 && (
							<Box
								sx={{
									width: 2,
									height: 20,
									backgroundColor: 'grey.400',
									my: 1,
								}}
							/>
						)}
						{member.children && <FamilyLevel members={member.children} />}
					</Box>
				</Grid>
			))}
		</Grid>
	);
};

function FamilyTree() {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				maxWidth: { sm: '100%', md: '1700px' },
				overflowX: 'auto',
				p: 3,
			}}
		>
			<Typography component='h2' variant='h6' sx={{ mb: 2 }}>
				Family Level
			</Typography>
			<Box
				sx={{
					my: 3,
					width: '100%',
				}}
			>
				<FamilyLevel members={MOCK_FAMILY_TREE} />
			</Box>
		</Box>
	);
}

export default FamilyTree;
