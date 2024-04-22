let main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    let data = JSON.parse(request.responseText);
    let tbody = document.getElementsByTagName("tbody");
    for(var instance in data){
        let entity = data[instance];
        let row = document.createElement("tr");
        let arr = [entity.naziv, entity.adresa, entity.godinaOsnivanja, entity.logo, entity.kontaktTelefon, entity.email, entity.festivali];
        for(let i = 0; i < arr.length; i++){
            let field = document.createElement("td");
            if (i > 0 && i < 6){
                field.setAttribute("class", "mobileno");
            }
            if (i == 3){
                let logo = document.createElement("a");
                logo.setAttribute("href", arr[i]);
                logo.innerHTML = "Link";
                field.appendChild(logo);
            }
            else if (i == 6){
                let festlink = document.createElement("a");
                festlink.setAttribute("href", "adminfests.html?org=" + entity.naziv + "&fest=" + arr[i])
                festlink.innerHTML = "Prikaz";
                field.appendChild(festlink);
            }
            else{
                field.innerHTML = arr[i];
            }
            row.appendChild(field);
        }
        let change = document.createElement("td");
        let changelink = document.createElement("a");
        changelink.setAttribute("href", "orgsform.html?org=" + instance);
        changelink.innerHTML = "Izmenite";
        change.appendChild(changelink);
        row.appendChild(change);
        let todelete = document.createElement("td");
        let deletelink = document.createElement("a");
        deletelink.innerHTML = "Obrišite";
        todelete.appendChild(deletelink);
        deletelink.addEventListener("click", function(e){
            window.confirm("Da li ste sigurni da želite da obrišete organizatora " + row.children[0].innerHTML + " iz sistema?");
        })
        row.appendChild(todelete);
        tbody[0].appendChild(row);
    }
}
request.open("GET", url + "/organizatoriFestivala.json");
request.send();