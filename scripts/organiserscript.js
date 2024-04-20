let main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
var params = new URLSearchParams(window.location.search);
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();
request1.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200){
        data = JSON.parse(request1.responseText);
        let pagetitle = document.getElementsByTagName("title");
        pagetitle[0].innerHTML = data.naziv;
        let div = document.createElement("div");
        let imagediv = document.createElement("div");
        imagediv.setAttribute("id", "imagediv");
        let image = document.createElement("img");
        image.setAttribute("src", data.logo);
        image.setAttribute("alt", data.naziv + " Logo")
        imagediv.appendChild(image);
        div.appendChild(imagediv)
        let text = document.createElement("div");
        text.setAttribute("id", "text");
        div.appendChild(text);
        let title = document.createElement("h2");
        title.innerHTML = data.naziv
        text.appendChild(title);
        let list = document.createElement("ul");
        list.setAttribute("id", "list")
        text.appendChild(list);
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
        main.appendChild(div);
        let subtitle = document.createElement("h2");
        subtitle.innerHTML = "Festivali organizatora " + data.naziv + ":";
        main.appendChild(subtitle);
        request2.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                tabledata = JSON.parse(request2.responseText);
                let table = document.createElement("table");
                main.appendChild(table);
                let thead = document.createElement("thead");
                table.appendChild(thead);
                let headrow = document.createElement("tr");
                thead.appendChild(headrow);
                let name = document.createElement("th")
                name.innerHTML = "Naziv festivala";
                headrow.appendChild(name)
                let price = document.createElement("th")
                price.innerHTML = "Cena aranžmana";
                price.setAttribute("class", "mobileno");
                headrow.appendChild(price)
                let type = document.createElement("th")
                type.innerHTML = "Tip festivala";
                type.setAttribute("class", "mobileno");
                headrow.appendChild(type)
                let link = document.createElement("th")
                link.innerHTML = "Stranica festivala";
                headrow.appendChild(link)
                let tbody = document.createElement("tbody");
                table.appendChild(tbody);
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

