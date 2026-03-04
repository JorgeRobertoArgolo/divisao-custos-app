import { useSnackbarContext } from "@/context/snackbar.context"
import { AuthError } from "@supabase/supabase-js";

export const useErrorHandler = () => {
    const { notify } = useSnackbarContext();

    const handleError = (error: unknown, defaultMessage?: string) => {
        let message = defaultMessage || 'Falha na requisição';

        if (error instanceof Error || error instanceof AuthError) {
            message = error.message;
        }

        /**
         * Dicionário de tradução para erros mais frequentes
         */
        const supabaseErrors: Record<string, string> = {
            "Invalid login credentials": "E-mail ou senha incorretos.",
            "User already registered": "Este e-mail já está cadastrado.",
            "Password should be at least 6 characters": "A senha deve ter pelo menos 6 caracteres.",
            "Email not confirmed": "Por favor, confirme seu e-mail antes de continuar.",
            "User not found": "Usuário não encontrado."
        };

        /**
         * Verifica se o erro, é algum dos que estão no dicionário, se for pega a tradução
         */
        if (supabaseErrors[message]) {
            message = supabaseErrors[message];
        }

        notify({
            message,
            messageType: 'ERROR'
        });
    }
    return { handleError };
}
