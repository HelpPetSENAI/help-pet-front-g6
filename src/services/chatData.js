const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const NOTIFICATIONS_API_BASE_URL = import.meta.env.VITE_NOTIFICATIONS_API_BASE_URL;

export async function getUserId(token) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/users/current`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});

		if(!response.ok) {
			throw new Error("Não foi possível buscar o ID do usuário!");
		}

		const data = await response.text();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getChatList(token) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/conversations/user`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});

		if(!response.ok) {
			throw new Error("Não foi possível buscar a lista de conversas!");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getMessages(token, id) {
	try {
		const response = await fetch(`${API_BASE_URL}/api/messages/conversation/${id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${token}`
			}
		});

		if(!response.ok) {
			throw new Error("Não foi possível buscar a lista de mensagens!");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function sendNotification(token, receiverId, content) {

	const messageData = {
		userId: receiverId,
		title: "Mensagem do Chat",
		message: content,
		type: "CHAT"
	}

	try {
		const response = await fetch(`${NOTIFICATIONS_API_BASE_URL}/notifications/create`, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify(messageData)
		});

		if(!response.ok) {
			throw new Error("Não foi possível enviar a notificação!");
		}
	} catch (error) {
		console.error(error);
	}
}
