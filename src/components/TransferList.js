import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function not(a, b) {
	return a.filter((itemA) => !b.some((itemB) => itemB.value === itemA.value));
}

function intersection(a, b) {
	return a.filter((itemA) => b.some((itemB) => itemB.value === itemA.value));
}

export default function TransferList() {
	const [checked, setChecked] = React.useState([]);
	const [left, setLeft] = React.useState([
		{ value: 0, label: 'Task 1' },
		{ value: 1, label: 'Task 2' },
		{ value: 2, label: 'Task 3' },
		{ value: 3, label: 'Task 4' },
	]);
	const [right, setRight] = React.useState([
		{ value: 4, label: 'Completed 1' },
		{ value: 5, label: 'Completed 2' },
		{ value: 6, label: 'Completed 3' },
		{ value: 7, label: 'Completed 4' },
	]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (item) => () => {
		const currentIndex = checked.findIndex(
			(checkedItem) => checkedItem.value === item.value
		);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(item);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const isChecked = (item) => {
		return checked.some((checkedItem) => checkedItem.value === item.value);
	};

	const customList = (items) => (
		<Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
			<List dense component='div' role='list'>
				{items.map((item) => {
					const labelId = `transfer-list-item-${item.value}-label`;

					return (
						<ListItemButton
							key={item.value}
							role='listitem'
							onClick={handleToggle(item)}
						>
							<ListItemIcon>
								<Checkbox
									checked={isChecked(item)}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={item.label} />
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);

	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<Grid>{customList(left)}</Grid>
			<Grid>
				<Grid container direction='column' sx={{ alignItems: 'center' }}>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleAllRight}
						disabled={left.length === 0}
						aria-label='move all right'
					>
						≫
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label='move selected right'
					>
						&gt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label='move selected left'
					>
						&lt;
					</Button>
					<Button
						sx={{ my: 0.5 }}
						variant='outlined'
						size='small'
						onClick={handleAllLeft}
						disabled={right.length === 0}
						aria-label='move all left'
					>
						≪
					</Button>
				</Grid>
			</Grid>
			<Grid>{customList(right)}</Grid>
		</Grid>
	);
}
