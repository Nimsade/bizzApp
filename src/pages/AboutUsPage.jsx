import React from "react";
import { Box, Container, Typography } from "@mui/material";

const AboutUsPage = () => {
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
				<Typography component="h1" variant="h1">
					About This Site
				</Typography>
				<Typography variant="h4" sx={{ mt: 2 }}>
					This website is designed to showcase various cards created by users.
					It provides a platform for users to interact with, create, and manage
					their cards effectively. Here are some of the features you can enjoy
					on our site:
				</Typography>
				<Typography variant="h6" sx={{ mt:3 , textAlign: "left" }}>
					- Create new cards with custom content.
					<br />
					- Edit or delete your existing cards.
					<br />
					- Like cards created by other users.
					<br />- Switch between Light and Dark mode for a personalized
					experience.
				</Typography>
				<Typography variant="h4" sx={{ mt: 5 }}>
					To get started, simply navigate to the homepage and explore the cards.
					If you wish to create your own cards, please sign up or log in to
					access the full range of features.
				</Typography>
			</Box>
		</Container>
	);
};

export default AboutUsPage;
