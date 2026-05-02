# 🛒 FastPy Store

Sistema de gerenciamento de produtos com cadastro, edição, listagem e exclusão. Backend em FastAPI com banco SQLite e frontend em HTML, CSS e JavaScript puro.

---

## Funcionalidades

- Cadastrar produtos com nome e preço
- Listar todos os produtos cadastrados
- Editar nome e preço de um produto existente
- Deletar produto com confirmação
- Formatação automática de preço em R$

---

## Tecnologias

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Como rodar

Clone o repositório e entre na pasta:

```bash
git clone https://github.com/gusmeira88/fastpy-store.git
cd fastpy-store
```

Instale as dependências:

```bash
pip install fastapi uvicorn
```

Inicie o servidor:

```bash
python main.py
```

Abra o arquivo `index.html` no navegador. O servidor precisa estar rodando para o sistema funcionar.

---

## Estrutura

```
fastpy-store/
├── main.py        # API com FastAPI e SQLite
├── index.html     # Tela principal (cadastro e listagem)
├── alterar.html   # Tela de edição
├── script.js      # Lógica do frontend
├── style.css      # Estilização
└── README.md
```

---

Feito por [Gustavo](https://github.com/gusmeira88)