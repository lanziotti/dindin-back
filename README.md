# API RESTful para controle financeiro pessoal
Projeto feito para a conclusão do módulo 03 do Curso de Desenvolvimento de Software da Cubos Academy

## Tecnologias
- NodeJS
  - Express
  - Nodemon
  - PG
  - Dotenv
  - Cors
  - Knex
  - Bcrypt
  - Jsonwebtoken
  - Joi
- JavaScript
- PostgreSQL
  
## Features
- Cadastrar Usuário
- Fazer Login 
- Detalhar Perfil do Usuário Logado 
- Editar Perfil do Usuário Logado 
- Listar categorias 
- Listar transações 
- Detalhar transação 
- Cadastrar transação 
- Editar transação 
- Remover transação 
- Obter extrato de transações 

## Endpoints
#### `POST` `/usuario`
Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

Input:
```javascript
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

Output:
```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

Output para inválido:
```javascript
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

#### `POST` `/login`
Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

Input:
```javascript
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

Output:
```javascript
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

Output inválido:
```javascript
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```
