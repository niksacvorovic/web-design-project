let main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
var params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        festival = JSON.parse(request.responseText);
        console.log(festival);
        let title = document.getElementsByTagName("title");
        title[0].innerHTML = festival.naziv;
        let pagetitle = document.createElement("h2");
        pagetitle.innerHTML = festival.naziv;
        main.appendChild(pagetitle);
        let intro = document.createElement("p");
        intro.innerHTML = festival.opis;
        main.appendChild(intro);
        let line1 = document.createElement("p");
        line1.innerHTML = "Dodatne informacije o festivalu";
        main.appendChild(line1);
        let list = document.createElement("ul");
        let type = document.createElement("li");
        type.innerHTML = "Tip festivala: " + festival.tip;
        list.appendChild(type);
        let ride = document.createElement("li");
        ride.innerHTML = "Prevoz do festivala: " + festival.prevoz;
        list.appendChild(ride);
        let price = document.createElement("li");
        price.innerHTML = "Cena aranžmana je " + festival.cena + " dinara";
        list.appendChild(price);
        let max = document.createElement("li");
        max.innerHTML = "Maksimalan broj putnika: " + festival.maxOsoba;
        list.appendChild(max);
        main.appendChild(list);
        let line2 = document.createElement("p");
        line2.innerHTML = "Pogledajte neke od slika sa prošlogodišnjeg izdanja ovog fantastičnog festivala:";
        let gallery = document.createElement("div");
        gallery.setAttribute("id", "gallery");
        for(var image of festival.slike){
            console.log(image);
            let div = document.createElement("div");
            div.setAttribute("class", "galleryitem");
            let placeholder = document.createElement("img");
            placeholder.setAttribute("src", image);
            placeholder.setAttribute("alt", "Festival - slike");
            div.appendChild(placeholder);
            gallery.appendChild(div);
        }
        main.appendChild(gallery);
    }
}
request.open("GET", url + "/festivali/" + params.get("dict") + "/" + params.get("fest") + ".json");
request.send();