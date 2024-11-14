
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listaCarrinho = document.getElementById("lista-carrinho");
    listaCarrinho.innerHTML = ''; // Limpa a lista antes de exibir os itens

    carrinho.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Exibe os detalhes do produto
        card.innerHTML = `
            <h2>${item.nome}</h2>
            <p>Preço: R$${item.preco.toFixed(2)}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Total: R$${(item.preco * item.quantidade).toFixed(2)}</p>
            <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
            <button onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
            <button onclick="removerItemDoCarrinho(${item.id})">Remover</button>
        `;

        listaCarrinho.appendChild(card);
    });

    // Atualiza o valor total de todos os itens no carrinho
    document.getElementById("total").textContent = `Total do Carrinho: R$${calcularTotalCarrinho().toFixed(2)}`;
}

function atualizarQuantidade(id, novaQuantidade) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const produto = carrinho.find(item => item.id === id);
    if (produto) {
        produto.quantidade = novaQuantidade > 0 ? novaQuantidade : 1; // Define quantidade mínima de 1
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        exibirCarrinho(); // Atualiza a exibição do carrinho
    }
}

function removerItemDoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter(item => item.id !== id); // Remove o item pelo id
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

function limparCarrinho() {
    localStorage.removeItem("carrinho"); // Remove todo o carrinho
    exibirCarrinho(); // Atualiza a exibição do carrinho
}

function calcularTotalCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

window.onload = exibirCarrinho; // Exibe o carrinho ao carregar a página
