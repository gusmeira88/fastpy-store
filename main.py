from fastapi import FastAPI
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Caminho absoluto pro banco 
DB_PATH = os.path.join(os.path.dirname(__file__), "produtos.db")

conexao = sqlite3.connect(DB_PATH, check_same_thread=False)
cursor = conexao.cursor()

# Startup garante que a tabela existe antes de qualquer requisição
@app.on_event("startup")
def startup():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS produtos(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            preco REAL
        )
    """)
    conexao.commit()

@app.get("/produtos")
def listar():
    cursor.execute("SELECT * FROM produtos")
    linhas = cursor.fetchall()
    return [{"id": l[0], "nome": l[1], "preco": l[2]} for l in linhas]

@app.post("/produtos")
def criar(nome: str, preco: float):
    cursor.execute("""
        INSERT INTO produtos (nome, preco)
        VALUES (?, ?)
    """, (nome, preco))
    conexao.commit()
    return {"mensagem": "Criado!"}

@app.put("/produtos")
def alterar(id: int, nome: str, preco: float):
    cursor.execute("""
        UPDATE produtos
        SET nome = ?, preco = ?
        WHERE id = ?
    """, (nome, preco, id))
    conexao.commit()
    return {"mensagem": "Alterado!"}

@app.delete("/produtos")
def deletar(id: int):
    cursor.execute("""
                   DELETE FROM produtos
                   WHERE id = ?
                   """, (id,))
    conexao.commit()
    
    return{"mensagem": "Deletado"}
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)