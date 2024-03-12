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

const CardComponent = ({
	title,
	subtitle,
	image,
	url,
	alt,
	phone,
	address,
	bizNumber,
	liked,
	id,
	onDelete,
	onEdit,
	onPhone,
	onLike,
	onImageClick,
}) => {
	const handleDeleteCard = () => {
		onDelete(id);
	};
	const handleEditCard = () => {
		onEdit(id);
	};
	const handlePhoneCard = () => {
		onPhone();
	};
	const handleLikeCard = () => {
		onLike(id);
	};
	const handleClickCard = () => {
		onImageClick(id);
	};

	return (
		<Card square raised>
			<CardActionArea onClick={handleClickCard}>
				{<CardMedia component="img" image={image.url} alt={alt} height={200} />}
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
						Card number:
					</Typography>
					{bizNumber}
				</Typography>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<Box>
						<IconButton onClick={handleDeleteCard}>
							<DeleteIcon />
						</IconButton>
						<IconButton onClick={handleEditCard}>
							<ModeIcon />
						</IconButton>
					</Box>
					<Box>
						<IconButton onClick={handlePhoneCard}>
							<LocalPhoneIcon />
						</IconButton>
						<IconButton onClick={handleLikeCard}>
							<FavoriteIcon color={liked ? "error" : "inherit"} />
						</IconButton>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

export default CardComponent;
