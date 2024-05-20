import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateItemSchema from "../../validation/itemValidation";
import LoginContext from "../../store/loginContext";
import { fromServer, toServer } from "./normalizeEdit";

import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const EditItemPage = () => {
	const [inputsValue, setInputsValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		url: "",
		alt: "",
		state: "",
		country: "",
		city: "",
		street: "",
		houseNumber: "",
		zip: "",
	});
	const [errors, setErrors] = useState({});
	const [isFormValid, setIsFormValid] = useState(false);
	let { id } = useParams();
	const { login } = useContext(LoginContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (!id || !login) {
			navigate("/");
			return;
		}
		axios
			.get(`http://localhost:3030/api/items/${id}`, {
				headers: { Authorization: `Bearer ${login.token}` },
			})
			.then(({ data }) => {
				if (data.user_id !== login._id && !login.isAdmin) {
					navigate("/");
					return;
				}
				setInputsValue(fromServer(data));
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, login, navigate]);

	useEffect(() => {
		const validateForm = () => {
			const newErrors = {};
			let isValid = true;

			Object.keys(inputsValue).forEach((key) => {
				const validation = validateItemSchema[key]({ [key]: inputsValue[key] });
				if (validation.error) {
					newErrors[key] = validation.error.details[0].message;
					isValid = false;
				}
			});

			setErrors(newErrors);
			setIsFormValid(isValid);
		};

		validateForm();
	}, [inputsValue]);

	const handleInputsChange = (e) => {
		setInputsValue((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newErrors = {};
		let isValid = true;

		Object.keys(inputsValue).forEach((key) => {
			const validation = validateItemSchema[key]({ [key]: inputsValue[key] });
			if (validation.error) {
				newErrors[key] = validation.error.details[0].message;
				isValid = false;
			}
		});

		setErrors(newErrors);

		if (!isValid) {
			alert("Please correct the errors in the form before submitting.");
			return;
		}

		try {
			await axios.put(`/items/${id}`, toServer(inputsValue));
			toast.success("Item updated Successfully", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			navigate(ROUTES.MY_ITEMS);
		} catch (error) {
			console.error("Error updating item:", error);
			alert("Failed to update the item. Please try again.");
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
				Edit your item
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
				<Grid container spacing={2}>
					{Object.keys(inputsValue).map((keyName) => (
						<TextInputComponent
							key={keyName}
							id={keyName}
							label={keyName}
							value={inputsValue[keyName]}
							onChange={handleInputsChange}
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
					Edit
				</Button>
			</Box>
		</Box>
	);
};

export default EditItemPage;
