import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const NavLinkComponent = ({ to, children }) => {
	const theme = useTheme();
	return (
		<NavLink to={to} style={{ textDecoration: "none", }}>
			{({ isActive }) => (
				<Typography
					color={isActive ? "secondary.main" : "inherit"} 
					sx={{
						padding: "6px 8px",
						backgroundColor: theme.palette.primary.main, 
						color: theme.palette.primary.contrastText,
					}}
				>
					{children}
				</Typography>
			)}
		</NavLink>
	);
};

export default NavLinkComponent;
