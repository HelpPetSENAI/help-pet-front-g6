const API_BASE_URL = "http://localhost:8080";

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
