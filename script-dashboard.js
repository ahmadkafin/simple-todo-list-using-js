const isLogin = sessionStorage.getItem("login");
const username = sessionStorage.getItem("on");
const selects = document.getElementById("selects");
const select = document.getElementsByClassName("select");
const tableBody = document.getElementById("table-body");
const addToDo = document.getElementById("add-todo");

if (isLogin === "false") {
    console.log(false);
    window.location.href = "login.html";
}

selects.addEventListener("change", function (e) {
    for (const prop of select) {
        if (selects.checked) {
            prop.setAttribute("checked", true);
        } else {
            if (!prop.hasAttribute("disabled")) {
                prop.removeAttribute("checked");
            }
        }
    }
});

for (var x = 0; x < localStorage.length; x++) {
    if (localStorage.key(x).includes(`${username}_todo`)) {
        var value = localStorage.getItem(localStorage.key(x));
        var cont = JSON.parse(value);
        addChild(cont.content, cont.status);
    } else {
        continue;
    }
}

addToDo.addEventListener("keyup", function (e) {
    var todoObj = {};
    for (var z = 0; z < localStorage.length; z++) {
        if (`${username}_todo_${this.value}` === localStorage.key(z)) {
            console.log("this!");
            break;
        } else {
            if (e.keyCode === 13) {
                todoObj = {
                    uID: username,
                    content: this.value,
                    status: 0,
                }
                localStorage.setItem(`${username}_todo_${this.value}`, JSON.stringify(todoObj));
                addChild(todoObj.content, todoObj.status);
                this.value = "";
            }
            break;
        }
    }
})

function addChild(value, status) {
    let isDone = (status === 1 ? 'done' : 'danger');
    let isDoneText = (status === 1 ? 'done' : 'not done!');
    let isChecked = (status === 1 ? 'checked disabled' : '');
    let isCheck = (status === 1 ? 'class ="coret"' : '');
    var contents = `<td><input type='checkbox' ${isChecked} class='select' value="${value}"></td><td ${isCheck}><p>${value}</p><input type="text" value="${value}" class="hidden"/></td><td><span class='badge ${isDone}'>${isDoneText}</span></td>`;
    var d = document.createElement("tr");
    d.innerHTML = contents;
    tableBody.prepend(d);
}


const s = tableBody.querySelectorAll("input[type='checkbox']");
for (const input of s) {
    let todoObjUpdate = {};
    input.addEventListener("change", function (e) {
        todoObjUpdate = {
            uID: username,
            content: this.value,
            status: 1,
        }
        localStorage.setItem(`${username}_todo_${this.value}`, JSON.stringify(todoObjUpdate));
        window.location.href = "dashboard.html";
    });
}

const el = tableBody.querySelectorAll("p");
const btnEdit = document.getElementById("btn-edit");

btnEdit.addEventListener("click", function () {
    if (this.innerText === "Edit") {
        changeElement();
        this.innerText = "Please enter to save.";
        this.setAttribute("disabled", true);
    }
});

function changeElement() {
    for (const p of el) {
        p.classList.add("hidden");
        p.nextSibling.classList.remove("hidden");
        const sibling = p.nextSibling;
        const oldVal = sibling.value;
        sibling.addEventListener("keyup", function (e) {
            if (e.keyCode === 13) {
                localStorage.removeItem(`${username}_todo_${oldVal}`);
                updateContent(this.value);
                btnEdit.innerText = "Edit";
                window.location.href = "dashboard.html";
            }
        });
    }
}

function updateContent(value) {
    let todoObjup = {};
    todoObjup = {
        uID: username,
        content: value,
        status: 0,
    }
    localStorage.setItem(`${username}_todo_${value}`, JSON.stringify(todoObjup));
}

const btnLogout = document.getElementById("logout");
btnLogout.addEventListener("click", function () {
    sessionStorage.setItem("login", false);
    sessionStorage.removeItem("on");
    window.location.replace("login.html");
});