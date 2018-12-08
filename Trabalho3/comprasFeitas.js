let emailLogin = window.localStorage.getItem("emailLogin");

if (!verificarLogin() || emailLogin == null || emailLogin == "undefined") {
    window.location.href = "galeriadeprodutos.html";
}

let comprasFeitas = [];
let $divCompras = $("#divCompras");

function mostrarCompra(compra) {
    let d = new Date(compra.date);

    let compraTemplate = [
        '<tr>',
            '<td>',
                dataFormatada(d),
            '</td>',
            '<td>',
                horaFormatada(d),
            '</td>',
            '<td>',
                'R$ ' + compra.valorTotal + ',00',
            '</td>',
        '</tr>',
    ].join('');

    $divCompras.append(compraTemplate);
}

function mostrarComprasFeitas() {
    let compras = [];

    $divCompras.html("");

    for (let i = 0; i < comprasFeitas.length; i++) {
        if (comprasFeitas[i].email == emailLogin) {
            compras.push(comprasFeitas[i]);
        }
    }

    for (let i = 0; i < compras.length; i++) {
        mostrarCompra(compras[i]);
    }
}

$.get("http://rest.learncode.academy/api/Maryanna/galeriadecompras", function (response) {
    comprasFeitas = response;
    mostrarComprasFeitas();
});

$("#botaoFinalizar").click(function () {
    carrinho.email = emailLogin;
    carrinho.date = new Date();

    $.ajax({
        url: "http://rest.learncode.academy/api/Maryanna/galeriadecompras",
        type: "POST",
        data: carrinho,
        success: function (data) {
            comprasFeitas.push(carrinho);

            carrinho = {
                valorTotal: 0,
                produtosCarrinho: []
            };

            window.localStorage.setItem("carrinho", JSON.stringify(carrinho));

            mostrarTelaFinalizarCompra();
            mostrarProdutosCarrinho();
            mostrarComprasFeitas();
        }
    });
});

mostrarTelaFinalizarCompra();