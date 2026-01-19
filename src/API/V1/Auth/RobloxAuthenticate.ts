import querystring from "querystring"
import { Request, Response } from "express";
import { APP_CLIENT_ID } from "@/Config/Secrets"

export async function RobloxAuthenticate(Request: Request, Response: Response) {
    const OAuth2Url = "https://apis.roblox.com/oauth/v1/authorize?" + querystring.stringify({
        client_id: APP_CLIENT_ID,
        response_type: "code",
        redirect_uri: "http://localhost:3000/v1/auth/roblox-callback", //"https://api.antarux.dev/v1/auth/roblox-callback",
        scope: "openid profile",
        state: "randomstate"
    })

    Response.redirect(OAuth2Url)
}
