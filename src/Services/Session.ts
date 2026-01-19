import crypto from "crypto"
import { AllSessions } from "@/Types/Sessions"

const SESSIONS = {} as AllSessions

export async function CreateSession(UserId: number, Authorized: boolean): Promise<[boolean, string | null]> {
    if (!UserId || !Authorized) {
        return [false, null]
    }

    const sessionId = crypto.randomBytes(32).toString("hex")
    SESSIONS[sessionId] = {
        UserId,
        Authorized
    }

    return [true, sessionId]
}
