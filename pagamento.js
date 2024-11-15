function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = function() {
    // Captura os parâmetros da URL da Página de Compra
    const produto = getParam('produto');
    const preco = getParam('preco');
    const imagem = getParam('imagem');

    // Exibe as informações do produto
    if (produto && preco && imagem) {
        document.getElementById('produto-nome').innerText = produto;
        document.getElementById('produto-preco').innerText = `R$ ${preco}`;
        document.getElementById('produto-imagem').src = imagem;
    } else {
        // Caso não haja parâmetros, exibe erro
        document.getElementById('produto-nome').innerText = "Produto não encontrado";
        document.getElementById('produto-preco').innerText = "Preço não disponível";
        document.getElementById('produto-imagem').src = "img/erro.png";
    }
};