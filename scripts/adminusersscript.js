const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        users = JSON.parse(request.responseText);
        let tbody = document.getElementsByTagName("tbody");
        for(var values in users){
            userdata = users[values];
            let row = document.createElement("tr");
            let uservalues = [userdata.korisnickoIme, userdata.lozinka, userdata.ime, userdata.prezime, userdata.email, userdata.datumRodjenja, userdata.adresa, userdata.telefon, userdata.zanimanje];
            for(var value in uservalues){
                let field = document.createElement("td");
                field.innerHTML = uservalues[value];
                row.appendChild(field);
            }
            let update = document.createElement("td");
            let updatelink = document.createElement("a");
            updatelink.setAttribute("href", "usersform.html?user=" + values);
            updatelink.innerHTML = "Izmenite...";
            update.appendChild(updatelink);
            row.appendChild(update);
            let todelete = document.createElement("td");
            let deletelink = document.createElement("a");
            deletelink.innerHTML = "Obrišite";
            todelete.appendChild(deletelink);
            deletelink.addEventListener("click", function(e){
                window.confirm("Da li ste sigurni da želite da obrišete korisnika " + row.children[0].innerHTML + " iz sistema?");
            })
            row.appendChild(todelete);
            tbody[0].appendChild(row);
        }
    }
}
request.open("GET", url + "/korisnici.json");
request.send();