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

if (sessionStorage.getItem("Hex-Mode") === null) {
    sessionStorage.setItem("Hex-Mode", "Number to Hex")
}

title.textContent = sessionStorage.getItem("Hex-Mode");


inputBox.oninput = ()=>{
    resultDiv.classList.remove('active');
    xIcon.classList.add('active');

    if (inputBox.value == "") xIcon.classList.remove('active');

    if (sessionStorage.getItem("Hex-Mode") === "Number to Hex") inputBox.value = inputBox.value.replace(/[^0-9.]/g, ''); inputBox.placeholder = "Insert a Number... es: 37";
    if (sessionStorage.getItem("Hex-Mode") === "Hex to Number") inputBox.placeholder = "Insert a Hex Code... es: 0x71d";
}



xIcon.onclick = ()=>{
    xIcon.classList.remove('active');
    resultDiv.classList.remove('active');
    inputBox.value = "";
}

function Convert() {
    if (inputBox.value !== "") {
        if (title.textContent === "Number to Hex" && !isNaN(parseInt(inputBox.value))) {
            resultDiv.classList.add('active');
            result.innerHTML = "<nobr>0x" + Number(inputBox.value).toString(16) + "</nobr>";
        }
        if (title.textContent === "Hex to Number") {
            resultDiv.classList.add('active');
            result.innerHTML = "<nobr>" + parseInt(inputBox.value, 16) + "</nobr>";
        }
        
        
    }else ShowAlert("Insert a Value", "red")
}

function Switch(){
    resultDiv.classList.remove('active');


    if (title.textContent === "Number to Hex") {
        title.textContent = "Hex to Number";
        sessionStorage.setItem("Hex-Mode", "Hex to Number")
        inputBox.placeholder = "Insert a Hex Code... es: 0x71d";
        return
    }
    if (title.textContent === "Hex to Number") {
        title.textContent = "Number to Hex";
        sessionStorage.setItem("Hex-Mode", "Number to Hex")
        inputBox.placeholder = "Insert a Number... es: 37";

        inputBox.value = inputBox.value.replace(/[^0-9.]/g, '')
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

