import { App } from "@/Services/Server"

import { RobloxAuthenticate } from "@/API/V1/Auth/RobloxAuthenticate"
import { RobloxCallback } from "@/API/V1/Auth/RobloxCallback"

App.get("/v1/auth/roblox-authenticate", RobloxAuthenticate)
App.get("/v1/auth/roblox-callback", RobloxCallback)
