import React, { useState } from 'react';
import {
	Box,
	Card,
	CardContent,
	TextField,
	Button,
	Typography,
	InputAdornment,
	IconButton,
	Divider,
	Checkbox,
	FormControlLabel,
	Link,
	Alert,
	CircularProgress,
} from '@mui/material';
import {
	Visibility,
	VisibilityOff,
	Email,
	Lock,
	Google,
	Facebook,
	Twitter,
} from '@mui/icons-material';

const Login = ({ onLogin, isLoading = false, errorMessage = null }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [formErrors, setFormErrors] = useState({
		email: '',
		password: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Clear validation error when user types
		if (formErrors[name]) {
			setFormErrors({
				...formErrors,
				[name]: '',
			});
		}
	};

	const validateForm = () => {
		let valid = true;
		const errors = { email: '', password: '' };

		// Email validation
		if (!formData.email) {
			errors.email = 'Email is required';
			valid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			errors.email = 'Email is invalid';
			valid = false;
		}

		// Password validation
		if (!formData.password) {
			errors.password = 'Password is required';
			valid = false;
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters';
			valid = false;
		}

		setFormErrors(errors);
		return valid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			if (onLogin) {
				onLogin(formData, rememberMe);
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Card sx={{ maxWidth: 450, width: '100%', boxShadow: 3, borderRadius: 2 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography
					variant='h4'
					component='h1'
					align='center'
					gutterBottom
					fontWeight='bold'
				>
					Welcome Back
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
					sx={{ mb: 4 }}
				>
					Enter your credentials to access your account
				</Typography>

				{errorMessage && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{errorMessage}
					</Alert>
				)}

				<Box component='form' onSubmit={handleSubmit} noValidate>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						name='email'
						autoComplete='email'
						autoFocus
						value={formData.email}
						onChange={handleInputChange}
						error={!!formErrors.email}
						helperText={formErrors.email}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Email color='action' />
								</InputAdornment>
							),
						}}
						sx={{ mb: 2 }}
					/>

					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label='Password'
						type={showPassword ? 'text' : 'password'}
						id='password'
						autoComplete='current-password'
						value={formData.password}
						onChange={handleInputChange}
						error={!!formErrors.password}
						helperText={formErrors.password}
						InputProps={{
							startAdornment: (
								<InputAdornment position='start'>
									<Lock color='action' />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={togglePasswordVisibility}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						sx={{ mb: 1 }}
					/>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							mb: 2,
						}}
					>
						<FormControlLabel
							control={
								<Checkbox
									checked={rememberMe}
									onChange={(e) => setRememberMe(e.target.checked)}
									color='primary'
									size='small'
								/>
							}
							label={<Typography variant='body2'>Remember me</Typography>}
						/>

						<Link href='#' variant='body2' underline='hover'>
							Forgot password?
						</Link>
					</Box>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						size='large'
						sx={{
							mb: 3,
							py: 1.5,
							textTransform: 'none',
							fontWeight: 'bold',
						}}
						disabled={isLoading}
					>
						{isLoading ? (
							<CircularProgress size={24} color='inherit' />
						) : (
							'Sign In'
						)}
					</Button>

					<Divider sx={{ my: 2 }}>
						<Typography variant='body2' color='text.secondary'>
							OR
						</Typography>
					</Divider>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: 2,
							mb: 3,
						}}
					>
						<Button
							variant='outlined'
							fullWidth
							startIcon={<Google />}
							sx={{
								py: 1,
								textTransform: 'none',
								borderColor: '#DDDDDD',
								color: 'text.primary',
							}}
						>
							Google
						</Button>

						<Button
							variant='outlined'
							fullWidth
							startIcon={<Facebook />}
							sx={{
								py: 1,
								textTransform: 'none',
								borderColor: '#DDDDDD',
								color: 'text.primary',
							}}
						>
							Facebook
						</Button>

						<Button
							variant='outlined'
							fullWidth
							startIcon={<Twitter />}
							sx={{
								py: 1,
								textTransform: 'none',
								borderColor: '#DDDDDD',
								color: 'text.primary',
							}}
						>
							Twitter
						</Button>
					</Box>

					<Typography variant='body2' align='center' color='text.secondary'>
						Don't have an account?{' '}
						<Link href='/register' underline='hover' fontWeight='bold'>
							Sign Up
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Login;
