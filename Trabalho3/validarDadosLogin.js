let error1 = true;
let error2 = true;

function atualizarBotaoEntrar() {
    if (error1 == true || error2 == true) {
        $(".entrar").addClass("disabled");
    } else {
        $(".entrar").removeClass("disabled");
    }
}

$("#email").change(function () {
    if (this.value == "") {
        // Inválido
        $("#label1").show();
        $("#grupo1").addClass("has-error");
        error1 = true;
    } else {
        // Válido
        $("#label1").hide();
        $("#grupo1").removeClass("has-error");
        error1 = false;
    }
    atualizarBotaoEntrar();
})
$("#senha").change(function () {
    if (this.value == "") {
        // Inválido
        $("#label2").show();
        $("#grupo2").addClass("has-error");
        error2 = true;
    } else {
        // Válido
        $("#label2").hide();
        $("#grupo2").removeClass("has-error");
        error2 = false;
    }
    atualizarBotaoEntrar();
});