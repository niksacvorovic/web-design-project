const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        let data = JSON.parse(request.responseText);
        let username = document.getElementById("username");
        let password = document.getElementById("password");
        let name = document.getElementById("humanname");
        let lastname = document.getElementById("lastname");
        let email = document.getElementById("email");
        let date = document.getElementById("date");
        let address = document.getElementById("address");
        let number = document.getElementById("number");
        let job = document.getElementById("job");
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
    }
}
const form = document.getElementById("userform");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let emailregex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    let phonenumregex = new RegExp("^[0-9]{9,10}$");
    let dateregex = new RegExp("^\\d{4}-\\d{2}-\\d{2}$");
    if(emailregex.test(email.value) && phonenumregex.test(number.value) && dateregex.test(date.value))
    {
        alert("Podaci su uspešno poslati!");
    }
    else
    {
        alert("Neispravni podaci! Pokušajte opet");
    }
});
request.open("GET", url + "/korisnici/" + params.get("user") +".json");
request.send();