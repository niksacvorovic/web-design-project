const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const form = document.getElementById("festform");
let formtitle = document.getElementById("formtitle");
formtitle.innerHTML = "Dodavanje novog festivala organizatora " + params.get("orgname");
let festname = document.getElementById("festname");
let desc = document.getElementById("desc");
let images = document.getElementById("images");
let type = document.getElementById("type");
let transport = document.getElementById("transport");
let price = document.getElementById("price");
let max = document.getElementById("max");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let numregex = new RegExp("^[0-9]+$");
    let linkregex = new RegExp("^(((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?),)*(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$");
    if(festname.value != "" && desc.value != "" && type.value != "" && transport.value != "" &&
    numregex.test(price.value) && numregex.test(max.value) && linkregex.test(images.value))
    {
        let newfest = new Object();
        newfest.naziv = festname.value;
        newfest.opis = desc.value;
        newfest.slike = images.value.split(",");
        newfest.tip = type.value;
        newfest.prevoz = transport.value;
        newfest.cena = price.value;
        newfest.maxOsoba = max.value;
        postRequest = new XMLHttpRequest();
        postRequest.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                window.location.href = "adminfests.html?orgname=" + params.get("orgname") + "&orgkey=" + params.get("orgkey");
            }else if(this.readyState == 4 && this.status >= 400){
                window.location.href = "error.html"
            }
        }
        postRequest.open("POST", url + "/festivali/" + params.get("orgkey") + ".json");
        postRequest.send(JSON.stringify(newfest));
    }
    else
    {
        alert("Neispravni podaci! Pokušajte opet");
    }
});