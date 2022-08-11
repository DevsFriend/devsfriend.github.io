const Main = document.querySelector('.Main');
const title = Main.querySelector('.title');

const inputDiv = Main.querySelector('.InputDiv');
const inputBox = inputDiv.querySelector('.input');
const xIcon = inputDiv.querySelector('.xIcon');


const button = Main.querySelector('.button');
const icon = Main.querySelector('.icon i');

const result = Main.querySelector('.result');
const resultDiv = Main.querySelector('.ResultDiv');

const Alert = document.querySelector('.alert');
const AlertText = document.querySelector('.alert p');

if (sessionStorage.getItem("Utf-8-Mode") === null) {
    sessionStorage.setItem("Utf-8-Mode", "Utf-8 Encoder")
}

title.textContent = sessionStorage.getItem("Utf-8-Mode");
if (sessionStorage.getItem("Utf-8-Mode") === "Utf-8 Encoder") button.textContent = "Encode";
if (sessionStorage.getItem("Utf-8-Mode") === "Utf-8 Decoder") button.textContent = "Decode";


inputBox.oninput = ()=>{
    resultDiv.classList.remove('active');
    xIcon.classList.add('active');

    if (inputBox.value == "") xIcon.classList.remove('active');
}



xIcon.onclick = ()=>{
    xIcon.classList.remove('active');
    resultDiv.classList.remove('active');
    inputBox.value = "";
}


String.prototype.toUtf8 = function(){
    var result = "";
    for(var i = 0; i < this.length; i++){
        // Assumption: all characters are < 0xffff
        result += "\\u" + ("000" + this[i].charCodeAt(0).toString(16)).substr(-4);
    }
    return result;
};




function Convert(){
    if (inputBox.value !== "") {
        resultDiv.classList.add('active');

        if (title.textContent === "Utf-8 Encoder") {
            result.innerHTML = "<nobr>" + inputBox.value.toUtf8() + "</nobr>";
        }
        if (title.textContent === "Utf-8 Decoder") {
            result.innerHTML = "<nobr>" + decodeURIComponent(JSON.parse('"' + inputBox.value.replace(/\"/g, '\\"') + '"')) + "</nobr>";
        }
        
        
    }else ShowAlert("Insert a Value", "red")
}

function Switch(){
    resultDiv.classList.remove('active');


    if (title.textContent === "Utf-8 Encoder") {
        title.textContent = "Utf-8 Decoder";
        sessionStorage.setItem("Utf-8-Mode", "Utf-8 Decoder")

        button.textContent = "Decode";
        return
    }
    if (title.textContent === "Utf-8 Decoder") {
        title.textContent = "Utf-8 Encoder";
        sessionStorage.setItem("Utf-8-Mode", "Utf-8 Encoder")

        button.textContent = "Encode";
        return
    }
}

function Copy(){ 
    navigator.clipboard.writeText(result.textContent);
    ShowAlert("Copied", "green")
}


function ShowAlert(text, bgcolor) {
    Alert.classList.remove("active");

    Alert.classList.add("active");
    AlertText.textContent = text;
    Alert.style.backgroundColor = bgcolor;

    setTimeout(() => {  Alert.classList.remove("active"); }, 5000);
}
