import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoginContext from "../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const useItemActions = (url, token) => {
	const { login } = useContext(LoginContext);
	const [items, setItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchItems = async () => {
			try {
				const config = token
					? { headers: { Authorization: `Bearer ${token}` } }
					: {};
				const response = await axios.get(url, config);
				setItems(response.data);
			} catch (error) {
				console.error("Error fetching items:", error);
			}
		};

		fetchItems();
	}, [url, token]);

	const handleDeleteItem = async (id) => {
		if (!token) {
			toast.error("You can only delete your own items.");
			return;
		}

		const item = items.find((item) => item._id === id);
		if (!item) {
			toast.error("item not found.");
			return;
		}

		const isCreator = item.user_id === login._id;
		const isAdmin = login.isAdmin;

		if (!(isCreator || isAdmin)) {
			toast.error("You can only delete your own items.");
			return;
		}

		try {
			await axios.delete(`/items/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setItems((currentItems) =>
				currentItems.filter((item) => item._id !== id)
			);
			toast.success("Item deleted successfully.");
		} catch (error) {
			console.error("Error deleting item:", error);
			toast.error("Failed to delete the item. Please try again.");
		}
	};

	const handleEditItem = async (id) => {
		if (!token) {
			toast.error("You can only edit your own items..");
			return;
		}
		const item = items.find((item) => item._id === id);
		if (!item) {
			toast.error("Item not found.");
			return;
		}
		const isCreator = item.user_id === login._id;
		if (isCreator || login.isAdmin) {
			navigate(`${ROUTES.EDITITEM}/${id}`);
		} else {
			toast.error("You can only edit your own items.");
		}
	};

	const handleLikeItem = async (id) => {
		if (!token) {
			toast.error("You need to be logged in to like items.");
			return;
		}

		try {
			const { data } = await axios.patch(
				`/items/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setItems((currentItems) =>
				currentItems.map((item) =>
					item._id === id ? { ...item, likes: data.likes } : item
				)
			);
		} catch (error) {
			console.error("Error liking item:", error);
			toast.error("Failed to like the item. Please try again.");
		}
	};
	const handlePhoneItem = () => {
		toast.success("Ring Ring...");
	};
	const handleClickItem = (id) => {
		navigate(`${ROUTES.SHOW_BIZ}/${id}`);
	};

	return {
	items,
		handleDeleteItem,
		handleEditItem,
		handleLikeItem,
		handlePhoneItem,
		handleClickItem,
	};
};

export default useItemActions;
