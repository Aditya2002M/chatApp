import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
let allUsers = [];
wss.on("connection", (socket) => {
    console.log("User connected");
    socket.on("message", (msg) => {
        try {
            const parseMessage = JSON.parse(msg.toString());
            if (parseMessage.type === "join") {
                const roomId = parseMessage.payload.roomId;
                allUsers.push({ socket, room: roomId });
                console.log(`User joined room: ${roomId}`);
            }
            if (parseMessage.type === "chat") {
                const currentUser = allUsers.find((u) => u.socket === socket);
                if (!currentUser)
                    return;
                const message = parseMessage.payload.message;
                allUsers.forEach((user) => {
                    if (user.room === currentUser.room && user.socket !== socket) {
                        user.socket.send(JSON.stringify({
                            type: "chat",
                            payload: { message },
                        }));
                    }
                });
            }
        }
        catch (err) {
            console.error("Invalid message:", err);
        }
    });
    socket.on("close", () => {
        allUsers = allUsers.filter((u) => u.socket !== socket);
        console.log("User disconnected");
    });
});
//# sourceMappingURL=index.js.map