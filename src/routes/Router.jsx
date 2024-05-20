import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutUsPage from "./../pages/AboutUsPage";
import EditItemPage from "../pages/EditItemPage/EditItemPage";
import FavoriteItemsPage from "../pages/FavoriteItemsPage";
import CreateItemPage from "../pages/CreateItemPage/CreateItemPage";
import MyItemsPage from "../pages/MyItemsPage";
import ShowBizPage from "../pages/ShowItemPage";
import SandboxPage from "../pages/SandboxPage";

const Router = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<HomePage />} />
			<Route path={ROUTES.LOGIN} element={<LoginPage />} />
			<Route path={ROUTES.REGISTER} element={<RegisterPage />} />
			<Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
			<Route path={`${ROUTES.EDITITEM}/:id`} element={<EditItemPage />} />
			<Route path={ROUTES.FAV_ITEMS} element={<FavoriteItemsPage />} />
			<Route path={ROUTES.CREATEITEM} element={<CreateItemPage />} />
			<Route path={ROUTES.MY_ITEMS} element={<MyItemsPage />} />
			<Route path={`${ROUTES.SHOW_BIZ}/:id`} element={<ShowBizPage />} />
			<Route path={ROUTES.SANDBOX} element={<SandboxPage/>} />
			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
};
export default Router;
