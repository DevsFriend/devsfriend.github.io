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

if (sessionStorage.getItem("Base64-Mode") === null) {
    sessionStorage.setItem("Base64-Mode", "Base64 Encoder")
}

title.textContent = sessionStorage.getItem("Base64-Mode");
if (sessionStorage.getItem("Base64-Mode") === "Base64 Encoder") button.textContent = "Encode";
if (sessionStorage.getItem("Base64-Mode") === "Base64 Decoder") button.textContent = "Decode";


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

        if (title.textContent === "Base64 Encoder") {
            result.innerHTML = "<nobr>" + btoa(inputBox.value) + "</nobr>";
        }
        if (title.textContent === "Base64 Decoder") {
            result.innerHTML = "<nobr>" + atob(inputBox.value) + "</nobr>";
        }
        
        
    }else ShowAlert("Insert a String", "red")
}

function Switch(){
    resultDiv.classList.remove('active');


    if (title.textContent === "Base64 Encoder") {
        title.textContent = "Base64 Decoder";
        sessionStorage.setItem("Base64-Mode", "Base64 Decoder")

        button.textContent = "Decode";
        return
    }
    if (title.textContent === "Base64 Decoder") {
        title.textContent = "Base64 Encoder";
        sessionStorage.setItem("Base64-Mode", "Base64 Encoder")

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
