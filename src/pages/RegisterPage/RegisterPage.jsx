import React, { useState } from "react";
import {
	Avatar,
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	Grid,
	Box,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { validateSchema } from "../../validation/registerValidation";
const RegisterPage = () => {
	const [state, setState] = useState({
		inputs: {
			first: "",
			middle: "",
			last: "",
			email: "",
			password: "",
			phone: "",
			url: "",
			alt: "",
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
			isBusiness: false,
		},
		errors: {},
	});
	const navigate = useNavigate();
	const handleChange = (e) => {
		const { id, value, checked, type } = e.target;
		setState((prevState) => ({
			...prevState,
			inputs: {
				...prevState.inputs,
				[id]: type === "checkbox" ? checked : value,
			},
		}));
	};
	const handleBlur = (e) => {
		const { id } = e.target;
		const value = state.inputs[id];
		const error = validateSchema[id]
			? validateSchema[id]({ [id]: value }).error
			: null;
		setState((prevState) => ({
			...prevState,
			errors: {
				...prevState.errors,
				[id]: error ? error.details[0].message : null,
			},
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = Object.keys(state.inputs).reduce((acc, key) => {
			const validation = validateSchema[key]
				? validateSchema[key]({ [key]: state.inputs[key] }).error
				: null;
			if (validation) acc[key] = validation.details[0].message;
			return acc;
		}, {});

		if (Object.keys(validationErrors).length === 0) {
			try {
				await axios.post("/users", state.inputs);
				navigate(ROUTES.LOGIN);
			} catch (err) {
				console.error("error from axios", err);
			}
		} else {
			setState((prevState) => ({ ...prevState, errors: validationErrors }));
		}
	};
	const renderTextField = (
		id,
		label,
		required = false,
		type = "text",
		autoComplete = ""
	) => (
		<Grid
			item
			xs={12}
			sm={id === "first" || id === "last" || id === "middle" ? 4 : 12}
		>
			<TextField
				required={required}
				fullWidth
				id={id}
				label={label}
				name={id}
				autoComplete={autoComplete}
				type={type}
				value={state.inputs[id]}
				onChange={handleChange}
				onBlur={handleBlur}
				error={!!state.errors[id]}
				helperText={state.errors[id]}
			/>
		</Grid>
	);

	return (
		<Box
			sx={{
				mt: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					{[
						"first",
						"middle",
						"last",
						"email",
						"password",
						"phone",
						"url",
						"alt",
						"state",
						"country",
						"city",
						"street",
						"houseNumber",
						"zip",
					].map((field) =>
						renderTextField(
							field,
							field.charAt(0).toUpperCase() + field.slice(1),
							[
								"first",
								"last",
								"email",
								"password",
								"country",
								"city",
								"street",
								"houseNumber",
								"zip",
							].includes(field),
							field === "password" ? "password" : "text",
							field
						)
					)}
					<Grid item xs={12}>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									id="isBusiness"
									checked={state.inputs.isBusiness}
									onChange={handleChange}
								/>
							}
							label="Business Account"
						/>
					</Grid>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={Object.values(state.errors).some((error) => error)}
				>
					Sign Up
				</Button>
				<Grid container justifyContent="flex-end">
					<Grid item>
						<Link to={ROUTES.LOGIN} variant="body2">
							Already have an account? Sign in
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
export default RegisterPage;
