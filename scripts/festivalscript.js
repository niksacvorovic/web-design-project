const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        festival = JSON.parse(request.responseText);
        let title = document.getElementsByTagName("title");
        title[0].innerHTML = festival.naziv;
        let pagetitle = document.createElement("h2");
        pagetitle.innerHTML = festival.naziv;
        main.insertBefore(pagetitle, main.children[0]);
        let intro = document.createElement("p");
        intro.innerHTML = festival.opis;
        main.insertBefore(intro, main.children[1]);
        let list = document.getElementById("info")
        let info = list.children;
        info[0].innerHTML = "Tip festivala: " + festival.tip;
        info[1].innerHTML = "Prevoz do festivala: " + festival.prevoz;
        info[2].innerHTML = "Cena aranžmana je " + festival.cena + " dinara";
        info[3].innerHTML = "Maksimalan broj putnika: " + festival.maxOsoba;
        let gallery = document.getElementById("gallery");
        gallery.setAttribute("id", "gallery");
        for(var image of festival.slike){
            let div = document.createElement("div");
            div.setAttribute("class", "galleryitem");
            let placeholder = document.createElement("img");
            placeholder.setAttribute("src", image);
            placeholder.setAttribute("alt", "Festival - slike");
            div.appendChild(placeholder);
            gallery.appendChild(div);
        }
    }
}
request.open("GET", url + "/festivali/" + params.get("dict") + "/" + params.get("fest") + ".json");
request.send();