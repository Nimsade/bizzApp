
const fromServer = (serverData) => {
	return {
		title: serverData.title || "",
		subtitle: serverData.subtitle || "",
		description: serverData.description || "",
		phone: serverData.phone || "",
		email: serverData.email || "",
		web: serverData.web || "",
		url: serverData.image?.url || "",
		alt: serverData.image?.alt || "", 
		state: serverData.address?.state || "",
		country: serverData.address?.country || "",
		city: serverData.address?.city || "",
		street: serverData.address?.street || "",
		houseNumber: serverData.address?.houseNumber?.toString() || "", 
		zip: serverData.address?.zip?.toString() || "",
		
	};
};
const toServer = (clientData) => {
	return {
		title: clientData.title,
		subtitle: clientData.subtitle,
		description: clientData.description,
		phone: clientData.phone,
		email: clientData.email,
		web: clientData.web,
		image: {
			url: clientData.url,
			alt: clientData.alt,
		},
		address: {
			state: clientData.state,
			country: clientData.country,
			city: clientData.city,
			street: clientData.street,
			houseNumber: clientData.houseNumber,
			zip: clientData.zip,
		},
	};
};

export { fromServer, toServer };
