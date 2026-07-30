console.log("register.js loaded");
document.getElementById("registerForm").addEventListener("submit", function (event) {

    event.preventDefault();

    let username = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    let confirmPassword = document.getElementById("cpwd").value;
    if (username === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        if(data === "User Registered Successfully"){
        window.location.href = "login.html";}else{alert(data);}
    })
    .catch(function(error) {
        console.log(error);
        alert("Registration Failed");
    });

});