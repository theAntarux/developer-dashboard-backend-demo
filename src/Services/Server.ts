import express from "express"
import http from "http"

const App = express()
const Server = http.createServer(App)

App.use(express.json())

export { App, Server }
