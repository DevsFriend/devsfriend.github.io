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

if (sessionStorage.getItem("Binary-Mode") === null) {
    sessionStorage.setItem("Binary-Mode", "Number to Binary")
}

title.textContent = sessionStorage.getItem("Binary-Mode");


inputBox.oninput = ()=>{
    resultDiv.classList.remove('active');
    xIcon.classList.add('active');

    if (inputBox.value == "") xIcon.classList.remove('active');

    if (sessionStorage.getItem("Binary-Mode") === "Number to Binary") inputBox.value = inputBox.value.replace(/[^0-9.]/g, ''); inputBox.placeholder = "Insert a Number... es: 37";
    if (sessionStorage.getItem("Binary-Mode") === "Binary to Number") inputBox.value = inputBox.value.replace(/[^0-1.]/g, ''); inputBox.placeholder = "Insert a Binary Number... es: 37";
}



xIcon.onclick = ()=>{
    xIcon.classList.remove('active');
    resultDiv.classList.remove('active');
    inputBox.value = "";
}

function Convert() {
    if (inputBox.value !== "" && !isNaN(parseInt(inputBox.value))) {
        if (title.textContent === "Number to Binary") {
            resultDiv.classList.add('active');
            result.innerHTML = "<nobr>" + Number(inputBox.value).toString(2) + "</nobr>";
        }

        if (title.textContent === "Binary to Number") {
            resultDiv.classList.add('active');
            result.innerHTML = "<nobr>" + parseInt(inputBox.value, 2) + "</nobr>";
        }
        
        
    }else ShowAlert("Insert a Number", "red")
}

function Switch(){
    resultDiv.classList.remove('active');


    if (title.textContent === "Number to Binary") {
        title.textContent = "Binary to Number";
        sessionStorage.setItem("Binary-Mode", "Binary to Number")
        inputBox.value = inputBox.value.replace(/[^0-1.]/g, '')
        inputBox.placeholder = "Insert a Binary Number... es: 10110";
        return
    }
    if (title.textContent === "Binary to Number") {
        title.textContent = "Number to Binary";
        sessionStorage.setItem("Binary-Mode", "Number to Binary");
        inputBox.value = inputBox.value.replace(/[^0-9.]/g, '');
        inputBox.placeholder = "Insert a number... es: 37";
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
