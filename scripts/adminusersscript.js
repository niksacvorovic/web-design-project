const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        users = JSON.parse(request.responseText);
        if(users == null){
            window.location.href = "error.html"
        }
        let tbody = document.getElementsByTagName("tbody");
        for(var values in users){
            userdata = users[values];
            let row = document.createElement("tr");
            let uservalues = [userdata.korisnickoIme, userdata.lozinka, userdata.ime, userdata.prezime, userdata.email, userdata.datumRodjenja, userdata.adresa, userdata.telefon, userdata.zanimanje];
            for(var value in uservalues){
                let field = document.createElement("td");
                if(value != 0){
                    field.setAttribute("class", "mobileno");
                }
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
            deletelink.setAttribute("data", url + "/korisnici/" + values + ".json")
            todelete.appendChild(deletelink);
            deletelink.addEventListener("click", function(e){
                let bool = window.confirm("Da li ste sigurni da želite da obrišete korisnika " + row.children[0].innerHTML + " iz sistema?");
                if(bool){
                    let deleteRequest = new XMLHttpRequest();
                    deleteRequest.onreadystatechange = function() {
                        if(this.readyState == 4 && this.status == 200){
                            location.reload();
                        }else if(this.readyState == 4 && this.status >= 400){
                            window.location.href = "error.html"
                        }
                    }
                    deleteRequest.open("DELETE", deletelink.getAttribute("data"));
                    deleteRequest.send();
                }
            })
            row.appendChild(todelete);
            tbody[0].appendChild(row);
        }
    }
}
request.open("GET", url + "/korisnici.json");
request.send();