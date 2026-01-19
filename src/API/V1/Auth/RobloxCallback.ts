import axios from "axios"
import querystring from "querystring"

import { Request, Response } from "express";
import { APP_CLIENT_ID, APP_CLIENT_SECRET } from "@/Config/Secrets"
import { GetUserIdFromIdToken, IsUserRankAuthorized } from "@/Services/RobloxService"
import { Communities } from "@/Config/Communities"
import { CreateSession } from "@/Services/Session"

export async function RobloxCallback(Request: Request, Response: Response) {
    const Code = Request.query.code as string
    if (!Code) {
        return Response.status(400).send("No code provided!")
    }

    try {
        const TokenResponse = await axios.post("https://apis.roblox.com/oauth/v1/token", querystring.stringify({
            grant_type: "authorization_code",
            code: Code,
            redirect_uri: "http://localhost:3000/v1/auth/roblox-callback", //"https://api.antarux.dev/v1/auth/roblox-callback",
            client_id: APP_CLIENT_ID,
            client_secret: APP_CLIENT_SECRET
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        const IdToken = TokenResponse.data.id_token
        const UserId = await GetUserIdFromIdToken(IdToken)

        const IsUserAuthorized = await IsUserRankAuthorized(UserId, Communities["Federation's Studio"], 200)
        if (!IsUserAuthorized) {
            return Response.status(403).send("User is not authorized!")
        }

        const [IsSessionCreated, SessionId] = await CreateSession(UserId, IsUserAuthorized)
        if (!IsSessionCreated) {
            return Response.status(500).send("Failed to create session!")
        }

        Response.status(200)
        Response.redirect(`http://localhost:5173?sessionId=${ SessionId }`)
    } catch(err) {
        console.error(err)
        Response.status(500).send("Authentication failed!")
    }
}
