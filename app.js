const io = require("socket.io")(3002, {
  cors: {
    origin: "http://broccoli-market.store",
  },
});

io.on("connection", (socket) => {
  console.log("새로운 소켓이 연결됐어요!");

  socket.on("message", (data) => {
    console.log(data);
  });
});

io.on("connection", (socket) => {
  // 서버와 클라이언트 간의 실시간 통신을 위해 "connection" 이벤트를 등록
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    //클라이언트에서 'join_room' 이벤트를 보낼 때, 해당 방에 클라이언트를 추가하고 로그를 출력
    socket.join(data);
    console.log(`User with ID : ${socket.id} joined room : ${data}`);
  });
  socket.on("sendMessage", (data) => {
    console.log("sendMessage", data);
    //클라이언트에서 'sendMessage' 이벤트를 보낼 때, 해당 방에 있는 다른 클라이언트들에게 'receiveMessage' 이벤트를 발생시켜 메시지 보내기
    socket.to(data.chat_id).emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    //클라이언트와의 연결이 끊어질 때 "disconnect" 이벤트가 발생하도록 등록하고, 연결이 끊어졌을 때 로그를 출력
    console.log("User Disconnected", socket.id);
  });
});
