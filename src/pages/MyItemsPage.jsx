import React, { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import ItemComponent from "../components/ItemComponent";
import LoginContext from "../store/loginContext";
import useItemActions from "../hooks/useItemActions";
import { useSearch } from "../store/SearchContext";

const MyItemsPage = () => {
	const { login } = useContext(LoginContext);
	const { searchQuery } = useSearch();
	const url = `http://localhost:3030/api/items/my-items`;
	const {
		items,
		handleDeleteItem,
		handleEditItem,
		handleLikeItem,
		handlePhoneItem,
	} = useItemActions(url, login?.token);

	const filteredItems = items.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (!filteredItems.length) {
		return <Typography>No items found</Typography>;
	}

	return (
		<Grid container spacing={2} sx={{ justifyContent: "center" }}>
			{filteredItems.map((item) => (
				<Grid item lg={3} md={6} xs={12} key={item._id}>
					{" "}
					<ItemComponent
						{...item}
						onDelete={() => handleDeleteItem(item._id)}
						onEdit={() => handleEditItem(item._id)}
						liked={item.likes?.includes(login?._id)}
						onLike={() => handleLikeItem(item._id)}
						onPhone={() => handlePhoneItem(item._id)}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default MyItemsPage;
