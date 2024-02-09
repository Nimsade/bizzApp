import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import LoginContext from "../store/loginContext";
import useCardActions from "../hooks/useCardActions";
import { useSearch } from "../store/SearchContext";

const MyCardsPage = () => {
	const { login } = useContext(LoginContext);
	const { searchQuery } = useSearch();
	const url = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`;
	const {
		cards,
		handleDeleteCard,
		handleEditCard,
		handleLikeCard,
		handlePhoneCard,
	} = useCardActions(url, login?.token);

	const filteredCards = cards.filter((card) =>
		card.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (!filteredCards.length) {
		return <Typography>No cards found</Typography>;
	}

	return (
		<Grid container spacing={2} sx={{ justifyContent: "center" }}>
			{filteredCards.map((card) => (
				<Grid item lg={3} md={6} xs={12} key={card._id}>
					{" "}
					<CardComponent
						{...card}
						onDelete={() => handleDeleteCard(card._id)}
						onEdit={() => handleEditCard(card._id)}
						liked={card.likes?.includes(login?._id)} 
						onLike={() => handleLikeCard(card._id)}
						onPhone={() => handlePhoneCard(card._id)}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default MyCardsPage;
