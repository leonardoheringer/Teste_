function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = function() {
    // Captura os parâmetros passados pela URL da Página de Produtos
    const produto = getParam('produto');
    const preco = getParam('preco');
    const imagem = getParam('imagem');

    // Exibe as informações do produto na Página de Compra
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

    // Agora, cria a URL para a Página de Pagamento
    const confirmarLink = document.getElementById('confirmar-link');

    // Codifica os parâmetros novamente
    const produtoNomeCodificado = encodeURIComponent(produto);
    const produtoPrecoCodificado = encodeURIComponent(preco);
    const produtoImagemCodificada = encodeURIComponent(imagem);

    // Define o link para a Página de Pagamento
    confirmarLink.setAttribute('href', `pagamento.html?produto=${produtoNomeCodificado}&preco=${produtoPrecoCodificado}&imagem=${produtoImagemCodificada}`);
};