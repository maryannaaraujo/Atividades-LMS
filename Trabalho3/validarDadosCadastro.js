let error3 = true;
let error4 = true;


function atualizarBotaoCadastrar() {
    if (error3 == true || error4 == true) {
        $(".cadastrar").addClass("disabled");
    } else {
        $(".cadastrar").removeClass("disabled");
    }
}
$("#email").change(function () {
    if (this.value == "") {
        // Inválido
        $("#label3").show();
        $("#grupo3").addClass("has-error");
        error3 = true;
    } else {
        // Válido
        $("#label3").hide();
        $("#grupo3").removeClass("has-error");
        error3 = false;
    }
    atualizarBotaoCadastrar();
})
$("#senha").change(function () {
    if (this.value == "") {
        // Inválido
        $("#label4").show();
        $("#grupo4").addClass("has-error");
        error4 = true;
    } else {
        // Válido
        $("#label4").hide();
        $("#grupo4").removeClass("has-error");
        error4 = false;
    }
    atualizarBotaoCadastrar();
});