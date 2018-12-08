let idLogin = window.localStorage.getItem("idLogin");

let search = false;

window.addEventListener("load", function(){
    console.log(idLogin);
    if(idLogin == "null"){
        withoutLogin();
    }else{
        withLogin();
    }
})

let button = document.querySelector(".button-login");
let button_logout = document.querySelector(".button-logout");
let modal = document.querySelector(".modal");
let modal_overlay = document.querySelector(".modal-overlay");
let login = document.querySelector(".login");
let close = document.querySelector(".close");

let loading = document.querySelector(".loading");

let messages = document.querySelector(".messages");
let groupsList = document.querySelector(".groups-list");
let nameGroup = document.querySelector(".nomeGrupo");
let groupsHtml = [];

let addGroup = document.querySelector(".add-group");
let sendMessages = document.querySelector(".send-message");

let idInput = document.getElementById("id");
let form = document.getElementById("form-login");

function filled(text){
    if(text.trim().length > 0){
        return true
    }else{
        return false;
    }
};

function openModal(){
    button.addEventListener("click", function(){
        modal.style.display = "block";
        idInput.focus();
    });    
};

openModal();

function closeModal(){
    modal.style.display = "none";
};

window.addEventListener("click", function(event){
    if(event.target == modal_overlay){
        closeModal();
    }
});

close.addEventListener("click", closeModal);

function withLogin(){
    groupsList.style.display = "block";
    addGroup.style.display = "block";
    nameGroup.style.display = "block";
    messages.style.display = "block";
    button.style.display = "none";
    button_logout.style.display = "block";
}

function withoutLogin(){
    groupsList.style.display = "none";
    addGroup.style.display = "none";
    nameGroup.style.display = "none";
    messages.style.display = "none";
    sendMessages.style.display = "none";
    button.style.display = "block";
    button_logout.style.display = "none";

    for(let i = 0, size = groupsHtml.length; i<size; i++){
        groupsHtml[i].classList.remove("active");
    };

    messages.innerHTML = "";
}

form.addEventListener("submit", function(event){
    event.preventDefault();

    if(filled(idInput.value) == false){
        return;
    }

    window.localStorage.setItem("idLogin", idInput.value);
    idLogin = window.localStorage.getItem("idLogin");
    console.log(idLogin)
    idInput.value = "";
    nameGroup.innerHTML = "";
    withLogin();
    closeModal();
})

button_logout.addEventListener("click", function(){
    window.localStorage.setItem("idLogin", null);
    idLogin = window.localStorage.getItem("idLogin");
    console.log(idLogin)
    withoutLogin();
});

function showMessages(group){
    let name = group.groupName;
    let id = group.groupID;

    let groupName = document.createTextNode(name);
    nameGroup.innerHTML = "";
    messages.innerHTML = "";

    nameGroup.appendChild(groupName);

    loading.style.display = "block";

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            loading.style.display = "none";
            let obj = JSON.parse(xhttp.responseText);
            for(let i = 0, size = obj.length; i < size; i++){
                let msg = obj[i].message;
                let contact = obj[i].userName;
                showMessage(msg, contact);
            }

            messages.scrollTop = messages.scrollHeight;

            search = false;
        };
    };

    xhttp.open('GET','http://rest.learncode.academy/api/Maryanna/'+id, true);
    xhttp.send();
};

function showMessage(msg, contact){
    let message = document.createElement("div");
    let container = document.createElement("div")
    let nameContact = document.createElement("div");
    let messageContact = document.createElement("div");
    let name = document.createElement("span");
    let messageSpan = document.createElement("span");
    let textName = document.createTextNode(contact);
    let textMessage = document.createTextNode(msg);

    name.appendChild(textName);
    messageSpan.appendChild(textMessage);
    nameContact.appendChild(name);
    nameContact.classList.add("name-contact");
    messageContact.appendChild(messageSpan);
    messageContact.classList.add("message-contact");
    container.appendChild(nameContact);
    container.appendChild(messageContact);
    container.classList.add("message-container")
    message.appendChild(container);
    message.classList.add("message");

    messages.appendChild(message);

    if(contact==idLogin){
        message.classList.add("active");
    }
}

let buttonSend = document.querySelector(".button-send .button");
let messageInput = document.getElementById("message");

let clickGroup = undefined;
let sending = false;

let formMessage = document.getElementById("form-message");

messageInput.addEventListener("keypress", function(e){
    if(e.keyCode == 13 && !e.shiftKey){        
        e.preventDefault();
        
        buttonSendClick(e);
        return;
    }
});

function buttonSendClick(event){
    event.preventDefault();

    if(clickGroup == undefined){
        return;
    }

    if(sending == true){
        return;
    }
    sending = true;

    if(filled(messageInput.value)){
        sendMessage(clickGroup, messageInput.value);   
    }

    messages.scrollTop = messages.scrollHeight;
}

formMessage.addEventListener("submit", buttonSendClick);

function sendMessage(group, message){
    let id = group.groupID;

    let xhttp = new XMLHttpRequest();
    let msg = {"userName":idLogin, "message":message};
    xhttp.onreadystatechange = function(){
        if (xhttp.readyState==4){
            showMessage(messageInput.value, idLogin);
            messageInput.value = "";

            messages.scrollTop = messages.scrollHeight;

            sending = false;
        };
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/Maryanna/'+id, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let post = JSON.stringify(msg);
    xhttp.send(post);
};

function showGroups(Group){
    let group = document.createElement("div");
    let name_group = document.createElement("span");
    let icon = document.createElement("div");
    let img = document.createElement("img");
    let text = document.createTextNode(Group.groupName);

    img.src = "icone.png";

    name_group.classList.add("name");
    name_group.appendChild(text);
    group.appendChild(name_group);
    icon.classList.add("icon");
    icon.appendChild(img);
    group.appendChild(icon);
    group.classList.add("group");

    groupsList.appendChild(group);
    groupsHtml.push(group);

    group.addEventListener("click", function(){

        if(search == true){
            return;
        }
        search = true;

        sendMessages.style.display = "block";

        messageInput.focus();
        
        clickGroup = Group;

        messageInput.value="";
        showMessages(Group);

        for(let i = 0, size = groupsHtml.length; i<size; i++){
            groupsHtml[i].classList.remove("active");
        };

        this.classList.add("active");

    });
};

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
    if(xhttp.readyState==4){
        let obj_parsed = JSON.parse(xhttp.responseText);
        for(let i=0; i<obj_parsed.length; i++){
            showGroups(obj_parsed[i]);
        };
    };
};
xhttp.open('GET','http://rest.learncode.academy/api/Maryanna/grupos', true);
xhttp.send();

let buttonAdd = document.querySelector(".button-add .button");
let groupNameInput = document.querySelector("#group-name");
let groupIdInput = document.querySelector("#group-id");

function postGroup(name, id){
    let xhttp = new XMLHttpRequest();
    let group = {"groupName":name, "groupID":id};
    xhttp.onreadystatechange = function(){
        if(xhttp.readyState==4){
            showGroups(group);
            groupNameInput.value="";
            groupIdInput.value="";
        };
    };
    xhttp.open('POST', 'http://rest.learncode.academy/api/Maryanna/grupos', true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    let post = JSON.stringify(group);
    xhttp.send(post);
};

buttonAdd.addEventListener("click", function(event){
    event.preventDefault();

    if(filled(groupNameInput.value) == false || filled(groupIdInput.value) == false){
        return;
    }

    postGroup(groupNameInput.value, groupIdInput.value);
});