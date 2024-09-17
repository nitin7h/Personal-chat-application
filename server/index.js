import { Server } from "socket.io"

const io = new Server(7000, {
    cors: true
})
let emaildMapping = new Map()
let socketMapping = new Map()

io.on("connection", (socket) => {
    console.log("a new client connected : ", socket.id)
    socket.on("joinRoom", (data) => {
        console.log(data)
        const { name, email, roomId } = data
        const userData = {
            name: name,
            email: email,
            roomId: roomId,
            socketId: socket.id
        }
        emaildMapping.set(email, { userData })
        socketMapping.set(socket.id, { userData })
        socket.join(roomId)

        io.to(roomId).emit("your:information", emaildMapping.get(email))
        io.to(roomId).emit("new:user:joined", emaildMapping.get(email))



    })

    //messages

    socket.on("message", (data) => {
        console.log("message : ", data);
        const roomId = data.from.userData.roomId
        io.to(roomId).emit("incoming:message", data)

    })







})