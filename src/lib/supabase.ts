import { AppState, Platform } from 'react-native'
// O React Native não possui uma API de URL nativa como os navegadores web.
// O Supabase precisa dessa API para construir as rotas de requisição (ex: /auth/v1/user).
// Esse import injeta essa funcionalidade globalmente para que o Supabase funcione no mobile.
import 'react-native-url-polyfill/auto'

// Diferente da web (que usa localStorage), o React Native precisa de um banco local
// para salvar o token do usuário e manter a sessão ativa quando ele fechar e abrir o app.
import AsyncStorage from '@react-native-async-storage/async-storage'

// createClient: A função que inicializa a conexão com seu banco/auth.
// processLock: Uma trava (mutex) fornecida pelo Supabase que evita que o app tente
// atualizar o token de autenticação em duas requisições simultâneas, o que causaria erros.
import { createClient, processLock } from '@supabase/supabase-js'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Se o app não estiver rodando na Web (ou seja, iOS/Android), usa o AsyncStorage para salvar o token.
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),

    // Atualiza automaticamente o token de acesso antes que ele expire.
    autoRefreshToken: true,

    // Mantém a sessão salva no dispositivo (trabalha junto com o AsyncStorage).
    persistSession: true,

    // Desativa a busca de sessão na URL (útil apenas para web/navegadores após um redirecionamento de OAuth).
    detectSessionInUrl: false,

    // Usa o processLock importado lá em cima para evitar concorrência ao atualizar o token.
    lock: processLock,
  },
})

// Este bloco diz ao Supabase para parar de tentar atualizar o token se o aplicativo
// for minimizado (ficar em segundo plano), economizando bateria e dados do usuário.
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      // O app foi aberto ou voltou para o primeiro plano: volta a atualizar a sessão.
      supabase.auth.startAutoRefresh()
    } else {
      // O app foi minimizado: pausa a atualização da sessão.  
      supabase.auth.stopAutoRefresh()
    }
  })
}