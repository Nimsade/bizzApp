import {
	Grid,
	Typography,
	TextField,
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
		const handleShowCard = async () => {
			try {
				

				const requestUrl = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`;
				const { data } = await axios.get(requestUrl); 
				setDataFromApi(data);
			} catch (error) {
				console.error("Error fetching card details:", error);
				
			}
		};
		handleShowCard();
	}, [id]);

	return (
		<Box>
			<Typography variant="h3" align={"center"} color="initial" sx={{ m: 5 }}>
				Welcome to {dataFromApi?.title}
			</Typography>
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
						sx={{ borderRadius: "20px", mb: 2, width: "80%",alignItems: "center" }}
					>
						<CardActionArea>
							<CardMedia
								component="img"
								image={dataFromApi?.image?.url}
								alt="img"
								height={200}
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
									Card number:
								</Typography>
								{dataFromApi?.bizNumber}
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
					<Typography sx={{ m: 3 }} variant="h4">
						Come visit us and we will start a new journey together
					</Typography>
					<GoogleMap city={dataFromApi?.address?.city} />
				</Box>
			</Grid>
		</Box>
	);
};

export default ShowBizPage;
