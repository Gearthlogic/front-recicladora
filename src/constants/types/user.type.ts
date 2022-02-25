import { Role } from "../enums/role.enum";

export type User = {
    id: number
    username: string
    roles: Role[]
}