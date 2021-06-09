const loginForm = document.getElementById("login-form");
const inputs = loginForm.querySelectorAll("input");

const email = document.getElementById("email");

loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInfo = email.value;
    const user = localStorage.getItem(emailInfo);
    const userInfo = JSON.parse(user);
    console.log(userInfo);
    login(userInfo);
});

function login(userInfo) {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[0].value !== userInfo.email || inputs[1].value !== userInfo.password) {
            console.log("Your credentials is not match with our record!");
            break;
        } else {
            sessionStorage.setItem('login', true);
            sessionStorage.setItem("on", `${inputs[0].value}`);
            alert("Login Success!");
            window.location.replace("dashboard.html");
            break;
        }
    }
}
