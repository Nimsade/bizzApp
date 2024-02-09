import Paper from "@mui/material/Paper";
import FooterLinks from "./FooterLinks";

const FooterComponent = () => {
	return (
		<Paper
			elevation={4}
			sx={{
				position: "sticky",
			}}
		>
			<FooterLinks />
		</Paper>
	);
};

export default FooterComponent;
