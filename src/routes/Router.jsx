import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutUsPage from "./../pages/AboutUsPage";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import FavoriteCardsPage from "../pages/FavoriteCardsPage";
import CreateCardPage from "../pages/CreateCardPage/CreateCardPage";
import MyCardsPage from "../pages/MyCardsPage";
import ShowBizPage from "../pages/ShowBizPage";
import SandboxPage from "../pages/SandboxPage";

const Router = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<HomePage />} />
			<Route path={ROUTES.LOGIN} element={<LoginPage />} />
			<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			<Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
			<Route path={`${ROUTES.EDITCARD}/:id`} element={<EditCardPage />} />
			<Route path={ROUTES.FAV_CARDS} element={<FavoriteCardsPage />} />
			<Route path={ROUTES.CREATECARD} element={<CreateCardPage />} />
			<Route path={ROUTES.MY_CARDS} element={<MyCardsPage />} />
			<Route path={`${ROUTES.SHOW_BIZ}/:id`} element={<ShowBizPage />} />
			<Route path={ROUTES.SANDBOX} element={<SandboxPage/>} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
export default Router;
