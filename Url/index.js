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


if (sessionStorage.getItem("Url-Mode") === null) {
    sessionStorage.setItem("Url-Mode", "Url Encoder")
}

title.textContent = sessionStorage.getItem("Url-Mode");
if (sessionStorage.getItem("Url-Mode") === "Url Encoder") button.textContent = "Encode";
if (sessionStorage.getItem("Url-Mode") === "Url Decoder") button.textContent = "Decode";


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

function Convert(){
    if (inputBox.value !== "") {
        resultDiv.classList.add('active');

        if (title.textContent === "Url Encoder") {
            result.innerHTML = "<nobr>" + encodeURIComponent(inputBox.value) + "</nobr>";
        }
        if (title.textContent === "Url Decoder") {
            result.innerHTML = "<nobr>" + decodeURIComponent(inputBox.value) + "</nobr>";
        }
        
        
    }else ShowAlert("Insert an Url", "red")
}

function Switch(){
    resultDiv.classList.remove('active');


    if (title.textContent === "Url Encoder") {
        title.textContent = "Url Decoder";
        sessionStorage.setItem("Url-Mode", "Url Decoder")

        button.textContent = "Decode";
        return
    }
    if (title.textContent === "Url Decoder") {
        title.textContent = "Url Encoder";
        sessionStorage.setItem("Url-Mode", "Url Encoder")

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

