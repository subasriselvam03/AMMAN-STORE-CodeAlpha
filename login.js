document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    if(email === "" ||password === "")
         {
            alert("please fill all fileds");
            return ;
        }
fetch("http://localhost:3000/login",
    {
       method: "POST",
       headers: {
        "Content-Type":"application/json"
       },
       body: JSON.stringify({
        email: email,
        password: password
       })   
    })
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        if(data.message === "Login Successful"){
            localStorage.setItem("username",data.username);
            window.location.href = "products.html";
        }else{
            alert(data.message);
        }
    })
    .catch(function(error){
        console.log(error);
        alert(error);
    });
});
       