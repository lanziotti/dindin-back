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
- Autentificação do Usuário Logado
- Validações do token
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

Output inválido:
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


## **OBS**: Todas os endpoints a seguir, a partir desse ponto, exigem o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade há a validação do token informado.



#### `GET` `/usuario`
Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

Output inválido:
```javascript
{
    "mensagem": "Não autorizado."
}
```

#### `PUT` `/usuario`
Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário. 

Input:
```javascript
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

Output:
```javascript
// Sem conteúdo no corpo (body) da resposta
```

Output inválido:
```javascript
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

#### `GET` `/categoria`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as categorias cadastradas.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output (exemplos):
```javascript
[
    {
        id: 1,
        descricao: "Roupas",
    },
    {
        id: 2,
        descricao: "Mercado",
    },
]
```

```javascript
[]
```

#### `GET` `/transacao`
Essa é a rota que será chamada quando o usuario logado quiser listar todas as suas transações cadastradas. 

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output (exemplos):
```javascript
[
    {
        id: 1,
        tipo: "saida",
        descricao: "Sapato amarelo",
        valor: 15800,
        data: "2022-03-23T15:35:00.000Z",
        usuario_id: 5,
        categoria_id: 4,
        categoria_nome: "Roupas",
    },
    {
        id: 3,
        tipo: "entrada",
        descricao: "Salário",
        valor: 300000,
        data: "2022-03-24T15:30:00.000Z",
        usuario_id: 5,
        categoria_id: 6,
        categoria_nome: "Salários",
    },
]
```

```javascript
[]
```

#### `GET` `/transacao/:id`
Essa é a rota que será chamada quando o usuario logado quiser obter uma das suas transações cadastradas.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
    "id": 2,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

Output inválido:
```javascript
{
    "mensagem": "A transação não existe."
}
```

#### `POST` `/transacao`
Essa é a rota que será utilizada para cadastrar uma transação associada ao usuário logado.

Input:
```javascript
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 6
}
```

Output:
```javascript
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24T15:30:00.000Z",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Todos os campos são obrigatórios."
}
```

```javascript
{
    "mensagem": "A categoria não existe."
}
```

#### `PUT` `/transacao/:id`
Essa é a rota que será chamada quando o usuario logado quiser atualizar uma das suas transações cadastradas. 

Input:
```javascript
{
 "descricao": "Sapato amarelo",
 "valor": 15800,
 "data": "2022-03-23 12:35:00",
 "categoria_id": 4,
 "tipo": "saida"
}
```

Output:
```javascript
// Sem conteúdo no corpo (body) da resposta
```

Output inválido (exemplos):
```javascript
{
    "mensagem": "Todos os campos são obrigatórios."
}
```

```javascript
{
    "mensagem": "A transação não existe."
}
```

#### `DELETE` `/transacao/:id`
Essa é a rota que será chamada quando o usuario logado quiser excluir uma das suas transações cadastradas.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
// Sem conteúdo no corpo (body) da resposta
```

Output inválido:
```javascript
{
    "mensagem": "A transação não existe."
}
```

#### `GET` `/transacao/extrato`
Essa é a rota que será chamada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.

Input:
```javascript
// Sem conteúdo no corpo (body) da requisição
```

Output:
```javascript
{
 "entrada": 300000,
 "saida": 15800
}
```




## Links
- Repositório: https://github.com/lanziotti/dindin-back

## Contatos
- Email: rodrigolanziotti@yahoo.com.br
- LinkedIn: https://www.linkedin.com/in/rodrigo-lanziotti-16a64966/

## Versão
1.0.0

## Autor
Rodrigo Lanziotti de Freitas
