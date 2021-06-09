const signupForm = document.getElementById("signupForm");
const chkBox = document.getElementById("terms");
const pass = document.getElementById("password");
const smErr = document.getElementById("pw-error");
const btnSubmit = signupForm.querySelector("button");

btnSubmit.setAttribute("disabled", true);

chkBox.addEventListener("change", function () {
    if (chkBox.checked) {
        btnSubmit.removeAttribute("disabled");
    } else {
        btnSubmit.setAttribute("disabled", true);
    }
});

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const val = signupForm.querySelectorAll("input");
    let sml = signupForm.querySelectorAll("small");
    signup(val, "", sml, signupForm);
});

function signup(val, param, sml, z) {
    let arr = [];
    let success;
    for (var i = 0; i < val.length; i++) {
        arr.push(val[i].value);
        if (arr.includes(param)) {
            sml[i].innerText = "this field cannot be empty!"
            val[i].classList.add("error");
            success = false;
        } else {
            // sml[i].innerText = "";
            val[i].classList.remove("error");
            success = false;
            if (val[3].value.length < 8) {
                pass.focus();
                pass.classList.add("error");
                smErr.innerText = "password must be 8 character or more!";
                success = false;
            } else {
                var userObj = {};
                userObj = {
                    fName: val[0].value,
                    lName: val[1].value,
                    email: val[2].value,
                    password: val[3].value,
                    terms: val[4].value,
                }
                localStorage.setItem(val[2].value, JSON.stringify(userObj));
                sessionStorage.setItem('login', false);
                success = true;
            }
        }
    }
    if (success === true) {
        z.reset();
        btnSubmit.setAttribute("disabled", true);
        alert("saved!");
    }
}

