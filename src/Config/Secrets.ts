import dotenv from "dotenv"
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), 'RobloxApp.env') })

export const APP_CLIENT_ID = process.env.APP_CLIENT_ID
export const APP_CLIENT_SECRET = process.env.APP_CLIENT_SECRET
