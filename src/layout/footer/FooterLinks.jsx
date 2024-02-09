import Box from "@mui/material/Box";
import {
	alwaysLinksFooter,
	loggedInLinksFooter,
	bizLinksFooter,
} from "../myLinks";
import NavLinkComponent from "../header/NavLinkComponent";
import { useContext } from "react";
import LoginContext from "../../store/loginContext";


const FooterLinks = () => {
	const { login } = useContext(LoginContext);
	const loggedIn = login;
	return (
		
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					
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
