const Main = document.querySelector('.Main');
const Alert = document.querySelector('.alert');
const AlertText = document.querySelector('.alert p');

const inputDiv = Main.querySelector('.InputDiv');
const inputBox = inputDiv.querySelector('.input');
const addButton = inputDiv.querySelector('.icon');

const listDiv = Main.querySelector('.ListDiv');

if (!localStorage.getItem("List")) {
    localStorage.setItem("List", JSON.stringify([]))
}


function addElement(element, index) {
    listDiv.classList.add("active")

    listDiv.innerHTML +=`
    <div class="item" id="${index}">
        <input type="checkbox" onchange="Select(this)" class="check")}>
        <p class="title">${element}</p>

        <i onclick="modifyElement(this.parentNode)" class="fa-solid fa-pen-to-square icon"></i>
        <i onclick="deleteElement(this, this.parentNode.id)" class="fa-solid fa-trash icon"></i>
        
    </div>`

    UpdateSelectedList()
}

function deleteElement(element, id) {
    let list = JSON.parse(localStorage.getItem("List"))
    
    list.splice(parseInt(id), 1)

    localStorage.setItem("List", JSON.stringify(list))
    element.parentNode.remove()

    if (JSON.parse(localStorage.getItem("List")).length === 0) {
        listDiv.classList.remove("active")
    }

    let text = element.parentNode.querySelector('.title').textContent
    
    if(text.length > 7){
        ShowAlert(`"${text.replace(text.substring(8), "")}-" has been removed`, "green")
    }else ShowAlert(`"${text}" has been removed`, "green")
    UpdateElementId()
}

let elementToModify
function modifyElement(element) {
    inputBox.value = element.querySelector(".title").textContent
    addButton.classList.remove("fa-plus")
    addButton.classList.add("fa-check")

    elementToModify = element;
}

function Select(element) {
    let list = JSON.parse(localStorage.getItem("List"))

    if (element.checked) {
        element.parentNode.querySelector('.title').classList.add('selected'); 
        list[parseInt(element.parentNode.id)][element.parentNode.querySelector('.title').textContent] = true;
    } else {
        element.parentNode.querySelector('.title').classList.remove('selected');
        list[parseInt(element.parentNode.id)][element.parentNode.querySelector('.title').textContent] = false;
    }

    localStorage.setItem("List", JSON.stringify(list))
}


function UpdateElementId() {
    let newId = 0;
    listDiv.querySelectorAll('.item').forEach((element)=>{
        element.id = newId.toString()
        newId += 1;
    })
}

function UpdateSelectedList() {
    listDiv.querySelectorAll('.item').forEach((element)=>{
        let list = JSON.parse(localStorage.getItem("List"))
            
        let checkbox = element.querySelector(".check");
        let title = element.querySelector('.title')
        let id = parseInt(element.id)


        checkbox.checked = list[id][title.textContent]

        if (checkbox.checked) title.classList.add('selected');
        else title.classList.remove('selected')
    })
}




function LoadList() {
    listDiv.innerHTML = '';
    let id = 0
    JSON.parse(localStorage.getItem("List")).forEach((element)=>{
        addElement(Object.keys(element)[0], id.toString())
        id += 1;
    })

    if (JSON.parse(localStorage.getItem("List")).length === 0) {
        listDiv.classList.remove("active")
    }
}


function ShowAlert(text, bgcolor) {
    Alert.classList.remove("active");

    Alert.classList.add("active");
    AlertText.textContent = text;
    Alert.style.backgroundColor = bgcolor;

    setTimeout(() => {  Alert.classList.remove("active"); }, 5000);
}


function Add() {
    if (inputBox.value.trim() !== "") {
        let list = JSON.parse(localStorage.getItem("List"))

        list.push(JSON.parse('{"' + inputBox.value + '": false}'))
        
        localStorage.setItem("List", JSON.stringify(list))

        addElement(inputBox.value, (list.length-1).toString())

        if(inputBox.value.length > 7){
            ShowAlert(`"${inputBox.value.replace(inputBox.value.substring(8), "")}-" has been added`, "green")
        }else ShowAlert(`"${inputBox.value}" has been added`, "green")
        

        inputBox.value = "";
    } else{
        ShowAlert("Cannot insert an empty string", "red")
    }
}

function Modify() {
    let list = JSON.parse(localStorage.getItem("List"));

    

    if (inputBox.value !== "") {
        var str = JSON.stringify(list[parseInt(elementToModify.id)]);
        str = str.replace(elementToModify.querySelector(".title").textContent, inputBox.value);
        list[parseInt(elementToModify.id)] = JSON.parse(str);
        elementToModify.querySelector(".title").textContent = inputBox.value;
        localStorage.setItem("List", JSON.stringify(list))

        if(inputBox.value.length > 7){
            ShowAlert(`"${inputBox.value.replace(inputBox.value.substring(8), "")}-" has been modified`, "green")
        }else ShowAlert(`"${inputBox.value}" has been modified`, "green")
    } else{
       ShowAlert('Cannot Change an Element to an Empty String', 'red')
    }

    elementToModify = null;
    inputBox.value = "";
    addButton.classList.remove("fa-check");
    addButton.classList.add("fa-plus")
}

inputBox.onkeyup = (key)=>{
    if (key.keyCode === 13) {
        if (addButton.classList.contains("fa-plus")) {
            Add()
        }
        if (addButton.classList.contains("fa-check")) {
            Modify()
        }
    }
}


addButton.onclick = ()=>{
    if (addButton.classList.contains("fa-plus")) {
        Add()
    }
    if (addButton.classList.contains("fa-check")) {
        Modify()
    }
}

// https://www.codegrepper.com/code-examples/javascript/javascript+download+string+as+file
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

function Export() {
    if (JSON.parse(localStorage.getItem('List')).length > 0) {
        download("ToDoList.json", localStorage.getItem('List'));
        ShowAlert("List Exported", "green")
    }else ShowAlert("Cannot Export an Empty List", "red");
}

const fileSelector = document.getElementById('Import');
fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    if (fileList[0].text().then((data) => data.length > 0)) fileList[0].text().then((data)=> localStorage.setItem("List", data)).then(() => {LoadList(); UpdateSelectedList(); ShowAlert("List Imported", "green");});
    else ShowAlert("Import a Valid List", "red");
});


LoadList()
UpdateSelectedList()
