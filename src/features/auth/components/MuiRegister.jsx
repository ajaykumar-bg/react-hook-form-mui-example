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
	Grid,
	Stepper,
	Step,
	StepLabel,
} from '@mui/material';
import {
	Visibility,
	VisibilityOff,
	Email,
	Lock,
	Person,
	Google,
	Facebook,
	Twitter,
	Phone,
	CheckCircleOutline,
} from '@mui/icons-material';

const Register = ({ onSignUp, isLoading = false, errorMessage = null }) => {
	const [activeStep, setActiveStep] = useState(0);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [termsAccepted, setTermsAccepted] = useState(false);
	const [formErrors, setFormErrors] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
	});

	const steps = ['Personal Information', 'Account Details', 'Confirmation'];

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

	const validateStep = (step) => {
		let valid = true;
		const errors = { ...formErrors };

		if (step === 0) {
			// Validate personal information
			if (!formData.firstName.trim()) {
				errors.firstName = 'First name is required';
				valid = false;
			}

			if (!formData.lastName.trim()) {
				errors.lastName = 'Last name is required';
				valid = false;
			}

			if (!formData.phone.trim()) {
				errors.phone = 'Phone number is required';
				valid = false;
			} else if (
				!/^\+?[1-9]\d{9,14}$/.test(formData.phone.replace(/\s+/g, ''))
			) {
				errors.phone = 'Invalid phone number format';
				valid = false;
			}
		} else if (step === 1) {
			// Validate account details
			if (!formData.email) {
				errors.email = 'Email is required';
				valid = false;
			} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
				errors.email = 'Email is invalid';
				valid = false;
			}

			if (!formData.password) {
				errors.password = 'Password is required';
				valid = false;
			} else if (formData.password.length < 8) {
				errors.password = 'Password must be at least 8 characters';
				valid = false;
			} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
				errors.password =
					'Password must include uppercase, lowercase, and numbers';
				valid = false;
			}

			if (!formData.confirmPassword) {
				errors.confirmPassword = 'Please confirm your password';
				valid = false;
			} else if (formData.password !== formData.confirmPassword) {
				errors.confirmPassword = 'Passwords do not match';
				valid = false;
			}
		}

		setFormErrors(errors);
		return valid;
	};

	const handleNext = () => {
		if (validateStep(activeStep)) {
			setActiveStep((prevStep) => prevStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevStep) => prevStep - 1);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (activeStep === 2) {
			if (!termsAccepted) {
				return;
			}

			if (onSignUp) {
				onSignUp(formData);
			}
		} else {
			handleNext();
		}
	};

	const togglePasswordVisibility = (field) => {
		if (field === 'password') {
			setShowPassword(!showPassword);
		} else {
			setShowConfirmPassword(!showConfirmPassword);
		}
	};

	// Render form content based on active step
	const renderStepContent = (step) => {
		switch (step) {
			case 0:
				return (
					<>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='firstName'
									label='First Name'
									name='firstName'
									autoComplete='given-name'
									autoFocus
									value={formData.firstName}
									onChange={handleInputChange}
									error={!!formErrors.firstName}
									helperText={formErrors.firstName}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Person color='action' />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									margin='normal'
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
									value={formData.lastName}
									onChange={handleInputChange}
									error={!!formErrors.lastName}
									helperText={formErrors.lastName}
									InputProps={{
										startAdornment: (
											<InputAdornment position='start'>
												<Person color='action' />
											</InputAdornment>
										),
									}}
								/>
							</Grid>
						</Grid>
						<TextField
							margin='normal'
							required
							fullWidth
							id='phone'
							label='Phone Number'
							name='phone'
							autoComplete='tel'
							value={formData.phone}
							onChange={handleInputChange}
							error={!!formErrors.phone}
							helperText={formErrors.phone}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Phone color='action' />
									</InputAdornment>
								),
							}}
							sx={{ mb: 2 }}
						/>
					</>
				);
			case 1:
				return (
					<>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
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
							autoComplete='new-password'
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
											onClick={() => togglePasswordVisibility('password')}
											edge='end'
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{ mb: 2 }}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='confirmPassword'
							label='Confirm Password'
							type={showConfirmPassword ? 'text' : 'password'}
							id='confirmPassword'
							autoComplete='new-password'
							value={formData.confirmPassword}
							onChange={handleInputChange}
							error={!!formErrors.confirmPassword}
							helperText={formErrors.confirmPassword}
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Lock color='action' />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											aria-label='toggle confirm password visibility'
											onClick={() => togglePasswordVisibility('confirm')}
											edge='end'
										>
											{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
							sx={{ mb: 2 }}
						/>
					</>
				);
			case 2:
				return (
					<Box sx={{ textAlign: 'center', py: 2 }}>
						<CheckCircleOutline color='success' sx={{ fontSize: 60, mb: 2 }} />
						<Typography variant='h5' gutterBottom>
							Almost Done!
						</Typography>
						<Typography variant='body1' color='text.secondary' paragraph>
							We have prepared your account with the following details:
						</Typography>

						<Box
							sx={{
								backgroundColor: 'grey.100',
								p: 2,
								borderRadius: 1,
								mb: 3,
								textAlign: 'left',
							}}
						>
							<Grid container spacing={2}>
								<Grid item xs={6}>
									<Typography variant='body2' color='text.secondary'>
										Name:
									</Typography>
									<Typography variant='body1' fontWeight='medium'>
										{formData.firstName} {formData.lastName}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='body2' color='text.secondary'>
										Email:
									</Typography>
									<Typography variant='body1' fontWeight='medium'>
										{formData.email}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant='body2' color='text.secondary'>
										Phone:
									</Typography>
									<Typography variant='body1' fontWeight='medium'>
										{formData.phone}
									</Typography>
								</Grid>
							</Grid>
						</Box>

						<FormControlLabel
							control={
								<Checkbox
									checked={termsAccepted}
									onChange={(e) => setTermsAccepted(e.target.checked)}
									color='primary'
								/>
							}
							label={
								<Typography variant='body2'>
									I agree to the{' '}
									<Link href='#' underline='hover'>
										Terms of Service
									</Link>{' '}
									and{' '}
									<Link href='#' underline='hover'>
										Privacy Policy
									</Link>
								</Typography>
							}
							sx={{ mb: 2 }}
						/>
					</Box>
				);
			default:
				return null;
		}
	};

	return (
		<Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
			<CardContent sx={{ p: 4 }}>
				<Typography
					variant='h4'
					component='h1'
					align='center'
					gutterBottom
					fontWeight='bold'
				>
					Create Account
				</Typography>

				<Typography
					variant='body2'
					color='text.secondary'
					align='center'
					sx={{ mb: 4 }}
				>
					Fill in your details to get started
				</Typography>

				{errorMessage && (
					<Alert severity='error' sx={{ mb: 3 }}>
						{errorMessage}
					</Alert>
				)}

				<Stepper activeStep={activeStep} sx={{ mb: 4 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>

				<Box component='form' onSubmit={handleSubmit} noValidate>
					{renderStepContent(activeStep)}

					<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
						{activeStep > 0 ? (
							<Button onClick={handleBack} sx={{ textTransform: 'none' }}>
								Back
							</Button>
						) : (
							<div></div>
						)}

						<Button
							type='submit'
							variant='contained'
							size='large'
							sx={{
								px: 4,
								py: 1,
								textTransform: 'none',
								fontWeight: 'bold',
							}}
							disabled={isLoading || (activeStep === 2 && !termsAccepted)}
						>
							{isLoading ? (
								<CircularProgress size={24} color='inherit' />
							) : activeStep === steps.length - 1 ? (
								'Complete Registration'
							) : (
								'Continue'
							)}
						</Button>
					</Box>

					{activeStep === 0 && (
						<>
							<Divider sx={{ my: 3 }}>
								<Typography variant='body2' color='text.secondary'>
									OR
								</Typography>
							</Divider>

							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									gap: 2,
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
						</>
					)}

					<Typography
						variant='body2'
						align='center'
						color='text.secondary'
						sx={{ mt: 3 }}
					>
						Already have an account?{' '}
						<Link href='login' underline='hover' fontWeight='bold'>
							Sign In
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
};

export default Register;
