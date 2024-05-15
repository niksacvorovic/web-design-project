const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
let submitbtn = document.getElementById("submitbtn");
let username = document.getElementById("username");
let password = document.getElementById("password");
let name = document.getElementById("humanname");
let lastname = document.getElementById("lastname");
let email = document.getElementById("email");
let date = document.getElementById("date");
let address = document.getElementById("address");
let number = document.getElementById("number");
let job = document.getElementById("job");
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200 && params.get("user") != "new"){
        let data = JSON.parse(request.responseText);
        if(data == null){
            window.location.href = "error.html"
        }
        document.getElementById("formtitle").innerHTML = "Izmena korisnika";
        submitbtn.setAttribute("value", "Izmenite");
        username.setAttribute("value", data.korisnickoIme);
        username.setAttribute("readonly", true);
        password.setAttribute("value", data.lozinka);
        name.setAttribute("value", data.ime);
        lastname.setAttribute("value", data.prezime);
        email.setAttribute("value", data.email);
        date.setAttribute("value", data.datumRodjenja);
        address.setAttribute("value", data.adresa);
        number.setAttribute("value", data.telefon);
        job.setAttribute("value", data.zanimanje);
    }else if(this.status >= 400){
        window.location.href = "error.html"
    }
}
const form = document.getElementById("userform");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let emailregex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    let phonenumregex = new RegExp("^[0-9]{9,10}$");
    let dateregex = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");
    if(username.value != "" && password.value != "" && name.value != "" && lastname.value != "" &&
    emailregex.test(email.value) && dateregex.test(date.value) && address.value != "" &&
    phonenumregex.test(number.value) && job.value != "")
    {
        let newuser = new Object();
        newuser.korisnickoIme = username.value;
        newuser.lozinka = password.value;
        newuser.ime = name.value;
        newuser.prezime = lastname.value;
        newuser.email = email.value;
        newuser.datumRodjenja = date.value;
        newuser.adresa = address.value;
        newuser.telefon = number.value;
        newuser.zanimanje = job.value;
        if(params.get("user") == "new"){
            let postRequest = new XMLHttpRequest();
            postRequest.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    window.location.href = "index.html";
                }else if(this.status >= 400){
                    window.location.href = "error.html"
                }
            }
            postRequest.open("POST", url + "/korisnici.json");
            postRequest.send(JSON.stringify(newuser));
        }
        else{
            let putRequest = new XMLHttpRequest();
            putRequest.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    window.location.href = "index.html";
                }else if(this.status >= 400){
                    window.location.href = "error.html"
                }
            }
            putRequest.open("PUT", url + "/korisnici/" + params.get("user") +".json");
            putRequest.send(JSON.stringify(newuser));
        }
    }
    else
    {
        alert("Neispravni podaci! Pokušajte opet");
    }
});
if (params.get("user") != "new"){
    request.open("GET", url + "/korisnici/" + params.get("user") +".json");
    request.send();
}