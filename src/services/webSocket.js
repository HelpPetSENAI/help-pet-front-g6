import { Client } from "@stomp/stompjs";

const WEBSOCKET_URL = "ws://localhost:8080/chat";

let client = null;

export function connectWebSocket(token, onMessage, onConversation) {
	client = new Client({
		brokerURL: WEBSOCKET_URL,
		reconnectDelay: 5000,
		connectHeaders: {
			"Authorization": `Bearer ${token}`
		},
		debug: function (str) {
			console.log(str);
		},
		onConnect: () => {
			client.subscribe("/user/queue/messages", (message) => {
				onMessage(message);
			});
			client.subscribe("/user/queue/conversations", (conversation) => {
				onConversation(conversation);
			});
		}
	});

	client.onStompError = function (frame) {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	}

	client.activate();
}

export function sendWebSocketMessage(text, receiverId, conversationId) {
	client.publish({
		destination: "/app/message",
		body: JSON.stringify({
			content: text,
			receiverId: receiverId,
			conversationId: conversationId
		})
	});
}

export async function disconnectWebSocket() {
	await client.deactivate();
}
