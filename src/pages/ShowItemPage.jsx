import {
	Grid,
	Typography,
	CardActionArea,
	Card,
	CardMedia,
	CardHeader,
	Divider,
	CardContent,
	Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GoogleMap from "../components/GoogleMap";

const ShowBizPage = () => {
	const [dataFromApi, setDataFromApi] = useState({});
	let { id } = useParams();

	useEffect(() => {
		const handleShowItem = async () => {
			try {
				const requestUrl = `http://localhost:3030/api/items/${id}`;
				const { data } = await axios.get(requestUrl);
				setDataFromApi(data);
			} catch (error) {
				console.error("Error fetching item details:", error);
			}
		};
		handleShowItem();
	}, [id]);

	return (
		<Box>
			<Grid
				container
				spacing={2}
				sx={{
					display: "flex",
					flexDirection: "column",
					mt: 7,
				}}
			>
				<Grid
					item
					lg={12}
					md={12}
					xs={12}
					sx={{
						display: "flex",
						flexDirection: "column",
						mt: 7,
					}}
				>
					<Card
						square
						raised
						sx={{
							borderRadius: "20px",
							mb: 2,
							ml: 10,
							width: "40%",
							alignItems: "center",
						}}
					>
						<CardActionArea>
							<CardMedia
								component="img"
								image={dataFromApi?.image?.url}
								alt="img"
								height={200}
								sx={{ objectFit: "contain" }}
							/>
						</CardActionArea>
						<CardHeader
							title={dataFromApi?.title}
							subheader={dataFromApi?.subtitle}
						/>
						<Divider></Divider>
						<CardContent>
							<Typography>
								<Typography component="span" fontWeight={700}>
									Phone:
								</Typography>
								{dataFromApi?.phone}
							</Typography>
							<Typography>
								<Typography component="span" fontWeight={700}>
									Address:
								</Typography>
								{dataFromApi?.address?.country}, {dataFromApi?.address?.city}
							</Typography>
							<Typography>
								<Typography component="span" fontWeight={700}>
									Price:
								</Typography>
								{dataFromApi?.price}
							</Typography>
							<Typography>
								<Typography component="span" fontWeight={700}>
									Description:
								</Typography>
								{dataFromApi?.description}
							</Typography>
							<Typography>
								<Typography component="span" fontWeight={700}>
									Email:
								</Typography>
								{dataFromApi?.email}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography sx={{ m: 3, textAlign: "center" }} variant="h4">
						Meet me here
					</Typography>
					<GoogleMap city={dataFromApi?.address?.city} />
				</Box>
			</Grid>
		</Box>
	);
};

export default ShowBizPage;
