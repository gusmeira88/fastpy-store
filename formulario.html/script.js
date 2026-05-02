const API = "http://127.0.0.1:8000"

async function carregar() {
    const res = await fetch(`${API}/produtos`)
    const produtos = await res.json()

    const lista = document.getElementById("lista")
    if (!lista) return

    const naTelaAlterar = document.getElementById("id-selecionado")

    lista.innerHTML = ""
    produtos.forEach(p => {
        if (naTelaAlterar) {
            lista.innerHTML += `
                <li onclick="selecionar(${p.id}, '${p.nome}', ${p.preco})" style="cursor:pointer">
                    ${p.nome} - ${formatarPreco(p.preco)}
                </li>`
        } else {
            lista.innerHTML += `
                <li>
                    ${p.nome} - ${formatarPreco(p.preco)}
                    <button onclick="deletar(${p.id})" style="width:auto; padding: 4px 8px;">🗑️</button>
                </li>`
        }
    })
}

function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function mascaraPreco(input) {
    let valor = input.value.replace(/\D/g, '')
    valor = (parseInt(valor) / 100).toFixed(2)
    input.value = 'R$ ' + valor.replace('.', ',')
}

async function criar(event) {
    event.preventDefault()
    const nome = document.getElementById("nome").value.trim()
    const preco = parseFloat(document.getElementById("preco").value.replace('R$ ', '').replace(',', '.'))

    if (!nome) { alert("Digite o nome do produto!"); return }
    if (!preco || preco <= 0) { alert("Digite um preço válido!"); return }

    await fetch(`${API}/produtos?nome=${nome}&preco=${preco}`, { method: "POST" })
    carregar()
}

function selecionar(id, nome, preco) {
    document.getElementById("id-selecionado").value = id
    document.getElementById("nome").value = nome
    document.getElementById("preco").value = preco
}

async function alterar(event) {
    event.preventDefault()
    const id = document.getElementById("id-selecionado").value
    const nome = document.getElementById("nome").value
    const preco = parseFloat(document.getElementById("preco").value.replace('R$ ', '').replace(',', '.'))

    await fetch(`${API}/produtos?id=${id}&nome=${nome}&preco=${preco}`, { method: "PUT" })
    carregar()
}

async function deletar(id) {
    if (confirm("Tem certeza que deseja deletar?")) {
        await fetch(`${API}/produtos?id=${id}`, { method: "DELETE" })
        carregar()
    }
}

carregar()