
function adicionarAoCarrinho(id, nome, preco, imagem) {
    // Obtém o carrinho atual ou cria um novo array vazio
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    // Verifica se o produto já existe no carrinho
    const produtoExistente = carrinho.find(item => item.id === id);

    if (produtoExistente) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        produtoExistente.quantidade += 1;
    } else {
        // Caso contrário, adiciona o produto com quantidade 1 e imagem
        const produto = { id, nome, preco, imagem, quantidade: 1 };
        carrinho.push(produto);
    }

    // Atualiza o carrinho no localStorage
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    alert(`Produto ${nome} adicionado ao carrinho!`);
    exibirCarrinho(); // Atualiza a exibição do carrinho após adicionar
}

function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const listaCarrinho = document.getElementById("lista-carrinho");
    listaCarrinho.innerHTML = ''; // Limpa a lista antes de exibir os itens

    
    carrinho.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Exibe os detalhes do produto com a imagem
        card.innerHTML = `
        <div class="card-container">
            <img src="${item.imagem}" alt="${item.nome}" class="carrinho-imagem">
            <div class="carrinho-info">
                <h2 class="nome-prod">${item.nome}</h2>
                <p class="preco-prod">Preço: R$${item.preco.toFixed(2)}</p>
                <p class="quant-prod">Quantidade: ${item.quantidade}</p>
                <p class="total-prod">Total: R$${(item.preco * item.quantidade).toFixed(2)}</p>
                <div class="quantidade-botoes">
                    <button class="adicionar-prod btn btn-primary" onclick="atualizarQuantidade(${item.id}, ${item.quantidade + 1})">+</button>
                    <button class="subtrair-prod btn btn-primary" onclick="atualizarQuantidade(${item.id}, ${item.quantidade - 1})">-</button>
                    <button class="remover-prod btn btn-danger" onclick="removerItemDoCarrinho(${item.id})">Remover</button>
                </div>
            </div>
        </div>
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