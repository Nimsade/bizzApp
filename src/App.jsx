import * as React from "react";
import { useEffect, useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import { SearchProvider } from "./store/SearchContext";

function App() {
	const [login, setLogin] = useState(null);

	return (
		<LoginContext.Provider value={{ login, setLogin }}>
			<SearchProvider>
				<ToastContainer />
				<LayoutComponent>
					<Router />
				</LayoutComponent>
			</SearchProvider>
		</LoginContext.Provider>
	);
}

export default App;
