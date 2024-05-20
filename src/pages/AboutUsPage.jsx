import React from "react";
import { Box, Container, Typography } from "@mui/material";

const AboutUsPage = () => {
	return (
		<Container sx={{ padding: 3 }}>
			<Box sx={{ textAlign: "center", marginBottom: 4 }}>
				<Typography
					variant="h2"
					color="#25703a"
					fontFamily={'"Bebas Neue"'}
					sx={{ textAlign: "center" }}
				>
					About Us
				</Typography>
			</Box>
			<Typography
				variant="h4"
				color="error"
				fontFamily={'"Bebas Neue"'}
				sx={{
					marginBottom: 5,
					display: "flex",
					justifyContent: "center",
					textAlign: "center",
				}}
			>
				Welcome to our second-hand clothing store! We are dedicated to providing
				you with a unique and sustainable shopping experience. Our store offers
				a wide range of high-quality, pre-loved clothing items at affordable
				prices.
			</Typography>
			<Typography
				variant="body1"
				paragraph
				fontFamily={'"Bebas Neue"'}
				sx={{ fontSize: "1.5rem" }}
			>
				Our mission is to promote sustainable fashion by giving pre-owned
				clothing a new lease of life. By shopping with us, you are not only
				finding great deals but also contributing to a more eco-friendly and
				sustainable future.
			</Typography>
			<Typography
				variant="body1"
				paragraph
				fontFamily={'"Bebas Neue"'}
				sx={{ fontSize: "1.5rem" }}
			>
				Here’s how to navigate our site:
			</Typography>
			<Typography
				variant="body1"
				component="ul"
				paragraph
				fontFamily={'"Bebas Neue"'}
				sx={{ fontSize: "1.5rem" }}
			>
				<li>Browse through our collection of second-hand clothing items.</li>
				<li>Use the search bar on the home page to find specific items.</li>
				<li>
					Create an account to save your favorite items and view your order
					history.
				</li>
				<li>
					Add items to your cart and proceed to checkout to purchase them.
				</li>
				<li>Contact us through the footer for any inquiries or support.</li>
			</Typography>
			<Typography
				variant="body1"
				paragraph
				fontFamily={'"Bebas Neue"'}
				sx={{ fontSize: "1.5rem" }}
			>
				We hope you enjoy your shopping experience with us. Thank you for
				supporting sustainable fashion!
			</Typography>
		</Container>
	);
};
export default AboutUsPage;
