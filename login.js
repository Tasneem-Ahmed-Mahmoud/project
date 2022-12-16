let email     = document.getElementById("email");
let pass      = document.getElementById("pass");
let btnlogin  = document.getElementById("btnlogin")
let error     = document.getElementById("error")
var users =[];
if(localStorage.getItem("users")!=null){
    users = JSON.parse(localStorage.getItem("users"))
}
function erroruv(){
    error.innerHTML=""
}
function getusers(){
    if(users[0]==null){
      return  error.innerHTML="this email is not Existing"
    }
    let trimemail = email.value.trim();
    if(email.value==""){
        return error.innerHTML="email is empty" 
        }
    else if(pass.value==""){
        return error.innerHTML="password is empty" ;
    }else{
        for(i=0;i<users.length;i++){
            if(users[i].email!=trimemail){
                console.log(users)
                console.log(users[1].email)
                console.log(i) ; error.innerHTML="this email is not Existing" 
                
            }else if(users[i].password!=pass.value&&users[i].email==trimemail){
                 console.log(i) ; error.innerHTML="uncorected password" ;  
                 error.innerHTML="uncorected password" ;   i=users.length;
            }else{
                erroruv()
                sessionStorage.setItem("fullname",JSON.stringify(users[i].fullname))
                return open("index.html","_parent")

            }
        }
        
    }
}
btnlogin.addEventListener("click",getusers);
