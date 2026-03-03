import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { IUser } from '@/interfaces/auth/interface-user'
import { UserLoginRequestDTO } from '@/interfaces/auth/request/user-login-request-dto';
import { UserRegisterRequestDTO } from '@/interfaces/auth/request/user-register-request-dto';

import * as authService from '@/shared/services/auth.service'
import  { supabase } from '@/lib/supabase'

type AuthContextType = {
    user: IUser | null;
    token:string | null;
    isLoading: boolean;
    handleAuthenticate: (params: UserLoginRequestDTO) => Promise<void>;
    handleRegister: (params: UserRegisterRequestDTO) => Promise<void>;
    handleLogout: () => void;
    restoreUserSession: () => Promise<void>;
} 

export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({
    children
}) => {

    const [user, setUser] = useState<IUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        restoreUserSession();
    }, []);

    const handleAuthenticate = async (userData: UserLoginRequestDTO) => {
        const { user: authenticatedUser, token: authenticatedToken } = await authService.authenticate(userData);
        setUser(authenticatedUser);
        setToken(authenticatedToken);
        console.log("Usuário: ", authenticatedUser);
        console.log("Token: ", authenticatedToken);
    }

    const handleRegister = async (userData: UserRegisterRequestDTO) => {
        const { user: newUser, token: newToken } = await authService.registerUser(userData);
        setUser(newUser);
        setToken(newToken);
        console.log("Usuário: ", newUser);
        console.log("Token: ", newToken);
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setToken(null);
        console.log("Usuário: ", user);
        console.log("Token: ", token);
    }

    const restoreUserSession = async () => {
        try {
            // Pede a sessão direto pro Supabase (ele vai ler do AsyncStorage por baixo dos panos)
            const { data: { session } } = await supabase.auth.getSession();
        
            if (session && session.user) {
                setUser({
                    id: session.user.id,
                    name: session.user.user_metadata?.name || '',
                    email: session.user.email || '',
                    createdAt: new Date(session.user.created_at),
                    updatedAt: session.user.updated_at ? new Date(session.user.updated_at) : null,
                });
                setToken(session.access_token);
            }
        } catch (error) {
            console.log("Erro ao restaurar sessão: ", error);
        } finally {
            setIsLoading(false);
            console.log("Usuário: ", user);
            console.log("Token: ", token);
        }
    }
   

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isLoading,
                handleAuthenticate,
                handleLogout,
                handleRegister,
                restoreUserSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    
    return context;
}