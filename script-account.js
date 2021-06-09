const currUser = sessionStorage.getItem("on");
const userInfo = localStorage.getItem(currUser);
const updateForm = document.getElementById("updateForm");
const inputForm = updateForm.querySelectorAll("input");
const jsnParse = JSON.parse(userInfo);

document.getElementById("firstName").value = jsnParse.fName;
document.getElementById("lastName").value = jsnParse.lName;
document.getElementById("email").value = jsnParse.email;

let email = document.getElementById("email");
let fName = document.getElementById("firstName");
let lName = document.getElementById("lastName");
let pass = document.getElementById("password");



updateForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let updateObj = {};
    let pwd = pass.value === "" ? jsnParse.password : pass.value;
    updateObj = {
        email: email.value,
        fName: fName.value,
        lName: lName.value,
        password: pwd,
        terms: "on"
    }
    if (email.value !== jsnParse.email) {
        var cnfrm = confirm("we notice that you want to change your email, if you aggree to do this. your current todo list will dissapear, are you sure you want continue?");
        if (cnfrm) {
            localStorage.removeItem(currUser);
            localStorage.setItem(currUser, JSON.stringify(updateObj));
            sessionStorage.setItem("on", email.value);
        }
    } else {
        localStorage.setItem(currUser, JSON.stringify(updateObj));
        sessionStorage.setItem("on", email.value);
    }
    alert("You have successfully changed your account. taking you back to dashboard!");
    window.location.href = "dashboard.html";
});
