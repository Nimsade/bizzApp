import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import CardComponent from "../../components/CardComponent";
import LoginContext from "../../store/loginContext";
import useCardActions from "../../hooks/useCardActions";
import { useSearch } from "../../store/SearchContext";


const HomePage = () => {
	const { login } = useContext(LoginContext);
	const token = login?.token;
	const userId = login?._id;
	const isAdmin = login?.isAdmin;
	const 	isBusiness = login?.isBusiness;
	const { searchQuery } = useSearch();
	const [visibleCards, setVisibleCards] = useState(8);
	const {
		cards,
		handleDeleteCard,
		handleEditCard,
		handleLikeCard,
		handleClickCard,
	} = useCardActions("/cards", token, userId, isAdmin,isBusiness, login);

	useEffect(() => {
	}, [login]);
	if (!cards || cards.length === 0) {
		return <Typography>Could not find any items.</Typography>;
	}

	const filteredCards = cards.filter((card) =>
		card.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<Grid container spacing={2} sx={{ justifyContent: "center" }}>
			<Typography
				variant="h2"
				color=""
				fontFamily={'"Bebas Neue"'}
				sx={{ margin: 3, display: "flex", justifyContent: "center" }}
			>
				Welcome to Shlomo's course cards website!
			</Typography>
			<Typography
				variant="h4"
				color="primary.light"
				fontFamily={'"Bebas Neue"'}
				sx={{
					marginBottom: 3,
					display: "flex",
					justifyContent: "center",
				}}
			>
				Go ahead and enjoy exploring what beautiful cards the whole class made!
			</Typography>

			<Grid container spacing={2} sx={{ justifyContent: "center" }}>
				{filteredCards.slice(0, visibleCards).map((card) => (
					<Grid item lg={3} md={6} xs={12} key={card._id}>
						<CardComponent
							{...card}
							id={card._id}
							onDelete={() => handleDeleteCard(card._id)}
							onEdit={() => handleEditCard(card._id)}
							liked={card.likes?.includes(userId)}
							onLike={() => handleLikeCard(card._id)}
							onImageClick={() => handleClickCard(card._id)}
						/>
					</Grid>
				))}
				{filteredCards.length > visibleCards && (
					<Grid
						item
						xs={12}
						sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
					>
						<Button
							variant="contained"
							onClick={() => setVisibleCards((prev) => prev + 8)}
							sx={{ marginBottom: 3 }}
						>
							Show More Cards
						</Button>
					</Grid>
				)}
			</Grid>
		</Grid>
	);
};

export default HomePage;
