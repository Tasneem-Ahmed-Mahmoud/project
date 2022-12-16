let fullname        = document.getElementById("fullname");
let email           = document.getElementById("email");
let pass            = document.getElementById("pass");
let cpass           = document.getElementById("cpass")
let gender          = document.getElementById("gender")
let btnregistration = document.getElementById("btnregistration")
let error           = document.getElementById("error")
// function errorv(){
//     error.style.color ="red";
// }
var users =[];
if(localStorage.getItem("users")!=null){
    users = JSON.parse(localStorage.getItem("users"))
}

function settolocalstoreg(){
    let trimfullname = fullname.value.trim();
    let splitfullname = trimfullname.split(" ")
    let trimemail = email.value.trim();
    if(users[0]!=null){
        if(trimfullname==""||null||splitfullname.length<2){
         return  error.innerHTML="full name is not valid"
        }else if(trimemail==""||null||trimemail.includes("@")==false || trimemail.includes(".")==false){
            return error.innerHTML="email is not valid"
        }else if(pass.value!=cpass.value){
            return error.innerHTML="password and confirm password is not equle."
        }else {
            for(i=0;i<users.length;i++){
                if(trimfullname==users[i].fullname&&trimemail==users[i].email){
                    return  error.innerHTML="this email is registered"
                }else if(trimfullname==users[i].fullname){
                    return error.innerHTML="This name is booked up."
                }else if(trimemail==users[i].email){
                    return  error.innerHTML="this email is registered"
                }
            }
            users.push({"fullname":trimfullname,"email":trimemail,"password":pass.value,"gender":gender.value}) 
            localStorage.setItem("users",JSON.stringify(users))
            open("login.html","_parent")
        }
    }else {
        if(trimfullname==""||null||splitfullname.length<2){
            return  error.innerHTML="full name is not valid"
        }else if(trimemail==""||null||trimemail.includes("@")==false || trimemail.includes(".")==false){
            return error.innerHTML="email is not valid"
        }else if(pass.value!=cpass.value){
            return error.innerHTML="password and confirm password is not equle."
        }else {
            users =[{"fullname":trimfullname,"email":trimemail,"password":pass.value,"gender":gender.value}]
            localStorage.setItem("users",JSON.stringify(users))
            open("login.html","_parent")
        }
    }

}
function erroruv(){
    error.innerHTML=""
}
function getusers(){
    let arraystorege = users
    let trimfullname = fullname.value.trim();
    let trimemail = email.value.trim();
    if(users[0]!=null){ 
        for(i=0;i<arraystorege.length;i++){
            if(trimemail==users[i].email&&trimfullname==users[i].fullname){
                error.innerHTML="this email is registered"
            }
            else if(trimfullname==users[i].fullname){
                error.innerHTML="This name is booked up."
            } 
        
        }
        
    }
}


fullname.addEventListener("focusout",checkfullname)

function checkfullname(){
    if(fullname.value==""){
       return error.innerHTML="full name is empty."
    }else{
        erroruv()
        const trimfullname = fullname.value.trim();
        const splitfullname = trimfullname.split(" ");
        if(splitfullname.length<2){
            error.innerHTML="full name is valid."
        }else if(error.innerHTML== "full name is empty."||"full name is valid."){
            erroruv()
        }
   }
   getusers()
}

email.addEventListener("focusout",checkemail);

function checkemail(){
    const  contantemail = email.value
    if(email.value==""){

        error.innerHTML="email is empty."
    }else{
        if(contantemail.includes("@")==false|| contantemail.includes(".")==false){
            error.innerHTML="email is valid."
        }else if(error.innerHTML== "email is valid."){
            erroruv()
        }
    }
    getusers()
}

pass.addEventListener("focusout",checkpass);

function checkpass(){
    if(pass.value==""){
        // errorv()
        error.innerHTML="password is empty."
    }else{
        if(pass.value.length<3){
             // errorv()
             error.innerHTML="password could include 3 char or more."
        }else{
            erroruv()
            if(cpass.value!=""&&pass.value!=cpass.value){
                // errorv()
                error.innerHTML="password and confirm password is not equle."
            }else if( error.innerHTML=="password could include 3 char or more."||"password and confirm password is not equle."){
                erroruv
            }
        }
    }
}

cpass.addEventListener("focusout",checkcpass);

function checkcpass(){
    if(cpass.value==""){
        // errorv()
        error.innerHTML="confirm password is empty."
    }else{
        if(cpass.value!=pass.value){
            // errorv()
            error.innerHTML="password and confirm password is not equle."
        }else if( error.innerHTML=="password and confirm password is not equle."){
            erroruv
        }
    }
}
  btnregistration.addEventListener("click",singup);

  function singup(){
    // checkpass()
    // checkcpass();
    // checkemail()
    // checkfullname();
   settolocalstoreg()
  }


