# Pratica Cargo — Sistema de Gestão

**Angular 14 • .NET Web API • SQL Server • JWT**

Sistema completo de treinamento para prática de **Angular 14** consumindo uma **API C# (.NET Web API)** com **SQL Server** e autenticação **JWT**, focado em boas práticas, arquitetura modular e experiência do usuário.

---

## 🚀 Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários (nome, email, senha)
* Login com **JWT**
* **Auth Guard** para proteção de rotas
* **HTTP Interceptor** para envio automático do token

### 🗂️ Cadastros (CRUD)

* **Motoristas** (nome, CPF)
* **Empresas** (nome, CNPJ)
* **Serviços / Ordens de Serviço**

  * Relacionamento entre empresa e motorista por ID
  * Validação de existência antes do cadastro
  * Expansão de dados relacionados nas consultas

### 🔎 Consultas Avançadas

* Por **CNPJ**: empresa + ordens de serviço + motorista
* Por **CPF**: motorista + ordens de serviço + empresa

### 📊 Dashboard

* Contadores de motoristas
* Contadores de empresas
* Contadores de serviços

### 🎨 UX & Qualidade

* Máscaras de **CPF/CNPJ**
* Confirmação de ações com **MatDialog**
* **Toasts** de feedback (sucesso/erro)
* Indicadores de **loading**

---

## 📦 Tecnologias Utilizadas

### Front-end

* Angular 14
* Angular Material
* Ngx-mask
* HTML5 / SCSS
* RxJS

### Back-end

* C# .NET Web API
* Entity Framework Core
* SQL Server
* JWT (JSON Web Tokens)

---

## 🔧 Como Executar o Projeto

### 📌 Back-end (API)

1. Instale o **.NET SDK**
2. Configure o `appsettings.json` com sua conexão do **SQL Server**
3. Execute as migrations:

   ```bash
   dotnet ef database update
   ```
4. Inicie a API:

   ```bash
   dotnet run
   ```
5. A API estará disponível em:

   ```
   https://localhost:<porta>/api
   ```

### 📌 Front-end (Angular)

1. Instale as dependências:

   ```bash
   npm install
   ```
2. Inicie a aplicação:

   ```bash
   npm start
   ```
3. Acesse:

   ```
   http://localhost:4200
   ```

---

## 📁 Estrutura do Projeto

```
pratica-cargo/
├─ angular/                 # Front-end Angular 14
│  └─ src/app/
│     ├─ core/              # Serviços centrais, guards, interceptors
│     ├─ shared/            # Componentes e utilitários reutilizáveis
│     └─ features/          # Módulos por domínio
│        ├─ auth/
│        ├─ layout/
│        ├─ cadastros/
│        ├─ consultas/
│        └─ dashboard/
├─ api/                     # Back-end .NET Web API
│  ├─ Controllers/
│  ├─ Data/
│  ├─ Models/
│  └─ appsettings.json
├─ db/                      # Migrations e scripts de banco
└─ README.md
```

---

## 💡 Boas Práticas Aplicadas

* Arquitetura modular por **feature**
* Separação de responsabilidades (components x services)
* **Reactive Forms** com validações
* **JWT Interceptor** e **Auth Guard**
* Tratamento centralizado de erros (front e back)
* Máscaras de entrada para dados sensíveis
* Feedback visual e confirmação de ações

---

## 📌 Próximos Passos / Melhorias

* Hash seguro de senha no back-end
* Perfis de usuário e controle de permissões
* Logs e auditoria
* Relatórios exportáveis (PDF / Excel)
* Testes unitários e de integração

---

📘 **Projeto desenvolvido com foco educacional e preparo para projetos reais em Angular e .NET.**
