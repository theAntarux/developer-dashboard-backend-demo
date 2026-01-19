import { Server } from "@/Services/Server"

const PORT = 3000

Server.listen(PORT, () => {
    console.log(`Server Started! Listening on port ${ PORT }`)
})
