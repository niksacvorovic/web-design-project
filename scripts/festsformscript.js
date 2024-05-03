const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        let data = JSON.parse(request.responseText);
        let name = document.getElementById("festname");
        let desc = document.getElementById("desc");
        let images = document.getElementById("images")
        let type = document.getElementById("type");
        let transport = document.getElementById("transport");
        let price = document.getElementById("price");
        let max = document.getElementById("max");
        name.setAttribute("value", data.naziv);
        name.setAttribute("readonly", true);
        desc.innerHTML = data.opis;
        images.setAttribute("value", data.slike);
        type.setAttribute("value", data.tip);
        transport.setAttribute("value", data.prevoz);
        price.setAttribute("value", data.cena);
        max.setAttribute("value", data.maxOsoba);
    }
}
const form = document.getElementById("festform");
form.addEventListener("submit", function(e){
    e.preventDefault();
    let numregex = new RegExp("^[0-9]+$");
    let linkregex = new RegExp("^(((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?),)*(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?$");
    if(numregex.test(price.value) && numregex.test(max.value) && linkregex.test(images.value))
    {
        alert("Podaci su uspešno poslati!");
    }
    else
    {
        alert("Neispravni podaci! Pokušajte opet");
    }
});
request.open("GET", url + "/festivali/" + params.get("org") + "/" + params.get("fest") +".json");
request.send();