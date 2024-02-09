import { Box, Container } from "@mui/material";

const MainComponent = ({ children }) => {
	return (
		<Box>
			<Container>{children}</Container>
		</Box>
	);
};

export default MainComponent;
