import React from "react";
import { Box, Container, Typography } from "@mui/material";

const SandBoxPage = () => {
	return (
		<Container component="main" maxWidth="md">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h1" color="error">
					You are the admin!!
				</Typography>
			</Box>
		</Container>
	);
};

export default SandBoxPage;
