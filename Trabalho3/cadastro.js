function verificarLogin() {
    let emailLogin = window.localStorage.getItem("emailLogin");

    if (emailLogin != null && emailLogin != "undefined") {
        return true;
    }

    return false;
};

function validarCampos(campo) {
    return campo == null || campo == undefined || campo == "" || String(campo).trim() == "" || campo.length == 0;
};

let botaoLogin = document.querySelector(".bt-entrar");
let botaoCadastro = document.querySelector(".bt-cadastrar");
let botaoSair = document.querySelector(".sair");
let botaoCarrinho = document.querySelector(".btn-carrinho");
//let botaoQtd = document.querySelectorAll(".quantidade");

function mostrarBtLoginCadastro() {
    botaoCadastro.style.display = "block";
    botaoLogin.style.display = "block";
    botaoSair.style.display = "none";
    botaoCarrinho.style.display = "none";
    //    botaoQtd.style.display = "none";

}

function mostrarBtSairCarrinho() {
    botaoCadastro.style.display = "none";
    botaoLogin.style.display = "none";
    botaoSair.style.display = "block";
    botaoCarrinho.style.display = "block";
    //    botaoQtd.style.display = "block";
}

if (!verificarLogin()) {
    mostrarBtLoginCadastro();
} else {
    mostrarBtSairCarrinho();
}
let usuarios = [];
$.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/Maryanna/galeria',
    dataType: "json",
    success: function (data) {
        usuarios = data;

    }
});

$("#cadastro").submit(function () {
    let email = $("#email", this).val();
    let senha = $("#senha", this).val();
    let _this = this;

    if (validarCampos(email) || validarCampos(senha)) {
        alert("Preencha todos os campos!");
        return;
    }
    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/Maryanna/galeria',
        data: {
            email: email,
            senha: senha
        },
        success: function (data) {
            let email = $("#email", _this).val("");
            let senha = $("#senha", _this).val("");
        }
    });
    return false;
});

$("#login").submit(function () {
    let email = $("#email", this).val();
    let senha = $("#senha", this).val();
    if (validarCampos(email) || validarCampos(senha)) {
        alert("Preencha todos os campos!");
        return;
    }
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email == email && usuarios[i].senha == senha) {
            window.localStorage.setItem("emailLogin", usuarios[i].id);
            let emailUsuario = window.localStorage.getItem("emailLogin");
            console.log(idUsuario);
            mostrarBtSairCarrinho();
            break;
        }

    }
    return false;
});

$(".sair").click(function () {
    window.localStorage.removeItem("emailLogin");
    window.location.href = "galeriadeprodutos.html";
    console.log(window.localStorage.getItem("emailLogin"));
})
