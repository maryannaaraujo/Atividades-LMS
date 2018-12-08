$itensCarrinho = $("#itens-carrinho");

function criarCarrinho() {
    let carrinho = {
        valorTotal: 0,
        produtosCarrinho: []
    };

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

function adicionarCarrinho(produto, quantidade) {
    let carrinho = window.localStorage.getItem("carrinho");

    if (carrinho == null || carrinho == "undefined") {
        return false;
    }

    carrinho = JSON.parse(carrinho);
    carrinho.valorTotal += produto.valor * quantidade;

    for (let i = 0; i < carrinho.produtosCarrinho.length; i++) {
        if (carrinho.produtosCarrinho[i].id == produto.id) {
            carrinho.produtosCarrinho[i].quantidade += quantidade;

            window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
            return;
        }
    }
    produto.quantidade = quantidade;
    carrinho.produtosCarrinho.push(produto);

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
};

function mostrarProdutosCarrinho() {
    $itensCarrinho.html("");

    let carrinho = window.localStorage.getItem("carrinho");

    if (carrinho == null || carrinho == "undefined") {
        criarCarrinho();

        carrinho = {
            valorTotal: 0,
            produtosCarrinho: []
        };
    } else {
        carrinho = JSON.parse(carrinho);
    }

    console.log(carrinho);

    for (let i = 0; i < carrinho.produtosCarrinho.length; i++) {
        criarProdutoCarrinho(carrinho.produtosCarrinho[i]);
    }

    if (carrinho.produtosCarrinho.length > 0) {
        let finalizar = [
               '<li class="divider"></li>',
                '<li>',
                    '<a class="text-center" href="suascompras.html">Finalizar Compra</a>',
                '</li>'
            ].join('');

        $itensCarrinho.append(finalizar);
    } else {
        $itensCarrinho.append('<li> <p style="padding:5px; text-align:center;"> Seu carrinho está VAZIO :/</p> </li>');
    }
}

function removerProdutoCarrinho(produto) {
    let carrinho = window.localStorage.getItem("carrinho");

    if (carrinho == null || carrinho == "undefined") {
        return false;
    }

    carrinho = JSON.parse(carrinho);

    let produtosCarrinho = [];
    let valor = 0;

    for (let i = 0; i < carrinho.produtosCarrinho.length; i++) {
        if (carrinho.produtosCarrinho[i].id != produto.id) {
            valor += carrinho.produtosCarrinho[i].valor * carrinho.produtosCarrinho[i].quantidade;
            produtosCarrinho.push(carrinho.produtosCarrinho[i]);
        }
    }

    carrinho.produtosCarrinho = produtosCarrinho;
    carrinho.valorTotal = valor;

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function criarProdutoCarrinho(produto) {
    console.log(produto);
    let produtoCarrinho = [
            '<li id="produto-carrinho' + produto.id + '">',
                '<span class="item">',
                    '<span class="item-left">',
                        '<img style = "width:50px; height:50px;"src="img/' + produto.imagem + ' "alt=""/>',
                        '<span class="item-info">',
                            '<span>' + produto.nome + '</span>',
                            '<span>R$' + produto.valor + '</span>',
                        '</span>',
                    '</span>',
                    '<span class="item-right">',
                        '<button class="btn btn-xs btn-danger pull-right">x</button>',
                    '</span>',
                '</span>',
            '</li>'
        ].join('');

    $itensCarrinho.append(produtoCarrinho);

    $("button", "#produto-carrinho" + produto.id).click(function () {
        removerProdutoCarrinho(produto);
        mostrarProdutosCarrinho();
        if (exibirFinalizarCompra) {
            exibirFinalizarCompra();
        }
    });
}

function alterarQuantidadeCarrinho(produto, quantidade) {
    let carrinho = window.localStorage.getItem("carrinho");

    if (carrinho == null || carrinho == "undefined") {
        return false;
    }

    carrinho = JSON.parse(carrinho);

    for (let i = 0; i < carrinho.produtosCarrinho.length; i++) {
        if (carrinho.produtosCarrinho[i].id == produto.id) {
            carrinho.produtosCarrinho[i].quantidade = quantidade;
            break;
        }
    }

    window.localStorage.setItem("carrinho", JSON.stringify(carrinho));
}
mostrarProdutosCarrinho();