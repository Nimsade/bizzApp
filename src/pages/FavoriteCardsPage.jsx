import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import LoginContext from "../store/loginContext";
import axios from "axios";
import useCardActions from "../hooks/useCardActions";
import { useSearch } from "../store/SearchContext";

const FavoriteCardsPage = () => {
	const { login } = useContext(LoginContext);
	const [likedCards, setLikedCards] = useState([]);
	const { searchQuery } = useSearch();
	const {
		cards,
		handleDeleteCard,
		handleEditCard,
		handleLikeCard,
		handlePhoneCard,
	} = useCardActions(login.token, login._id, login.isAdmin);

	const filteredFavorites = likedCards.filter((card) =>
		card.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		const fetchLikedCards = async () => {
			const config = { headers: { Authorization: `Bearer ${login.token}` } };
			try {
				const response = await axios.get(
					`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`,
					config
				);
				const cards = response.data;
				
				const filteredCards = cards.filter((card) =>
					card.likes.includes(login._id)
				);
				setLikedCards(filteredCards);
			} catch (error) {
				console.error("Error fetching liked cards:", error);
			}
		};
		fetchLikedCards();
	}, [login.token, login._id]); 
	if (!likedCards.length) {
		return <Typography>No liked cards found.</Typography>;
	}

	return (
		<Grid container spacing={2} sx={{ justifyContent: "center" }}>
			{filteredFavorites.map((card) => (
				<Grid item lg={3} md={6} xs={12} key={card._id}>
					<CardComponent
						{...card}
						onDelete={() => handleDeleteCard(card._id)}
						onEdit={() => handleEditCard(card._id)}
						liked={true} 
						onLike={() => handleLikeCard(card._id)}
						onPhone={() => {
							handlePhoneCard();
						}}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default FavoriteCardsPage;
