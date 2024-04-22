const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    let data = JSON.parse(request.responseText);
    let tbody = document.getElementsByTagName("tbody");
    let subtitle = document.getElementById("subtitle");
    subtitle.innerHTML = "Prikaz festivala organizatora " + params.get("org") + " u sistemu";
    for(var instance in data){
        let entity = data[instance];
        console.log(entity);
        let row = document.createElement("tr");
        let arr = [entity.naziv, entity.opis, entity.slike, entity.tip, entity.prevoz, entity.cena, entity.maxOsoba];
        for(let i = 0; i < arr.length; i++){
            let field = document.createElement("td");
            if (i != 0){
                field.setAttribute("class", "mobileno");
            }
            if (i == 2){
                for(var image in entity.slike){
                    let link = document.createElement("a");
                    link.setAttribute("href", entity.slike[image]);
                    link.innerHTML = "Link";
                    field.appendChild(link);
                    let br = document.createElement("br");
                    field.appendChild(br);
                }
            }else{
                field.innerHTML = arr[i];
            }
            row.appendChild(field);
        }
        let change = document.createElement("td");
        let changelink = document.createElement("a");
        changelink.setAttribute("href", "festsform.html?org=" + instance);
        changelink.innerHTML = "Izmenite";
        change.appendChild(changelink);
        row.appendChild(change);
        let todelete = document.createElement("td");
        let deletelink = document.createElement("a");
        deletelink.innerHTML = "Obrišite";
        todelete.appendChild(deletelink);
        deletelink.addEventListener("click", function(e){
            window.confirm("Da li ste sigurni da želite da obrišete " + row.children[0].innerHTML + " iz sistema?");
        })
        row.appendChild(todelete);
        tbody[0].appendChild(row);
    }
}
request.open("GET", url + "/festivali/" + params.get("fest") +".json");
request.send();