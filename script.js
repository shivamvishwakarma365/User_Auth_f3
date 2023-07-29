const continueBtn=document.getElementById('continue');
const fName=document.getElementById('fName');
const email=document.getElementById('email');
const password=document.getElementById('password');
const cpassword=document.getElementById('confirmPassword');
const form=document.getElementsByTagName('form')[0];

function isPresent(email){
    const users=JSON.parse(localStorage.getItem('users'));
    let obj = users.find(userObj=>{
        return userObj.email===email
    })
    if(obj)return true;
    return false;
}

function tokenGenerator(){
    let str='0123456789abcdef'
    let generatedToken='';

    for(let i=0;i<16;i++){
        let index=Math.floor(Math.random()*16);
        generatedToken+=str[index];
    }
    return generatedToken;
}

function storeUserData(name,femail, fpassword, confirmPassword){
    let token=tokenGenerator();
    const userObj={
        name:name.value,
        email:femail.value,
        password:fpassword.value,
        confirmPassword:confirmPassword.value,
        token:token
    }
    let users=JSON.parse(localStorage.getItem('users'));
    if(users===null){
        users = [];
    }
    users.push(userObj);
    localStorage.setItem('users',JSON.stringify(users));

    sessionStorage.setItem('loggedInUser',JSON.stringify(userObj));

    fName.value='';
    email.value='';
    password.value='';
    cpassword.value='';
    window.location.href='./profile.html';
}

continueBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(fName.value.trim()===''||
        email.value.trim()===''||
        password.value.trim()===''||
        cpassword.value.trim()===''){
            const errorMssg= document.createElement('div');
            errorMssg.innerText=`Error: All fields are mandatory!`
            errorMssg.style.color='#5A53F3'
            errorMssg.style.display='flex'
            errorMssg.style.justifyContent='center'
            errorMssg.style.fontWeight='600'
            form.appendChild(errorMssg);
    }
    else{
        if(password.value.trim()!==cpassword.value.trim()){
            const errorMssg= document.createElement('div');
            errorMssg.innerText=`Error: Password and Confirm Password Should be same.`
            errorMssg.style.color='#5A53F3'
            errorMssg.style.display='flex'
            errorMssg.style.justifyContent='center'
            errorMssg.style.fontWeight='600'
            form.appendChild(errorMssg);
            
            password.value='';
            cpassword.value='';
        }
        else{
            if(localStorage.getItem('users')){
                if(isPresent(email.value)){
                    const errorMssg= document.createElement('div');
                    errorMssg.innerText=`Error: Email Already Registered!`
                    errorMssg.style.color='#5A53F3'
                    errorMssg.style.display='flex'
                    errorMssg.style.justifyContent='center'
                    errorMssg.style.fontWeight='600'
                    form.appendChild(errorMssg);
                }
                else{
                    storeUserData(fName,email,password,cpassword);
                }
            }
            else{
               storeUserData(fName,email,password,cpassword);
            }
        }
    }

})




