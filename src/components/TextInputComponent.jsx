import { Grid, TextField, Alert } from "@mui/material";

const TextInputComponent = ({
	xs = 6,
	id,
	name,
	label,
	autoFocus = false,
	value,
	onChange,
	onBlur,
	errors,
}) => {
	return (
		<Grid item xs={xs}>
			<TextField
				name={name}
				required
				fullWidth
				id={id}
				label={label}
				autoFocus={autoFocus}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{errors && <Alert severity="error">{errors}</Alert>}
		</Grid>
	);
};

export default TextInputComponent;
