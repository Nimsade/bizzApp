import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LoginContext from "../store/loginContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";

const useCardActions = (url, token) => {
	const { login } = useContext(LoginContext);
	const [cards, setCards] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchCards = async () => {
			try {
				const config = token
					? { headers: { Authorization: `Bearer ${token}` } }
					: {};
				const response = await axios.get(url, config);
				setCards(response.data);
			} catch (error) {
				console.error("Error fetching cards:", error);
			}
		};

		fetchCards();
	}, [url, token]);

	const handleDeleteCard = async (id) => {
		if (!token) {
			toast.error("You need to be logged in to delete cards.");
			return;
		}

		const card = cards.find((card) => card._id === id);
		if (!card) {
			toast.error("Card not found.");
			return;
		}

		const isCreator = card.user_id === login._id;
		const isAdmin = login.isAdmin;

		if (!(isCreator || isAdmin)) {
			toast.error("You do not have permission to delete this card.");
			return;
		}

		try {
			await axios.delete(`/cards/${id}`, {
				headers: { Authorization: `Bearer ${token}` }, 
			});
			setCards((currentCards) =>
				currentCards.filter((card) => card._id !== id)
			);
			toast.success("Card deleted successfully.");
		} catch (error) {
			console.error("Error deleting card:", error);
			toast.error("Failed to delete the card. Please try again.");
		}
	};

	const handleEditCard = async (id) => {
		if (!token) {
			toast.error("You need to be logged in to edit cards.");
			return;
		}
		const card = cards.find((card) => card._id === id);
		if (!card) {
			toast.error("Card not found.");
			return;
		}
		const isCreator = card.user_id === login._id;
		if (isCreator || login.isAdmin) {
			navigate(`${ROUTES.EDITCARD}/${id}`);
		} else {
			toast.error("You can only edit your own cards.");
		}
	};

	const handleLikeCard = async (id) => {
		if (!token) {
			toast.error("You need to be logged in to like cards.");
			return;
		}

		try {
			const { data } = await axios.patch(
				`/cards/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setCards((currentCards) =>
				currentCards.map((card) =>
					card._id === id ? { ...card, likes: data.likes } : card
				)
			);
		} catch (error) {
			console.error("Error liking card:", error);
			toast.error("Failed to like the card. Please try again.");
		}
	};
	const handlePhoneCard = () => {
		toast.success("Ring Ring...");
	};
	const handleClickCard = (id) => {
		navigate(`${ROUTES.SHOW_BIZ}/${id}`);
	};

	return {
		cards,
		handleDeleteCard,
		handleEditCard,
		handleLikeCard,
		handlePhoneCard,
		handleClickCard,
	};
};

export default useCardActions;
