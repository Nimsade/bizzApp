import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ItemComponent from "../components/ItemComponent";
import LoginContext from "../store/loginContext";
import axios from "axios";
import useItemActions from "../hooks/useItemActions";
import { useSearch } from "../store/SearchContext";

const FavoriteItemsPage = () => {
	const { login } = useContext(LoginContext);
	const [likedItems, setLikedItems] = useState([]);
	const { searchQuery } = useSearch();
	const {
		
		handleDeleteItem,
		handleEditItem,
		handleLikeItem,
		handlePhoneItem,
	} = useItemActions(login.token, login._id, login.isAdmin);

	const filteredFavorites = likedItems.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		const fetchLikedItems = async () => {
			const config = { headers: { Authorization: `Bearer ${login.token}` } };
			try {
				const response = await axios.get(
					`http://localhost:3030/api/items`,
					config
				);
				const items = response.data;

				const filteredItems = items.filter((item) =>
					item.likes.includes(login._id)
				);
				setLikedItems(filteredItems);
			} catch (error) {
				console.error("Error fetching liked items:", error);
			}
		};
		fetchLikedItems();
	}, [login.token, login._id]);
	if (!likedItems.length) {
		return <Typography>No liked items found.</Typography>;
	}

	return (
		<Grid container spacing={2} sx={{ justifyContent: "center" }}>
			{filteredFavorites.map((item) => (
				<Grid item lg={3} md={6} xs={12} key={item._id}>
					<ItemComponent
						{...item}
						onDelete={() => handleDeleteItem(item._id)}
						onEdit={() => handleEditItem(item._id)}
						liked={true}
						onLike={() => handleLikeItem(item._id)}
						onPhone={() => {
							handlePhoneItem();
						}}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default FavoriteItemsPage;
