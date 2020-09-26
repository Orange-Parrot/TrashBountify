const Login = (function(){
    var loginTab = document.querySelector("#login");
    var usernameInput = loginTab.querySelector(".login-username")
    var passwordInput = loginTab.querySelector(".password")
    var loginBtn = loginTab.querySelector(".login-btn");
    var signupBtn = loginTab.querySelector(".signup-btn");
    var LoggedIn = false;
    var User;
    signupBtn.addEventListener("click",async function(){
        console.log(signupBtn);
        var data = {username:usernameInput.value,password:passwordInput.value}
        const response = await fetch('/signup', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          if(response.ok){
            LoggedIn= true;
            User = await response.json();
            console.log(User)
            alert("logged in");
            if(finishLogin){
                finishLogin();
            }
            
            close();
            }else{
                alert("error");
            }
    })

    loginBtn.addEventListener("click",async function(){
        console.log(signupBtn);
        var data = {username:usernameInput.value,password:passwordInput.value}
        const response = await fetch('/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
          });
          if(response.ok){
            alert("logged in");
            LoggedIn= true;
            user = await response.json();
            if(finishLogin){
                finishLogin();
            }
            close();
            }else{
                alert("error");
            }
    })
    var finishLogin;
    function  startLogin(){
        return new Promise(function(resolve,reject){
            loginTab.style.display="block";
            finishLogin=resolve;
        })


    }
    function close(){
        loginTab.style.height="0";
        loginTab.style.display="none";
    }
    function isLoggedIn(){
        return LoggedIn;
    }
    function getUser(){
        return User;
    }
    return {isLoggedIn,getUser, startLogin}
})()