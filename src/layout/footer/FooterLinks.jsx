import Box from "@mui/material/Box";
import {
	alwaysLinksFooter,
	loggedInLinksFooter,
	bizLinksFooter,
} from "../myLinks";
import NavLinkComponent from "../header/NavLinkComponent";
import { useContext } from "react";
import LoginContext from "../../store/loginContext";
import { useTheme } from "@mui/material/styles";

const FooterLinks = () => {
	const { login } = useContext(LoginContext);
	const loggedIn = login;
	  const theme = useTheme(); 

  return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: theme.palette.primary.main, 
				color: theme.palette.primary.contrastText,
				width: "100%", 
			}}
		>
			{alwaysLinksFooter.map((myItem, index) => (
				<NavLinkComponent to={myItem.to} key={"linksnav" + index}>
					{myItem.children}
				</NavLinkComponent>
			))}
			{loggedIn &&
				loggedInLinksFooter.map((myItem, index) => (
					<NavLinkComponent
						sx={{ textDecoration: "none" }}
						to={myItem.to}
						key={"linksnav2" + index}
					>
						{myItem.children}
					</NavLinkComponent>
				))}
			{loggedIn &&
				loggedInLinksFooter &&
				bizLinksFooter.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
		</Box>
	);
};
export default FooterLinks;
