function dataFormatada(data) {
    let dia = data.getDate();
    if (dia.toString().length == 1)
        dia = "0" + dia;
    let mes = data.getMonth() + 1;
    if (mes.toString().length == 1)
        mes = "0" + mes;
    let ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}

function horaFormatada(data) {
    let h = data.getHours();
    if (h.toString().length == 1)
        h = "0" + h;
    let m = data.getMinutes();
    if (m.toString().length == 1)
        m = "0" + m;
    return h + ":" + m;
}