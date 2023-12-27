import { Stack, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const NotFoundPage = () => {
	return (
		<Stack
			m={2}
			spacing={2}
			divider={<Divider flexItem orientation="vertical" />}
		>
			<Typography variant="h1" color="initial">
				Error 404
			</Typography>
			<Typography variant="h3" color="initial">
				Page not found..
			</Typography>
			<Divider></Divider>
			<Typography variant="body1" color="initial">
				The requested URL was not found
			</Typography>
			<Link to={ROUTES.HOME}>click here to return to the home page</Link>
		</Stack>
	);
};
export default NotFoundPage;
