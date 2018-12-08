let listaCompras = [];
$.ajax({
    type: 'GET',
    url: 'http://rest.learncode.academy/api/Anderson/listaCompras',
    dataType: "json",
    success: function (data) {
        listaCompras = data;

    }
});

$("#cadastro").submit(function () {
    let email = $("#email", this).val();
    let senha = $("#senha", this).val();
    let _this = this;

    $.ajax({
        type: 'POST',
        url: 'http://rest.learncode.academy/api/Anderson/listaCompras',
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

    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email == email && usuarios[i].senha == senha) {
            window.localStorage.setItem("idLogin", usuarios[i].id);
            let idUsuario = window.localStorage.getItem("idLogin");
            console.log(idUsuario);
            break;
        }
    }
    return false;
});
