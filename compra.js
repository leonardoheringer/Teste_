function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

window.onload = function() {
    const produto = getParam('produto');
    const preco = getParam('preco');
    const imagem = getParam('imagem');

    if (produto && preco && imagem) {
        document.getElementById('produto-nome').innerText = produto;
        document.getElementById('produto-preco').innerText = `R$ ${preco}`;
        document.getElementById('produto-imagem').src = imagem;

        document.getElementById('produto-nome').classList.add('disponivel');
        document.getElementById('produto-preco').classList.add('disponivel');
        document.getElementById('produto-imagem').classList.add('disponivel');
    } else {
        document.getElementById('produto-nome').innerText = "Produto não encontrado";
        document.getElementById('produto-preco').innerText = "Preço não disponível";
        document.getElementById('produto-imagem').src = "img/erro.png";

        document.getElementById('produto-nome').classList.add('indisponivel');
        document.getElementById('produto-preco').classList.add('indisponivel');
        document.getElementById('produto-imagem').classList.add('indisponivel');
    }
}