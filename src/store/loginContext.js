import { createContext, useContext, useState } from "react";

const LoginContext = createContext({
	user: null,
	token: null,
	_id: null,
	isBusiness: false,
	isAdmin: false,
});

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
	const [login, setLogin] = useState({
		user: null,
		token: null,
		_id: null,
		isBusiness: false,
		isAdmin: false,
	});
	return (
		<LoginContext.Provider value={{ login, setLogin }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContext;
