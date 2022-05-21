const form = document.querySelector("form");
const email = document.querySelector("#user-name");
const userPass = document.querySelector("#user-password")
const confirmPass = document.querySelector("#confirm-password")
const errs = document.querySelectorAll(".description");

form.addEventListener("submit",check);

function check(event){
    event.preventDefault();

    const emailValue = email.value;
    const passValue = userPass.value;
    const confirmPassValue = confirmPass.value;
    errs[0].innerText = "";
    errs[1].innerText = "";
    errs[2].innerText = "";
    errs[3].innerText = "";
    let ifSendData = true;


    if(emailValue.length === 0 || emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1){
        errs[0].innerText = "please enter a valid Email";
        ifSendData = false;
    }

    if(passValue.length === 0){
        errs[1].innerText = "please enter a password";
        ifSendData = false;
    } else if (passValue.length <= 8 || passValue.match(/[a-z]/i) === null){
        errs[1].innerText = "your password is week";
        ifSendData = false;
    }


    if(confirmPassValue.length === 0 || confirmPassValue !== passValue){
        errs[2].innerText = "Repeat your password";
        ifSendData = false;
    }

    if(ifSendData){
        const body = JSON.stringify({
            username: emailValue,
            userpassword: passValue
        })
        const headers = {
            "Content-Type": "application/json"
        }
        fetch('https://jsonplaceholder.typicode.com/posts',{
            method : 'POST',
            body : body,
            headers : headers
        })
            .then(response=>{
                if(response.ok){
                    errs[3].innerText = "you signed up secseccfully";
                    errs[3].style.color = "green";
                } else {
                    errs[3].innerText = "you signed up failed";
                    errs[3].style.color = "red";
                }
            })
    }
}
