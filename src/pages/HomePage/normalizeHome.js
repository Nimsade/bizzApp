const normalizeItems = (items, myId) => {
	if (!items) return null;
	const newItems = items.map((item) => ({
		...item,
		liked: item.likes.includes(myId),
	}));
	return newItems;
};

export default normalizeItems;
