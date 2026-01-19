import axios from "axios"

import { Communities } from "@/Config/Communities";

export async function GetUserIdFromIdToken(IdToken: string): Promise<number> {
    const Payload = JSON.parse(Buffer.from(IdToken.split('.')[1], 'base64').toString());
    return Payload.sub;
}

export async function IsUserRankAuthorized(UserId: number, GroupId: number | null, MinRank: number | null): Promise<boolean> {
    const Response = await axios.get(`https://groups.roblox.com/v1/users/${ UserId }/groups/roles`);
    const Roles = Response.data.data;

    if (!GroupId) {
        GroupId = Communities["Federation's Studio"]
    }

    if (!MinRank) {
        MinRank = 255
    }

  return Roles.some((role: any) => role.group.id === GroupId && role.role.rank >= MinRank);
}
