import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";

const useAutoLogin = () => {
	const { setLogin } = useContext(LoginContext);
	const [finishAutoLogin, setFinishAutoLogin] = useState(false);

	useEffect(() => {
		const autoLogin = async () => {
			const token = localStorage.getItem("token");
			if (!token) {
				setFinishAutoLogin(true);
				return;
			}

			try {
				const decodedToken = jwtDecode(token);
				const isTokenExpired = decodedToken.exp < Date.now() / 1000;
				if (isTokenExpired) {
					localStorage.removeItem("token");
					setFinishAutoLogin(true);
					return;
				}
				const { data: userData } = await axios.get(
					`/users/${decodedToken._id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setLogin({
					user: userData,
					token: token,
					_id: decodedToken._id,
					isAdmin: userData.isAdmin,
					isBusiness: userData.isBusiness,
				});
				setFinishAutoLogin(true);
			} catch (error) {
				console.error("Error during auto-login:", error);
				localStorage.removeItem("token");
				setFinishAutoLogin(true);
			}
		};

		autoLogin();
	}, [setLogin]);

	return finishAutoLogin;
};

export default useAutoLogin;
