import {
	Card,
	CardHeader,
	CardContent,
	Typography,
	CardActionArea,
	CardMedia,
	Divider,
	IconButton,
	Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ItemComponent = ({
	title,
	subtitle,
	image,
	url,
	alt,
	phone,
	address,
	price,
	liked,
	id,
	onDelete,
	onEdit,
	onPhone,
	onLike,
	onImageClick,
}) => {
	const handleDeleteItem = () => {
		onDelete(id);
	};
	const handleEditItem = () => {
		onEdit(id);
	};
	const handlePhoneItem = () => {
		onPhone();
	};
	const handleLikeItem = () => {
		onLike(id);
	};
	const handleClickItem = () => {
		onImageClick(id);
	};

	return (
		<Card
			square
			raised
			sx={{ boxShadow: "5px 5px 15px rgba(144, 238, 144, 0.5)" }}
		>
			<CardActionArea onClick={handleClickItem}>
				<Box sx={{ boxShadow: 10 }}>
					{
						<CardMedia
							component="img"
							image={image.url}
							alt={alt}
							height={200}
							sx={{ objectFit: "contain" }}
						/>
					}
				</Box>
			</CardActionArea>
			<CardHeader title={title} subheader={subtitle}></CardHeader>
			<Divider></Divider>
			<CardContent>
				<Typography>
					<Typography component="span" fontWeight={700}>
						Phone:
					</Typography>
					{phone}
				</Typography>
				<Typography>
					<Typography component="span" fontWeight={700}>
						Address:
					</Typography>
					{address?.city}
				</Typography>
				<Typography>
					<Typography component="span" fontWeight={700}>
						Price:
					</Typography>
					{price}
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box>
						<IconButton onClick={handleDeleteItem}>
							<DeleteIcon />
						</IconButton>
						<IconButton onClick={handleEditItem}>
							<ModeIcon />
						</IconButton>
					</Box>
					<Box>
						<IconButton onClick={handlePhoneItem}>
							<LocalPhoneIcon />
						</IconButton>
						<IconButton onClick={handleLikeItem}>
							<FavoriteIcon color={liked ? "error" : "inherit"} />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default ItemComponent;
