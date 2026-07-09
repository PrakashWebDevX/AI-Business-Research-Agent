import { t as api } from "./api-CZU_4io-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chatService-B8FzW_mU.js
/**
* All prompts (chat, SQL-style, research-style) go through the single
* FastAPI endpoint POST /api/chat. The backend BusinessAgent routes to
* the correct tool (SQL or Web Search) automatically.
*/
async function send(prompt, sessionId) {
	return api("/api/chat", {
		method: "POST",
		body: {
			message: prompt,
			session_id: sessionId
		}
	});
}
var chatService = {
	send,
	ask: send,
	sql: (query, sessionId) => send(query, sessionId),
	research: (topic, sessionId) => send(topic, sessionId)
};
//#endregion
export { chatService as t };
