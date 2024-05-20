
import Paper from "@mui/material/Paper";
import FooterLinks from "./FooterLinks";
import { useTheme } from "@mui/material/styles";

const FooterComponent = () => {
	const theme = useTheme(); 

	return (
		<Paper
			elevation={4}
			sx={{
				position: "sticky",
				bottom: 0,
				zIndex: theme.zIndex.appBar,
				backgroundColor: theme.palette.primary.main, 
				color: theme.palette.primary.contrastText,
			}}
		>
			<FooterLinks />
		</Paper>
	);
};

export default FooterComponent;
