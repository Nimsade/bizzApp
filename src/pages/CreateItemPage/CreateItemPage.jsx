import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Avatar,
	Typography,
	Grid,
	Button,
	Select,
	MenuItem,
} from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import TextInputComponent from "../../components/TextInputComponent";
import validateItemSchema from "../../validation/itemValidation";
import LoginContext from "../../store/loginContext";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateItemPage = () => {
	const [inputsValue, setInputsValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		price: "",
		typeOfItem: "",
		email: "",
		image: { url: "", alt: "" },
		address: {
			state: "",
			country: "",
			city: "",
			street: "",
			houseNumber: "",
			zip: "",
		},
	});

	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const [isFormValid, setIsFormValid] = useState(false);
	let { id } = useParams();
	const { login } = useContext(LoginContext);

	useEffect(() => {
		const allFieldsFilled = Object.values(inputsValue).every((value) => {
			if (typeof value === "object") {
				return Object.values(value).every((v) => v !== "");
			}
			return value !== "";
		});
		const noErrors = Object.values(errors).every((error) => error === "");

		setIsFormValid(allFieldsFilled && noErrors);
	}, [inputsValue, errors]);

	const handleInputsChange = (e) => {
		const { name, value } = e.target;
		const [parentKey, childKey] = name.includes(".") ? name.split(".") : [name];

		setInputsValue((prev) => ({
			...prev,
			[parentKey]: childKey ? { ...prev[parentKey], [childKey]: value } : value,
		}));
	};

	const handleInputsBlur = (e) => {
		const { name, value } = e.target;
		const validate = validateItemSchema[name];
		if (validate) {
			const { error } = validate({ [name]: value });
			if (error) {
				setErrors((prev) => ({
					...prev,
					[name]: error.details[0].message,
				}));
			} else {
				setErrors((prev) => ({
					...prev,
					[name]: "",
				}));
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isFormValid) {
			return;
		}

		try {
			await axios.post("/items", inputsValue);
			navigate(ROUTES.MY_ITEMS);
		} catch (error) {
			console.error("Error creating item:", error);
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
				Create a new item
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					{Object.keys(inputsValue)
						.filter((key) => !["address", "image", "typeOfItem"].includes(key))
						.map((keyName) => (
							<TextInputComponent
								key={keyName}
								id={keyName}
								name={keyName}
								label={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
								value={inputsValue[keyName]}
								onChange={handleInputsChange}
								onBlur={handleInputsBlur}
								errors={errors[keyName]}
							/>
						))}
					<Grid item xs={12} sm={6}>
						<Select
							fullWidth
							value={inputsValue.typeOfItem}
							onChange={handleInputsChange}
							displayEmpty
							name="typeOfItem"
							renderValue={(value) => (!value ? "Select Type of Item" : value)}
						>
							<MenuItem value="" disabled>
								Select Type of Item
							</MenuItem>
							<MenuItem value="General">General</MenuItem>
							<MenuItem value="Pants">Pants</MenuItem>
							<MenuItem value="Shirt">Shirt</MenuItem>

							<MenuItem value="Hat">Hat</MenuItem>
							<MenuItem value="Accessories">Accessories</MenuItem>
							<MenuItem value="Shoes">Shoes</MenuItem>
							<MenuItem value="Winter wear">Winter wear</MenuItem>
						</Select>
					</Grid>
					{Object.entries(inputsValue.image).map(([keyName, value]) => (
						<TextInputComponent
							key={"image." + keyName}
							id={"image." + keyName}
							name={"image." + keyName}
							label={keyName}
							value={value}
							onChange={handleInputsChange}
							onBlur={handleInputsBlur}
							errors={errors[keyName]}
						/>
					))}
					{Object.keys(inputsValue.address).map((keyName) => (
						<TextInputComponent
							key={"address-" + keyName}
							id={"address-" + keyName}
							name={`address.${keyName}`}
							label={keyName.charAt(0).toUpperCase() + keyName.slice(1)}
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

export default CreateItemPage;
