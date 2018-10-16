var acc = document.getElementsByClassName("titulo");
console.log('oooooooooi0')
var i;
console.log(acc)
console.log(acc.length)

function show(){   
    console.log('oooooooooi1')
    var conteudo = this.nextElementSibling;
    console.log('oooooooooi2') 
    if (conteudo.style.maxHeight === "500px"){
        conteudo.style.maxHeight = "0px";
        conteudo.style.paddingTop = "0px";
        conteudo.style.paddingBottom = "0px";
    } else {
        conteudo.style.maxHeight = "500px";
        conteudo.style.paddingTop = "10px";
        conteudo.style.paddingBottom = "10px";
    }
}

for (i = 0; i < acc.length; i++){
    console.log('oooooooooi')
    acc[i].addEventListener("click", show);
   
}

var span = document.querySelector("span");
span.addEventListener("click", function(){
    document.querySelector(".menu-lateral").classList.toggle("active");
    this.classList.toggle("empurrei");
    document.querySelector(".overlai").classList.toggle("display");
})