# 💰 Divisão de Custos App

Um aplicativo mobile moderno construído com React Native e Expo, focado em ajudar usuários a organizar e dividir despesas de forma simples e intuitiva. 

## 🚀 Status do Projeto

O projeto está em desenvolvimento ativo

## 🛠 Tecnologias e Bibliotecas

Este projeto utiliza o que há de mais moderno no ecossistema React Native:

* **Framework:** [React Native](https://reactnative.dev/) com [Expo 55](https://expo.dev/) (Bare Workflow / Prebuild).
* **Estilização:** [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS) para estilização via classes diretamente nos componentes.
* **Navegação:** [React Navigation v6](https://reactnavigation.org/) (Stack Navigation para rotas públicas e Bottom Tabs customizadas para rotas privadas).
* **Autenticação & Backend:** [Supabase](https://supabase.com/) integrando banco de dados e gerenciamento completo de usuários.
* **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/) integrado com [Yup](https://github.com/jquense/yup) para validação robusta.
* **UI/UX Nativa:** `react-native-edge-to-edge` para um visual imersivo sem as barras de sistema padrão do Android.
* **Componentes de Data:** `@react-native-community/datetimepicker` com wrapper modal.

## ✨ Funcionalidades Implementadas

* **Autenticação Completa (Supabase):** * Login e Registro de usuários.
    * Persistência de sessão (Auto-login e Auto-logout via Context API e AsyncStorage gerenciado pelo Supabase).
* **Tratamento Global de Erros:**
    * Interceptor customizado (`useErrorHandler`) que traduz erros nativos do Supabase para português.
    * Componente `<Snackbar />` global flutuante para feedback visual de sucesso ou erro.
* **Navegação Inteligente:**
    * Separação rigorosa entre `PublicRoutes` e `PrivateRoutes`.
    * Barra de navegação inferior (Bottom Tabs) estilizada, flutuante e integrada ao tema escuro do app.
* **Design Edge-to-Edge:**
    * O aplicativo respeita as "Safe Areas" e desenha por baixo das barras transparentes do sistema operacional, garantindo uma interface profissional (UI Style Dark).
* **Gestão de Atividades:**
    * Tela inicial com listagem (Empty State customizado).
    * Modal interativo de criação de nova atividade com formulário tipado e DatePicker nativo embutido.

## 📂 Arquitetura e Padrões

O projeto segue princípios de Clean Architecture adaptados para o frontend:

* `/src/interfaces`: DTOs (Data Transfer Objects) tipados para requisições e respostas, garantindo segurança entre o App e o Supabase.
* `/src/services`: Funções isoladas para comunicação externa (ex: `auth.service.ts`).
* `/src/context`: Gerenciamento de estado global (Auth, Snackbar).
* `/src/shared`: Utilitários, hooks de formatação, paleta de cores e constantes.
* `/src/components`: Componentes visuais burros e reutilizáveis (`Input`, `AuthButton`, `MainHeader`).
* `/src/screens`: Páginas completas montando os fluxos de navegação.

## ⚙️ Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JorgeRobertoArgolo/divisao-custos-app
   ``` 
2. **Criar o backend no supabase:**
    
    2.1. Crie a tabela de profiles e altere ROW dela.
    ```sql
    create table public.profiles (
        id uuid not null references auth.users on delete cascade,
        name text,
        primary key (id)
    );

        alter table public.profiles enable row level security;
    ```

    2.2. Criação do Trigger e função para assim que um novo usuário for salvo, criar um registro na tabela de profiles: 
    
    ```sql
    -- Função que insere o perfil
    create or replace function public.handle_new_user()
    returns trigger
    language plpgsql
    security definer set search_path = public
    as $$
    begin
    insert into public.profiles (id, name)
    values (
        new.id, 
        new.raw_user_meta_data ->> 'name' 
    );
    return new;
    end;

    -- Gatilho que chama a função que cria o perfil
    create trigger on_auth_user_created
        after insert on auth.users
        for each row execute procedure public.handle_new_user();
        $$;
    ```
    **2.3. Criação das tabelas de negócio e RLS (Participantes, Atividades e Despesas):**
    
    ```sql
    -- Tabela de participantes
    create table participants (
        id uuid default gen_random_uuid() primary key,
        user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
        name text not null,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table participants enable row level security;

    create policy "Usuários gerenciam seus próprios participantes"
    on participants for all
    using ( auth.uid() = user_id );

    -- Tabela de atividades
    create table activities (
        id uuid default gen_random_uuid() primary key,
        user_id uuid references auth.users(id) on delete cascade not null default auth.uid(),
        title text not null,
        date date not null,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table activities enable row level security;

    create policy "Usuários gerenciam suas próprias atividades"
    on activities for all
    using ( auth.uid() = user_id );

    -- Tabela de despesas
    create table expenses (
        id uuid default gen_random_uuid() primary key,
        activity_id uuid references activities(id) on delete cascade not null,
        title text not null,
        amount numeric(10, 2) not null,
        created_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    alter table expenses enable row level security;

    create policy "Usuários acessam despesas de suas atividades"
    on expenses for all
    using (
        activity_id in (
            select id from activities where user_id = auth.uid()
        )
    );

    -- Tabela de relacionamento (Despesa <-> Participante)
    create table expense_participants (
        expense_id uuid references expenses(id) on delete cascade not null,
        participant_id uuid references participants(id) on delete cascade not null,
        is_paid boolean default false not null,
        primary key (expense_id, participant_id) 
    );

    alter table expense_participants enable row level security;

    create policy "Usuários gerenciam pagamentos de suas despesas"
    on expense_participants for all
        using (
        expense_id in (
            select e.id from expenses e
            join activities a on a.id = e.activity_id
            where a.user_id = auth.uid()
        )
    );
    ```

3. **Configuração de Variáveis de Ambiente:**

Crie um arquivo .env.local na raiz do projeto com as credenciais do seu Supabase:

```.env.local
EXPO_PUBLIC_SUPABASE_URL=sua_url_aqui
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_key_aqui
```
4. **Instalação e Execução:**

```bash
# Instale as dependências
npm install

# Crie os arquivos nativos
npx expo prebuild 

# Rode o projeto
npx expo run:android
# ou
npx expo run:ios
```