import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import axios from "axios";
import TextInputComponent from "../../components/TextInputComponent";
import validateCardSchema from "../../validation/cardValidation";
import LoginContext from "../../store/loginContext";
import { fromServer, toServer } from "./normalizeEdit";

import { toast } from "react-toastify";
import ROUTES from "../../routes/ROUTES";

const EditCardPage = () => {
	const [inputsValue, setInputsValue] = useState({
		title: "",
		subtitle: "",
		description: "",
		phone: "",
		email: "",
		web: "",
		url: "",
		alt: "",
		state: "",
		country: "",
		city: "",
		street: "",
		houseNumber: "",
		zip: "",
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
			.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
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
		const isValid = Object.keys(inputsValue).every((key) => {
			if (inputsValue[key] === "") {
				return true;
			}
			const validation = validateCardSchema[key]({ [key]: inputsValue[key] });
			return !validation.error;
		});
		setIsFormValid(isValid);
	}, [inputsValue]);

	const handleInputsChange = (e) => {
		setInputsValue((prev) => ({
			...prev,
			[e.target.id]: e.target.value,
		}));
	};

	const handleInputsBlur = (e) => {
		const validation = validateCardSchema[e.target.id]({
			[e.target.id]: e.target.value,
		});
		if (validation.error) {
			setErrors((prev) => ({
				...prev,
				[e.target.id]: validation.error.details[0].message,
			}));
		} else {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[e.target.id];
				return newErrors;
			});
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(errors).length > 0) {
			alert("Please correct the errors in the form before submitting.");
			return;
		}
		try {
			await axios.put(`/cards/${id}`, toServer(inputsValue));
			toast.success("Card updated Successfully", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			navigate(ROUTES.MY_CARDS);
		} catch (error) {
			console.error("Error updating card:", error);
			alert("Failed to update the card. Please try again.");
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
				Edit your card
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
					Edit
				</Button>
			</Box>
		</Box>
	);
};
export default EditCardPage;
