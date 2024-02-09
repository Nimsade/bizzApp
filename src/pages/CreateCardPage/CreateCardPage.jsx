import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import TextInputComponent from "../../components/TextInputComponent";
import validateCardSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";

const CreateCardPage = () => {
	const [inputsValue, setInputsValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		web: "",
		image: {
			url: "",
			alt: "",
		},
		address: {
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
		},
	});

	const [errors, setErrors] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		country: "",
		city: "",
		street: "",
		houseNumber: "",
	});

	const { login } = useContext(LoginContext);
	const navigate = useNavigate();
 const [isFormValid, setIsFormValid] = useState(false);

   useEffect(() => {
			const allFieldsFilled = Object.values(inputsValue).every(
				(value) =>
					value &&
					(typeof value === "object"
						? Object.values(value).every((v) => v)
						: true)
			);
			const noErrors = Object.values(errors).every((error) => !error);

			setIsFormValid(allFieldsFilled && noErrors);
		}, [inputsValue, errors]);

		const handleSubmit = async (e) => {
			e.preventDefault();
			if (!isFormValid) {
				return;
			}
			try {
				await axios.post("/cards", inputsValue);
				navigate(ROUTES.MY_CARDS);
			} catch (error) {
				console.error("Error creating card:", error);
			}
		};
	const handleInputsChange = (e) => {
		const { id, value } = e.target;
		if (id in inputsValue.address) {
			setInputsValue((prev) => ({
				...prev,
				address: {
					...prev.address,
					[id]: value,
				},
			}));
		} else if (id in inputsValue.image) {
			setInputsValue((prev) => ({
				...prev,
				image: {
					...prev.image,
					[id]: value,
				},
			}));
		} else {
			setInputsValue((prev) => ({
				...prev,
				[id]: value,
			}));
		}
	}
	const handleInputsBlur = (e) => {
		const fieldId = e.target.id;
		const fieldValue = e.target.value;
		const validate = validateCardSchema[fieldId];

		if (validate) {
			const { error } = validate({ [fieldId]: fieldValue });
			if (error) {
				setErrors((prev) => ({
					...prev,
					[fieldId]: error.details[0].message,
				}));
			} else {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[fieldId];
					return newErrors;
				});
			}
		}
	};
	return (
		<Box
			sx={{
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
				<BrushIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Create a new card
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					{Object.keys(inputsValue)
						.filter((key) => key !== "address" && key !== "image")
						.map((keyName) => (
							<TextInputComponent
								key={keyName}
								id={keyName}
								label={keyName}
								value={inputsValue[keyName]}
								onChange={handleInputsChange}
								onBlur={handleInputsBlur}
								errors={errors[keyName]}
							/>
						))}
					{Object.keys(inputsValue.image).map((keyName) => (
						<TextInputComponent
							key={"image-" + keyName}
							id={keyName}
							label={keyName}
							value={inputsValue.image[keyName]}
							onChange={handleInputsChange}
							onBlur={handleInputsBlur}
							errors={errors[keyName]}
						/>
					))}
					{Object.keys(inputsValue.address).map((keyName) => (
						<TextInputComponent
							key={"address-" + keyName}
							id={keyName}
							label={keyName}
							value={inputsValue.address[keyName]}
							onChange={handleInputsChange}
							onBlur={handleInputsBlur}
							errors={errors[keyName]}
						/>
					))}
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					disabled={!isFormValid} 
				>
					Create
				</Button>
			</Box>
		</Box>
	);
};

export default CreateCardPage;
