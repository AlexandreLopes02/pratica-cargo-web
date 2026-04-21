# 🚛 CargoPRO Web

Frontend do sistema **CargoPRO**, desenvolvido para gerenciamento de motoristas, empresas e ordens de serviço.

Este projeto foi criado com **Angular 14** e tem como foco praticar a construção de uma aplicação web mais próxima de um cenário real, com autenticação, proteção de rotas, organização modular e consumo de API REST.

---

## 🎯 Objetivo do projeto

O **CargoPRO Web** foi desenvolvido como projeto prático para consolidar conhecimentos em:

* Angular
* TypeScript
* Consumo de APIs REST
* Organização por módulos e features
* Autenticação com JWT
* Reactive Forms
* Angular Material
* Boas práticas de experiência do usuário

---

## ⚙️ Funcionalidades

### 🔐 Autenticação

* Cadastro de usuários
* Login com autenticação JWT
* Proteção de rotas com Auth Guard
* Envio automático do token nas requisições via HTTP Interceptor

### 📋 Cadastros

* Cadastro de motoristas
* Cadastro de empresas
* Cadastro de ordens de serviço
* Relacionamento entre motorista e empresa

### 🔎 Consultas

* Consulta por CPF
* Consulta por CNPJ
* Exibição de dados relacionados

### 📊 Dashboard

* Total de motoristas cadastrados
* Total de empresas cadastradas
* Total de serviços cadastrados

### 🎨 Experiência do usuário

* Máscaras de CPF e CNPJ
* Confirmação de ações
* Feedback visual com mensagens de sucesso e erro
* Indicadores de carregamento
* Interface construída com Angular Material

---

## 🛠️ Tecnologias utilizadas

* Angular 14
* TypeScript
* Angular Material
* RxJS
* HTML5
* SCSS
* ngx-mask

---

## 📂 Estrutura do projeto

```bash
src/
 ├─ app/
 │   ├─ core/        # serviços centrais, guards e interceptors
 │   ├─ shared/      # componentes e utilitários reutilizáveis
 │   └─ features/    # módulos por funcionalidade
```

---

## ▶️ Como executar o projeto

### 🔧 Pré-requisitos

Certifique-se de ter instalado:

* Node.js
* Angular CLI

---

### 📦 Instalação

```bash
npm install
```

---

### 🚀 Executar aplicação

```bash
npm start
```

A aplicação ficará disponível em:

👉 http://localhost:4200

---

## 🔗 Integração com back-end

Este repositório contém apenas o frontend da aplicação.

O projeto foi desenvolvido para consumir uma API separada responsável por autenticação, regras de negócio e persistência dos dados.

### 📌 Repositório da API

https://github.com/AlexandreLopes02/pratica-cargo-api

---

## ✅ Boas práticas aplicadas

* Organização modular por feature
* Separação entre componentes, serviços e camadas reutilizáveis
* Uso de Reactive Forms com validações
* Proteção de rotas com Auth Guard
* HTTP Interceptor para autenticação
* Melhorias de usabilidade com feedback visual
* Estrutura pensada para evolução do projeto

---

## 🔮 Melhorias futuras

* Testes unitários
* Tratamento global de erros
* Paginação e filtros
* Controle de perfis e permissões
* Deploy da aplicação

---

## 👨‍💻 Autor

**Alexandre Lopes de Lima**

* 💼 LinkedIn: https://www.linkedin.com/in/lopesalexandre02
* 💻 GitHub: https://github.com/AlexandreLopes02
