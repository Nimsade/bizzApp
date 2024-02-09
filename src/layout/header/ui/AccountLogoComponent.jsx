import { useContext } from "react";
import LoginContext from "../../../store/loginContext";
import { Box, Typography } from "@mui/material";
import { accountLogoLogin } from "../../myLinks";
import { accountLogoLogOut } from "../../myLinks";
import NavLinkComponent from "../NavLinkComponent";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const AccountLogoComponent = () => {
	const { login } = useContext(LoginContext);
	const loggedIn = login;
	const navigate = useNavigate();
	const { setLogin } = useContext(LoginContext);

	const handleLogoutLogo = async () => {
		try {
			localStorage.clear();
			navigate(ROUTES.HOME);
			setLogin(null);
		} catch (error) {}
	};

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{!loggedIn &&
				accountLogoLogin.map((myItem, index) => (
					<NavLinkComponent to={myItem.to} key={"linksnav" + index}>
						{myItem.children}
					</NavLinkComponent>
				))}
			{loggedIn &&
				accountLogoLogOut.map((myItem, index) => (
					<NavLinkComponent
						sx={{ textDecoration: "none" }}
						to={myItem.to}
						key={"linksnav2" + index}
					>
						{
							<Box
								onClick={handleLogoutLogo}
								sx={{ display: "flex", flexDirection: "column" }}
							>
								<IconButton>
									<AccountCircle />
									<Typography
										variant="subtitle1"
										color="dark"
										sx={{ fontSize: "18px", cursor: "pointer" }}
									>
										Log Out
									</Typography>
								</IconButton>
							</Box>
						}
					</NavLinkComponent>
				))}
		</Box>
	);
};

export default AccountLogoComponent;
