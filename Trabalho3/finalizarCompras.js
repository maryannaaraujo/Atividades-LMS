$finalizar = $("#finalizar");

$(".sair").click(function () {
    window.localStorage.removeItem("emailLogin");
    window.location.href = "galeriadeprodutos.html";
    console.log(window.localStorage.getItem("emailLogin"));
})

function verificarLogin() {
    let emailLogin = window.localStorage.getItem("emailLogin");

    if (emailLogin != null && emailLogin != "undefined") {
        return true;
    }

    return false;
};

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


function mostrarTelaFinalizarCompra() {
    $finalizar.html("");


    for (let i = 0; i < carrinho.produtosCarrinho.length; i++) {
        mostrarItemFinalizarCompra(carrinho.produtosCarrinho[i]);
    }


    $("#total").html("R$ " + carrinho.valorTotal + ",00");
}

function mostrarItemFinalizarCompra(item) {
    let compra = [
        '<tr id="finalizar" id="item' + item.id + '">',
            '<td class="col-sm-8 col-md-6 ">',
                '<div class="media">',
                    '<a class="thumbnail pull-left" href="#"> <img class="media-object" src="img/' + item.imagem + '" style="width: 72px; height: 72px;"> </a>',
                    '<div class="media-body">',
                        '<h4 class="media-heading"><a href="#">' + item.nome + '</a></h4>',
                    '</div>',
                '</div>',
            '</td>',
            '<td class="col-sm-1 col-md-1" style="text-align: center">',
                '<input type="number" class="form-control" id="exampleInputEmail1" value="' + item.quantidade + '" min="1">',
            '</td>',
            '<td class = "col-sm-1 col-md-1 text-center" > <strong> R$ ' + item.valor + ',00 </strong></td >',
            '<td class = "col-sm-1 col-md-1" >',
                '<button type = "button" class = "btn btn-danger" id="button' + item.id + '">',
                    '<span class = "glyphicon glyphicon-remove"> </span> Remover',
                '</button>',
            '</td >',
        '</tr>'
    ].join('');

    $finalizar.append(compra);

    $("#button" + item.id).click(function () {
        console.log("teste");
        removerProdutoCarrinho(item);
        carrinho = window.localStorage.getItem("carrinho");

        if (carrinho == null || carrinho == "undefined") {
            criarCarrinho();

            carrinho = {
                valorTotal: 0,
                produtosCarrinho: []
            };
        } else {
            carrinho = JSON.parse(carrinho);
        }
        mostrarTelaFinalizarCompra();
        mostrarProdutosCarrinho();
    });
}

mostrarTelaFinalizarCompra();