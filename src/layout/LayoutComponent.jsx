import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import useAutoLogin from "../hooks/useAutoLogin";
import Typography from "@mui/material/Typography";
import backgroundImage from "../assets/images/backgroundimage.jpg"

const LayoutComponent = ({ children }) => {
	const finishAutoLogin = useAutoLogin();
	const [isDarkTheme, setDarkTheme] = useState(false);

	const themes = tmc({
		"text.headerColor": "!gray",
		"text.headerActive": "*white",
		favActive: "*#FB0000",
		primary: "#d0f2e3",
		secondary: "#114a21",
		error: "#c91212",
	});

	const darkMode = createTheme(themes.dark);

	const lightMode = createTheme({
		...themes.light,
		components: {
			MuiCssBaseline: {
				styleOverrides: {
					body: {
						backgroundImage: `url(${backgroundImage})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
					},
				},
			},
		},
	});

	const handleThemeChange = (checked) => {
		setDarkTheme(checked);
	};

	return (
		<ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
			<CssBaseline />
			<HeaderComponent
				isDarkTheme={isDarkTheme}
				onThemeChange={handleThemeChange}
			/>
			<MainComponent>
				{finishAutoLogin ? (
					children
				) : (
					<Typography variant="h1">Loading...</Typography>
				)}
			</MainComponent>
			<FooterComponent />
		</ThemeProvider>
	);
};

export default LayoutComponent;
