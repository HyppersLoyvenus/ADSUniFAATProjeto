# Gerenciamento Escolar Infantil

O sistema tem como objetivo principal automatizar e otimizar o controle de pagamentos, presenças e atividades dos alunos, substituindo o método manual atual baseado em cadernos.

Membros:
- Antuane Felipe - RA: 3124596
- Gabrielle Palma - RA: 6324589
- Karolina Mendes - RA: 6324304
- Vitória Nascimento - RA: 6324549

## Pré-Requisitos
> Tecnologias necessárias para a execução base do projeto.

* Docker & Docker Compose (para subir a aplicação)
* Insomnia (para vizualizar as APIs)

## Sumário

1. [Instalação & Execução](#instalacao-execucao)
2. [Estrutura do Projeto](#estrutura-projeto)
3. [Como Contribuir](#contribuir)


## Instalação & Execução <a name="instalacao-execucao"></a>
1. Clonar o repositório & acessa-lo:
    
    ```sh
    git clone https://github.com/HyppersLoyvenus/ADSUniFaatProjeto.git
    cd ADSUniFaatProjeto
    ```

2. Criar o arquivo `.env` na raiz do projeto copiando o .env.example:

   ```ini
   copy .env.example .env
   ```

3. Abrir o arquivo .env recém criado e preencher os campos abaixo:

    ```sh
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    ```

4. Subir a aplicação com Docker Compose:

   ```sh
   docker-compose up --build -d
   ```
   > Servidor estará disponível em: http://localhost:8080 \
   > As APIs podem ser acessadas via: http://localhost:8080/api/<nome-da-rota>
   > - ou dando import do arquivo ```Insomnia_RotasAPI.yaml``` no seu Insomnia 

## Estrutura do Projeto <a name="estrutura-projeto"></a>

```
C:.
│   .env.example
│   docker-compose.yml
│   Insomnia_RotasAPI.yaml
│   package-lock.json
│   package.json
│   README.md
├───App
│   ├───bootstrap
│   ├───config
│   ├───Controllers
│   ├───Models
│   ├───public
│   └───routes
├───Docker
│   ├───nginx
│   ├───node22-web
│   └───postgres
│       └───init.sql
└───Docs
        DER.jpg
        MER.png
```

## Como contribuir com o projeto <a name="contribuir"></a>

### Fork do Repositório

1. Acesse o repositório original
2. No canto superior direito da página, clique no botão "Fork"

### Clone do Repositório

1. No seu fork, clique no botão verde "Code"
2. Copie a URL do repositório
3. Abra o terminal e execute:
```sh
git clone https://github.com/HyppersLoyvenus/ADSUniFaatProjeto.git
cd ADSUniFaatProjeto
```

### Fazendo as Alterações

1. Crie uma nova branch para suas alterações:
```sh
git checkout -b <nome-da-branch>
```
2. Faça as correções necessárias nos arquivos
3. Adicione as alterações:
```sh
git add .
```
4. Faça o commit das alterações:
```sh
git commit -m "Alteração de X coisa"
```
5. Envie as alterações para o seu fork:
```sh
git push origin <nome-da-branch>
```

### Criando o Pull Request

1. Acesse seu repositório no GitHub
2. Clique no botão "Compare & pull request" que aparecerá no topo
3. Clique em "Create pull request"
