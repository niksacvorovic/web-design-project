const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        let data = JSON.parse(request.responseText);
        let name = document.getElementById("orgname");
        let address = document.getElementById("address");
        let year = document.getElementById("year");
        let logo = document.getElementById("logo");
        let email = document.getElementById("email");
        let number = document.getElementById("number");
        name.setAttribute("value", data.naziv);
        name.setAttribute("readonly", true);
        address.setAttribute("value", data.adresa);
        year.setAttribute("value", data.godinaOsnivanja);
        logo.setAttribute("value", data.logo);
        email.setAttribute("value", data.email);
        number.setAttribute("value", data.kontaktTelefon);
    }
}
const form = document.getElementById("orgform");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let emailregex = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
    let phonenumregex = new RegExp("^[0-9]{3}\/[0-9]{3,4}-[0-9]{3,4}$");
    let yearregex = new RegExp("^[0-9]{4}$");
    let linkregex = new RegExp("^(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$");
    if(emailregex.test(email.value) && phonenumregex.test(number.value) && yearregex.test(year.value) && linkregex.test(logo.value))
    {
        alert("Podaci su uspešno poslati!");
    }
    else
    {
        alert("Neispravni podaci! Pokušajte opet");
    }
});
request.open("GET", url + "/organizatoriFestivala/" + params.get("org") +".json");
request.send();