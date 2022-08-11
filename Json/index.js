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

inputBox.oninput = ()=>{
    resultDiv.classList.remove('active');
    xIcon.classList.add('active');

    if (inputBox.value == "") xIcon.classList.remove('active');
}

function isJson(item) {
    item = typeof item !== "string"
        ? JSON.stringify(item)
        : item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}


xIcon.onclick = ()=>{
    xIcon.classList.remove('active');
    resultDiv.classList.remove('active');
    inputBox.value = "";
}

function Convert(){
    if (inputBox.value !== "" && isJson(inputBox.value)) {
        resultDiv.classList.add('active');

        result.textContent = JSON.stringify(JSON.parse(inputBox.value) , null, "\t");

    }else{ShowAlert("Insert a JSON", "red")}
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

