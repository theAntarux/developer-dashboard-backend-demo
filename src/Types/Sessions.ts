export type Session = {
    UserId: number, 
    Authorized: boolean
}

export type AllSessions = {
    [key: string]: Session
}
