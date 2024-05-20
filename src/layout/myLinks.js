import ROUTES from "../routes/ROUTES";
import HomeIcon from "@mui/icons-material/Home";
import {
	BottomNavigation,
	BottomNavigationAction,
	Box,
	Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

const alwaysLinks = [
	{ to: ROUTES.HOME, children: "Home page" },
	{ to: ROUTES.ABOUT, children: "About Us" },
];
const loggedInLinks = [{ to: ROUTES.FAV_ITEMS, children: "Favorites" }];
const bizLinks = [{ to: ROUTES.CREATEITEM, children: "Create a Item" }];
const loggedOutLinks = [{ to: ROUTES.REGISTER, children: "Registration" }];
const adminLinks = [{to: ROUTES.SANDBOX, children: "Sandbox" }];
const alwaysLinksFooter = [
	{
		to: ROUTES.HOME,
		children: (
			<BottomNavigation
				showLabels
				sx={{
					backgroundColor: "primary.main", 
					"& .MuiBottomNavigationAction-root": {
						backgroundColor: "transparent", 
					},
					"& .Mui-selected": {
						color: "secondary.main", 
						backgroundColor: "transparent", 
					},
				}}
			>
				<BottomNavigationAction label="Home" icon={<HomeIcon />} />
			</BottomNavigation>
		),
	},
	{
		to: ROUTES.ABOUT,
		children: (
			<BottomNavigation
				showLabels
				sx={{
					backgroundColor: "primary.main", 
					"& .MuiBottomNavigationAction-root": {
						backgroundColor: "transparent", 
					},
					"& .Mui-selected": {
						color: "secondary.main", 
						backgroundColor: "transparent", 
					},
				}}
			>
				<BottomNavigationAction label="About Us" icon={<InfoIcon />} />
			</BottomNavigation>
		),
	},
];
const loggedInLinksFooter = [
	{
		to: ROUTES.FAV_ITEMS,
		children: (
			<BottomNavigation
				showLabels
				sx={{
					backgroundColor: "primary.main", 
					"& .MuiBottomNavigationAction-root": {
						backgroundColor: "transparent", 
					},
					"& .Mui-selected": {
						color: "secondary.main", 
						backgroundColor: "transparent", 
					},
				}}
			>
				<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
			</BottomNavigation>
		),
	},
];
const bizLinksFooter = [
	{
		to: ROUTES.MY_ITEMS,
		children: (
			<BottomNavigation
				showLabels
				sx={{
					backgroundColor: "primary.main", 
					"& .MuiBottomNavigationAction-root": {
						backgroundColor: "transparent", 
					},
					"& .Mui-selected": {
						color: "secondary.main", 
						backgroundColor: "transparent", 
					},
				}}
			>
				<BottomNavigationAction label="My items" icon={<RecentActorsIcon />} />
			</BottomNavigation>
		),
	},
];

const accountLogoLogin = [
	{
		to: ROUTES.LOGIN,
		children: (
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<IconButton>
					<AccountCircle />
					<Typography
						variant="subtitle1"
						color="dark"
						sx={{ fontSize: "18px" }}
					>
						Log In
					</Typography>
				</IconButton>
			</Box>
		),
	},
];

const accountLogoLogOut = [
	{
		to: ROUTES.HOME,
		children: (
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				<IconButton aria-label="Log Out">
					<AccountCircle />
					Log Out
				</IconButton>
			</Box>
		),
	},
];

export {
	alwaysLinks,
	loggedInLinks,
	loggedOutLinks,
	bizLinks,
	adminLinks,
	alwaysLinksFooter,
	loggedInLinksFooter,
	bizLinksFooter,
	accountLogoLogin,
	accountLogoLogOut,
};
