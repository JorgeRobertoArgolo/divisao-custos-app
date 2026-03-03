import { UserLoginRequestDTO } from "@/interfaces/auth/request/user-login-request-dto";
import { UserRegisterRequestDTO } from "@/interfaces/auth/request/user-register-request-dto";
import { UserResponseDTO } from "@/interfaces/auth/response/user-response-dto";
import { supabase } from "@/lib/supabase";

export const authenticate = async (
    userData: UserLoginRequestDTO
): Promise<UserResponseDTO> => {
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password
    });

    if (error) {
        console.log("Erro no login: ", error.message);
        throw new Error(error.message);
    }

    if (!data.session || !data.user) {
        throw new Error('Erro inesperado durante o login.');
    }
    
    return {
        user: {
            id: data.user.id,
            name: data.user.user_metadata.name || '',
            email: data.user.email || '',
            createdAt: new Date(data.user.created_at),
            updatedAt: data.user.updated_at ? new Date(data.user.updated_at) : null,
        },
        token: data.session.access_token,
    }
}

export const registerUser = async (
    userData: UserRegisterRequestDTO
): Promise<UserResponseDTO> => {

    const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
            data: {
                name: userData.fullName,
            }
        }
    }) 

    if (error) {
        console.log("Erro no registro: ", error.message);
        throw new Error(error.message);
    }

    if (!data.session || !data.user) {
        throw new Error('Erro inesperado durante o registro.');
    }

    return {
        user: {
            id: data.user.id,
            name: data.user.user_metadata.name || '',
            email: data.user.email || '',
            createdAt: new Date(data.user.created_at),
            updatedAt: data.user.updated_at ? new Date(data.user.updated_at) : null,
        },
        token: data.session.access_token,
    }
}
