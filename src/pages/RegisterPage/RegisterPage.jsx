import React, { useState } from "react";
import {
	Avatar,
	Button,
	TextField,
	Grid,
	Box,
	Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { validateSchema } from "../../validation/registerValidation";
import normalizeRegister from "./normalizeRegister";

const RegisterPage = () => {
	const [state, setState] = useState({
		inputs: {
			first: "",
			middle: "",
			last: "",
			email: "",
			password: "",
			profilePicture: null,
			phone: "",
			url: "",
			alt: "",
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
			isRegistered: true,
		},
		errors: {},
	});
	const navigate = useNavigate();
	const requiredFields = [
		"first",
		"last",
		"email",
		"password",
		"country",
		"city",
		"street",
		"houseNumber",
		"zip",
	];

	const handleChange = (e) => {
		const { id, value } = e.target;
		setState((prevState) => ({
			...prevState,
			inputs: {
				...prevState.inputs,
				[id]: value,
			},
		}));
	};

	const handleBlur = (e) => {
		const { id } = e.target;
		const value = state.inputs[id];
		if (requiredFields.includes(id)) {
			const validation = validateSchema[id]
				? validateSchema[id]({ [id]: value })
				: null;
			const error =
				validation && validation.error
					? validation.error.details[0].message
					: null;
			setState((prevState) => ({
				...prevState,
				errors: {
					...prevState.errors,
					[id]: error,
				},
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting form...");
		let validationErrors = {};

		for (const key of Object.keys(state.inputs)) {
			if (requiredFields.includes(key) || state.inputs[key]) {
				const validation = validateSchema[key]
					? validateSchema[key]({ [key]: state.inputs[key] })
					: null;
				if (validation && validation.error) {
					validationErrors[key] = validation.error.details[0].message;
				}
			}
		}

		if (Object.keys(validationErrors).length === 0) {
			try {
				const normalizedData = normalizeRegister(state.inputs);
				await axios.post("/users/register", normalizedData);
				navigate(ROUTES.LOGIN);
				console.log("Form submitted successfully!");
			} catch (err) {
				console.error("error from axios", err.response);
			}
		} else {
			console.log("Validation Errors:", validationErrors);
			setState((prevState) => ({ ...prevState, errors: validationErrors }));
			console.log("Form has errors!");
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
			key={id}
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
