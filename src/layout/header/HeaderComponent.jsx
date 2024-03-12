import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountLogoComponent from "./ui/AccountLogoComponent";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Switch, CardMedia } from "@mui/material";
import Links from "./ui/Links";
import FilterComponent from "./ui/FilterComponent";



const HeaderComponent = ({ isDarkTheme, onThemeChange, onSearchChange }) => {
	const handleThemeChange = (event) => {
		onThemeChange(event.target.checked);
	};
	return (
		<Box sx={{ flexGrow: 1, mb: 2 }}>
			<AppBar position="static">
				<Toolbar>
					<CardMedia
						component="img"
						image={`${process.env.PUBLIC_URL}/assets/imgs/logoweb.png`}
						alt="Logo"
						sx={{ width: 100, height: 100 }}
					/>
					<Links />
					<FilterComponent onSearchChange={onSearchChange} />
					<Box
						sx={{
							my: 2,
							p: 1,
						}}
					>
						<Typography sx={{ display: { xs: "none", md: "inline" } }}>
							{isDarkTheme ? "Dark" : "Light"} Mode
						</Typography>
						<Switch checked={isDarkTheme} onChange={handleThemeChange} />
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>
						<AccountLogoComponent />
					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
						
							aria-haspopup="true"
						
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
		
			
		</Box>
	);
};
export default HeaderComponent;
