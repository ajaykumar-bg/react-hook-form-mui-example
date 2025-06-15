import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

// Optimized utility functions using Sets for O(1) lookup
const not = (a, b) => {
	const bSet = new Set(b.map((item) => item.value));
	return a.filter((item) => !bSet.has(item.value));
};

const intersection = (a, b) => {
	const bSet = new Set(b.map((item) => item.value));
	return a.filter((item) => bSet.has(item.value));
};

// Memoized ListItem component to prevent unnecessary re-renders
const ListItem = React.memo(({ item, isChecked, onToggle }) => {
	const labelId = `transfer-list-item-${item.value}-label`;

	return (
		<ListItemButton key={item.value} role='listitem' onClick={onToggle}>
			<ListItemIcon>
				<Checkbox
					checked={isChecked}
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
});

// Memoized CustomList component
const CustomList = React.memo(({ items, checkedSet, onToggle }) => (
	<Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
		<List dense component='div' role='list'>
			{items.map((item) => (
				<ListItem
					key={item.value}
					item={item}
					isChecked={checkedSet.has(item.value)}
					onToggle={onToggle(item)}
				/>
			))}
		</List>
	</Paper>
));

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

	// Memoized sets for O(1) lookup performance
	const checkedSet = React.useMemo(
		() => new Set(checked.map((item) => item.value)),
		[checked]
	);
	const leftChecked = React.useMemo(
		() => intersection(checked, left),
		[checked, left]
	);
	const rightChecked = React.useMemo(
		() => intersection(checked, right),
		[checked, right]
	);

	// Memoized toggle handler to prevent recreation on every render
	const handleToggle = React.useCallback(
		(item) => () => {
			setChecked((prevChecked) => {
				const currentIndex = prevChecked.findIndex(
					(checkedItem) => checkedItem.value === item.value
				);

				if (currentIndex === -1) {
					return [...prevChecked, item];
				} else {
					const newChecked = [...prevChecked];
					newChecked.splice(currentIndex, 1);
					return newChecked;
				}
			});
		},
		[]
	);

	// Memoized action handlers
	const handleAllRight = React.useCallback(() => {
		setRight((prevRight) => [...prevRight, ...left]);
		setLeft([]);
		setChecked((prevChecked) => not(prevChecked, left));
	}, [left]);

	const handleCheckedRight = React.useCallback(() => {
		setRight((prevRight) => [...prevRight, ...leftChecked]);
		setLeft((prevLeft) => not(prevLeft, leftChecked));
		setChecked((prevChecked) => not(prevChecked, leftChecked));
	}, [leftChecked]);

	const handleCheckedLeft = React.useCallback(() => {
		setLeft((prevLeft) => [...prevLeft, ...rightChecked]);
		setRight((prevRight) => not(prevRight, rightChecked));
		setChecked((prevChecked) => not(prevChecked, rightChecked));
	}, [rightChecked]);

	const handleAllLeft = React.useCallback(() => {
		setLeft((prevLeft) => [...prevLeft, ...right]);
		setRight([]);
		setChecked((prevChecked) => not(prevChecked, right));
	}, [right]);

	return (
		<Grid
			container
			spacing={2}
			sx={{ justifyContent: 'center', alignItems: 'center' }}
		>
			<Grid>
				<CustomList
					items={left}
					checkedSet={checkedSet}
					onToggle={handleToggle}
				/>
			</Grid>
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
			<Grid>
				<CustomList
					items={right}
					checkedSet={checkedSet}
					onToggle={handleToggle}
				/>
			</Grid>
		</Grid>
	);
}
