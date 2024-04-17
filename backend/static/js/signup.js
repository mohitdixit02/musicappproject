// Name Error
let fname = document.getElementsByName('fname');
let lname = document.getElementsByName('lname');
let email = document.getElementsByName('email');
let dob = document.getElementsByName('dob');
let no = document.getElementsByName('no');
let username = document.getElementsByName('username');
let password = document.getElementsByName('password');
let cpassword = document.getElementsByName('cpassword');
let address=document.getElementsByName('email');


fname[0].addEventListener('blur', () => {
    let test_str = /^[A-Z]([a-z]){1,10}$/
    let str = fname[0].value;
    let error = document.getElementById('fname_error');
    if (!(test_str.test(str)) && fname[0].value != '') {
        error.innerText = 'Name should only contain alphabests, starting with a capital';
    }
    else {
        error.innerText = '';
    }
})


lname[0].addEventListener('blur', () => {
    let test_str = /^[A-Z]([a-z]){2,10}$/
    let str = lname[0].value;
    let error = document.getElementById('lname_error');
    if (!(test_str.test(str)) && lname[0].value != '') {
        error.innerText = 'Name should only contain alphabests, starting with a capital';
    }
    else {
        error.innerText = '';
    }
})

email[0].addEventListener('blur', () => {
    let test_str = /^([A-Za-z0-9@.]){0,25}$/;
    let str = email[0].value;
    let error = document.getElementById('email_error');
    if (!(test_str.test(str)) && email[0].value != '') {
        error.innerText = "Only alphabets, numbers, @ and dot is allowed";
    }
    else {
        error.innerText = '';
    }
})

no[0].addEventListener('blur', () => {
    let test_str = /^([0-9]){10}$/;
    let str = no[0].value;
    let error = document.getElementById('no_error');
    if (!(test_str.test(str)) && no[0].value != '') {
        error.innerText = "Only 10 digit number is allowed";
    }
    else {
        error.innerText = '';
    }
})

password[0].addEventListener('blur', () => {
    let str = password[0].value;
    let error = document.getElementById('pass_error');
    if (str.length < 6 && password[0].value != '') {
        error.innerText = "Password should be more than 6 characters";
    }
    else {
        error.innerText = '';
    }
})

cpassword[0].addEventListener('blur', () => {
    let str = cpassword[0].value;
    let main = password[0].value
    let error = document.getElementById('cpass_error');
    if (str != main && str != '') {
        error.innerText = "Entered and Confirmed Password do not match";
    }
    else {
        error.innerText = '';
    }
})


let bttn = document.getElementById('signup');
bttn.addEventListener('click', (e) => {
    e.preventDefault();
    let w = document.getElementsByClassName('error_message');
    let form=document.getElementById('signup_form');
    let flag=false;
    for (let i of w) {
        if(i.innerText!=''){
            flag=true;
        }
    }
    if(!flag){
        if((dob[0].value=='' || username[0].value=='')|| address[0].value==''){
            alert('Make sure all entries are correctly filled');
        }
        else{
            form.submit();
        }
    }
    else{
        alert('Make sure all entries are correctly filled');
    }
})