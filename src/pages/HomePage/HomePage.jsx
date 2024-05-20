import React, { useContext, useEffect, useState } from "react";
import {
	Grid,
	Typography,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Paper,
	TableContainer,
	Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ViewListIcon from "@mui/icons-material/ViewList";
import ItemComponent from "../../components/ItemComponent";
import LoginContext from "../../store/loginContext";
import useItemActions from "../../hooks/useItemActions";
import { useSearch } from "../../store/SearchContext";

const HomePage = () => {
	const { login } = useContext(LoginContext);
	const token = login?.token;
	const userId = login?._id;
	const { searchQuery } = useSearch();
	const [visibleItems, setVisibleItems] = useState(8);
	const [isListDisplay, setIsListDisplay] = useState(false);

	const {
		items,
		handleDeleteItem,
		handleEditItem,
		handleLikeItem,
		handlePhoneItem,
		handleClickItem,
	} = useItemActions(
		"/items",
		token,
		userId,
		login?.isAdmin,
		login?.isRegistered,
		login
	);

	useEffect(() => {}, [login]);
	if (!items || items.length === 0) {
		return <Typography>Could not find any items.</Typography>;
	}

	const filteredItems = items.filter((item) =>
		item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleToggleView = () => setIsListDisplay((prev) => !prev);

	const StyledTable = styled(Table)({
		hover: "rgba(5, 5, 5, 0.3)",
	});

	const StyledTableRow = styled(TableRow)(({ theme }) => ({
		backgroundColor: theme.palette.background.paper,
		boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
		margin: "16px 0",
		"&:last-child td": {
			borderBottom: 0,
		},
		"&:hover": {
			backgroundColor: "rgba(144, 238, 144, 0.5)",
		},
	}));

	const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
		backgroundColor: "rgba(144, 238, 144, 0.5)",
		fontSize: "1.2rem",
		fontWeight: "bold",
	}));

	return (
		<Grid
			container
			spacing={2}
			justifyContent="flex-start"
			alignItems="flex-start"
			sx={{ margin: 3 }}
		>
			<Grid item>
				<Button
					onClick={handleToggleView}
					sx={{ textAlign: "left", color: "#c91212" }}
				>
					<ViewListIcon />
				</Button>
			</Grid>

			<Grid
				item
				xs={12}
				container
				justifyContent="space-between"
				alignItems="center"
			>
				<Typography
					variant="h2"
					color="#25703a"
					fontFamily={'"Bebas Neue"'}
					sx={{ textAlign: "center" }}
				>
					Welcome to Recycloset: Your Sustainable Fashion Destination
				</Typography>
				<Box sx={{ width: 48, height: 48 }} />
			</Grid>
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
				Discover the joy of sustainable fashion with our curated collection of
				second-hand treasures. Buy and sell pre-loved clothes with ease, and
				join our movement towards an eco-conscious wardrobe. Style doesn't get
				greener than this!
			</Typography>
			{isListDisplay ? (
				<StyledTable>
					<TableContainer
						component={Paper}
						sx={{
							boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
							borderRadius: "4px",
							overflow: "hidden",
							margin: "15px",
						}}
					>
						<Table sx={{ borderCollapse: "separate", borderSpacing: "0 15px" }}>
							<TableHead>
								<TableRow>
									<StyledHeaderCell>Title</StyledHeaderCell>
									<StyledHeaderCell>Phone</StyledHeaderCell>
									<StyledHeaderCell>Address</StyledHeaderCell>
									<StyledHeaderCell>Price</StyledHeaderCell>
									<StyledHeaderCell>Actions</StyledHeaderCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{filteredItems.slice(0, visibleItems).map((item) => (
									<StyledTableRow
										key={item._id}
										onClick={() => handleClickItem(item._id)}
										sx={{
											cursor: "pointer",
											borderRadius: "8px",
											overflow: "hidden",
											marginBottom: "10px",
											"& > td": {
												borderBottom: "unset",
											},
										}}
									>
										<TableCell>{item.title}</TableCell>
										<TableCell>{item.phone}</TableCell>
										<TableCell>{item.address.city}</TableCell>
										<TableCell>${item.price}</TableCell>
										<TableCell>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													handleEditItem(item._id);
												}}
												sx={{ color: "#c91212" }}
											>
												Edit
											</Button>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteItem(item._id);
												}}
												sx={{ color: "#c91212" }}
											>
												Delete
											</Button>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													handleLikeItem(item._id);
												}}
												sx={{ color: "#c91212" }}
											>
												Like
											</Button>
											<Button
												onClick={(e) => {
													e.stopPropagation();
													handlePhoneItem(item._id);
												}}
												sx={{ color: "#c91212" }}
											>
												Call
											</Button>
										</TableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</StyledTable>
			) : (
				<Grid container spacing={2} sx={{ justifyContent: "center" }}>
					{filteredItems.slice(0, visibleItems).map((item) => (
						<Grid item lg={3} md={6} xs={12} key={item._id}>
							<ItemComponent
								{...item}
								onDelete={() => handleDeleteItem(item._id)}
								onEdit={() => handleEditItem(item._id)}
								liked={item.likes?.includes(userId)}
								onLike={() => handleLikeItem(item._id)}
								onPhone={() => handlePhoneItem(item._id)}
								onImageClick={() => handleClickItem(item._id)}
							/>
						</Grid>
					))}
				</Grid>
			)}
			{filteredItems.length > visibleItems && (
				<Button
					onClick={() => setVisibleItems((prev) => prev + 8)}
					color="error"
					sx={{
						margin: "auto",
						display: "block",
						marginTop: 3,
						fontSize: "1.3rem",
						"&:hover": {
							backgroundColor: "#f67280",
							color: "white", // Change to your desired hover color
						},
					}}
				>
					Show More Items
				</Button>
			)}
		</Grid>
	);
};

export default HomePage;
