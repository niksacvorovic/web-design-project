const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const request = new XMLHttpRequest();
const params = new URLSearchParams(window.location.search);
request.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        organisers = JSON.parse(request.responseText);
        if(organisers == null){
            window.location.href = "error.html"
        }
        if(params.has("query")){
            for(var entity in organisers){
                let check = organisers[entity].naziv;
                if (check.toLowerCase().includes(params.get("query")) || check.includes(params.get("query"))){
                    createCard(entity);
                }
            }
            let highlight = document.getElementsByClassName("orgname");
            for(var item of highlight){
                let orgname = item.innerHTML.substr(7);
                let marked = "<mark>" + params.get("query") + "</mark>";
                let captquery = params.get("query").charAt(0).toUpperCase() + params.get("query").slice(1);
                let markedcapt = "<mark>" + captquery + "</mark>";
                let neworgname = orgname.replaceAll(params.get("query"), marked);
                neworgname = neworgname.replaceAll(captquery, markedcapt)
                item.innerHTML = "Naziv: " + neworgname;
            }
        }else{
            for(var entity in organisers){
                createCard(entity);
            }
        }
    }else if(this.readyState == 4 && this.status >= 400){
        window.location.href = "error.html"
    }
}
const searchbtn = document.getElementById("searchbtn");
const query = document.getElementById("query");
searchbtn.addEventListener("click", function(e){
    let search = query.value;
    window.location.href = "index.html?query=" + search;
})
request.open("GET", url + "/organizatoriFestivala.json");
request.send();

function createCard(entity){
    let data = organisers[entity]
    let div = document.createElement("div");
    div.setAttribute("class", "organiser");
    main.appendChild(div);
    let placeholder = document.createElement("div");
    placeholder.setAttribute("class", "placeholder");
    div.appendChild(placeholder)
    let image = document.createElement("img");
    image.setAttribute("src", data.logo);
    image.setAttribute("alt", data.naziv +" Logo")
    image.setAttribute("class", "logo");
    placeholder.appendChild(image);
    let list = document.createElement("ul");
    list.setAttribute("class", "list");
    div.appendChild(list);
    let name = document.createElement("li");
    name.setAttribute("class", "orgname")
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
    link.setAttribute("href", "organiser.html?org=" + entity);
    hyper.appendChild(link);
    let hr = document.createElement("hr");
    hr.setAttribute("class", "mobileonly");
    div.appendChild(hr);
    main.appendChild(div);
}