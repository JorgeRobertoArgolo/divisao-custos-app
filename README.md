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
    