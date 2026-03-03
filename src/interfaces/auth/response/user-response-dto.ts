import { IUser } from "@/interfaces/auth/interface-user";

export interface UserResponseDTO {
    user: IUser;
    token: string;
}