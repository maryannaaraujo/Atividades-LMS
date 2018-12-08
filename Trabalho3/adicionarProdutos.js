let listaProdutos = [
    {
        nome: 'BASE LES BEIGES CHANEL',
        valor: 375,
        id: 01,
        imagem: 'maquiagem1.jpg',
    },
    {
        nome: 'PALETA FACIAL TOO FACED',
        valor: 298,
        id: 02,
        imagem: 'maquiagem2.jpg',
    },
    {
        nome: 'BATOM MATTE TOM FORD',
        valor: 270,
        id: 03,
        imagem: 'maquiagem3.jpg',
    },
    {
        nome: 'GEL ILUMINADOR JELLY BEAN FARSALI',
        valor: 319,
        id: 04,
        imagem: 'maquiagem4.jpg',
    },
    {
        nome: 'PÓ TRANSLUCIDO LAURA MERCIER',
        valor: 129,
        id: 05,
        imagem: 'maquiagem5.jpg',
    },
    {
        nome: 'GLOSS LABIAL DIOR',
        valor: 149,
        id: 06,
        imagem: 'maquiagem6.jpg',
    },
    {
        nome: 'PALETA DE CONTORNO NYX',
        valor: 170,
        id: 07,
        imagem: 'maquiagem7.jpg',
    },
    {
        nome: 'PALETA DE SOMBRA NATASHA DENONA',
        valor: 294,
        id: 08,
        imagem: 'maquiagem8.jpg',
    }
];

$(function () {

    $cardsProdutos = $("#cards-produtos");

    function adicionarProdutos() {
        $cardsProdutos.html("");
        for (let i = 0, len = listaProdutos.length; i < len; i++) {
            adicionarProduto(listaProdutos[i]);
        }
    }

    function adicionarProduto(produto) {
        let card = [
            '<div class = "col-sm-3" id="produto' + produto.id + '">',
                '<article class = "col-item" >',
                    '<div class = "photo">',
                        '<form class = "form carrinho"role = "form" >',
                            '<div class = "options" >',
                                '<input type = "number" class = "form-control input-sm quantidade "value = "1" min = "1" >',
                            '</div>',
                            '<div class = "options-cart" >',
                                '<button class = "btn btn-default item-carrinho" title = "Add to cart" >',
        					       '<span class = "fa fa-shopping-cart " >', '</span>',
        				        '</button>',
                            '</div>',
                        '</form>',
                        '<a href = "#" >',
                            '<img src = "img/' + produto.imagem + ' " class = "img-responsive", alt = "Product Image"/>',
                        '</a>',
                    '</div>',
                    '<div class = "info" >',
                        '<div class = "row" >',
                            '<div class = "price-details col-md-6" >',
                                '<p class = "details" >' + produto.nome + '</p>',
                                '<span class = "price-new">R$' + produto.valor + ',00</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</article>',
            '</div>'
        ].join('');

        $cardsProdutos.append(card);

        $("form", "#produto" + produto.id).submit(function () {
            let quantidade = $("input", this).val();
            quantidade = parseInt(quantidade);
            adicionarCarrinho(produto, quantidade);
            mostrarProdutosCarrinho();
            return false;
        });
    }


    adicionarProdutos();
});