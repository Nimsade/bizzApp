import { Box } from "@mui/material";
import {
	alwaysLinks,
	loggedInLinks,
	loggedOutLinks,
	bizLinks,
	adminLinks,
} from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import { useContext } from "react";
import LoginContext from "../../../store/loginContext";

const Links = () => {
	const { login } = useContext(LoginContext);
	const loggedIn = login && login.token;
	const isBusiness = login && login?.user?.isBusiness;
	const isAdmin = login && login?.user?.isAdmin;

	return (
		<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
			{alwaysLinks.map((myItem, index) => (
				<NavLinkComponent to={myItem.to} key={"always" + index}>
					{myItem.children}
				</NavLinkComponent>
			))}
			{loggedIn &&
				loggedInLinks.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"loggedIn" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
			{isBusiness &&
				bizLinks.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"isBusiness" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
			{isAdmin &&
				adminLinks.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"admin" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
			{!loggedIn &&
				loggedOutLinks.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"loggedOut" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
		</Box>
	);
};

export default Links;
