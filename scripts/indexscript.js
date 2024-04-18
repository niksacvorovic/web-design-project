let main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const request = new XMLHttpRequest();
request.onload = function(){
    if (this.readyState == 4 && this.status == 200){
        organisers = JSON.parse(request.responseText);
        for(var entity in organisers){
            let data = organisers[entity]
            let div = document.createElement("div");
            div.setAttribute("class", "organiser");
            main.appendChild(div);
            let placeholder = document.createElement("div");
            placeholder.setAttribute("class", "placeholder");
            div.appendChild(placeholder)
            let image = document.createElement("img");
            image.setAttribute("src", data.logo);
            image.setAttribute("class", "logo");
            placeholder.appendChild(image);
            let list = document.createElement("ul");
            list.setAttribute("class", "list");
            div.appendChild(list);
            let name = document.createElement("li");
            name.innerHTML = "Naziv: " + data.naziv;
            list.appendChild(name);
            let address = document.createElement("li");
            address.innerHTML = "Adresa: " + data.adresa;
            list.appendChild(address);
            let year = document.createElement("li");
            year.innerHTML = "Godina osnivanja: " + data.godinaOsnivanja;
            list.appendChild(year);
            let contact = document.createElement("li");
            contact.innerHTML = "Kontakt telefon: " + data.kontaktTelefon;
            list.appendChild(contact);
            let email = document.createElement("li");
            email.innerHTML = "Email: " + data.email;
            list.appendChild(email);
            let hyper = document.createElement("li");
            list.appendChild(hyper);
            let link = document.createElement("a");
            link.innerHTML = "Stranica organizatora";
            link.setAttribute("href", "organiser.html?page=" + entity);
            hyper.appendChild(link);
            main.appendChild(div);
        }
    }
}
request.open("GET", url + "/organizatoriFestivala.json");
request.send();