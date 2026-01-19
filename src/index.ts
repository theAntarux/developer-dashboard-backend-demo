import { Server } from "@/Services/Server"
import "@/API/API_Handler"

const PORT = 3000

Server.listen(PORT, () => {
    console.log(`Server Started! Listening on port ${ PORT }`)
})
