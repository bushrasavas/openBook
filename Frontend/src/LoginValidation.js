function Validation(values){
    let error = {}
    const email_pattern =  /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/
    const password_pattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/

    if(values.email === ""){
        error.email = "Please provide a valid email"
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didn't match"
    }
    else{
        error.email = ""
    }
    if(values.password === ""){
        error.password = "Please provide a valid password"
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password didn't match"
    }
    else{
        error.password = ""
    }
    return error;
}
export default Validation