let main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
var params = new URLSearchParams(window.location.search);
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();
request1.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200){
        data = JSON.parse(request1.responseText);
        let imagediv = document.getElementById("imagediv");
        let image = document.createElement("img");
        image.setAttribute("src", data.logo);
        image.setAttribute("alt", data.naziv + " Logo")
        imagediv.appendChild(image);
        let text = document.getElementById("text");
        let name = document.createElement("h2");
        name.innerHTML = data.naziv;
        text.insertBefore(name, text.children[0]);
        let list = document.getElementById("list");
        let info = list.children;
        info[0].innerHTML = "Naziv: " + data.naziv;
        info[1].innerHTML = "Adresa: " + data.adresa;
        info[2].innerHTML = "Godina osnivanja: " + data.godinaOsnivanja;
        info[3].innerHTML = "Kontakt telefon: " + data.kontaktTelefon;
        info[4].innerHTML = "Email: " + data.email;
        let subtitle = document.createElement("h2");
        subtitle.innerHTML = "Festivali organizatora " + data.naziv + ":";
        main.insertBefore(subtitle, main.children[2]);
        request2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                tabledata = JSON.parse(request2.responseText);
                let tbody = document.getElementById("tbody");
                for(var festival in tabledata){
                    i = tabledata[festival];
                    let row = document.createElement("tr");
                    tbody.appendChild(row);
                    let fest = document.createElement("td");
                    fest.innerHTML = i.naziv;
                    row.appendChild(fest)
                    let festprice = document.createElement("td");
                    festprice.innerHTML = i.cena + "RSD";
                    festprice.setAttribute("class", "mobileno");
                    row.appendChild(festprice);
                    let festtype = document.createElement("td");
                    festtype.innerHTML = i.tip;
                    festtype.setAttribute("class", "mobileno");
                    row.appendChild(festtype);
                    let festlink = document.createElement("td");
                    let linktext = document.createElement("a");
                    linktext.innerHTML = "Pogledajte ovde";
                    linktext.setAttribute("href", "festival.html?dict=" + data.festivali + "&fest=" + festival);
                    festlink.appendChild(linktext);
                    row.appendChild(festlink)
                }
            }
        }
        request2.open("GET", url + "/festivali/" + data.festivali + ".json");
        request2.send();
    }
}
request1.open("GET", url + "/organizatoriFestivala/" + params.get("org") + ".json");
request1.send()