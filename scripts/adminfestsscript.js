const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
        let data = JSON.parse(request.responseText);
        if(data == null){
            window.location.href = "error.html"
        }
        let tbody = document.getElementsByTagName("tbody");
        let subtitle = document.getElementById("subtitle");
        let add = document.getElementById("add");
        add.setAttribute("href", "festsform.html?orgname=" + params.get("orgname") + "&orgkey=" + params.get("orgkey"));
        subtitle.innerHTML = "Prikaz festivala organizatora " + params.get("orgname") + " u sistemu";
        for(var instance in data){
            let entity = data[instance];
            let row = document.createElement("tr");
            let arr = [entity.naziv, entity.opis, entity.slike, entity.tip, entity.prevoz, entity.cena, entity.maxOsoba];
            for(let i = 0; i < arr.length; i++){
                let field = document.createElement("td");
                if (i != 0){
                    field.setAttribute("class", "mobileno");
                    if (i == 1){
                        field.setAttribute("class", "mobileno wrap");
                    }
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
            let todelete = document.createElement("td");
            let deletelink = document.createElement("a");
            deletelink.innerHTML = "Obrišite";
            deletelink.setAttribute("data", url + "/festivali/" + params.get("orgkey") + "/" + instance + ".json");
            todelete.appendChild(deletelink);
            deletelink.addEventListener("click", function(e){
                let bool = window.confirm("Da li ste sigurni da želite da obrišete " + row.children[0].innerHTML + " iz sistema?");
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
            });
            row.appendChild(todelete);
            tbody[0].appendChild(row);
        }
    }else if(this.readyState == 4 && this.status >= 400){
        window.location.href = "error.html"
    }
}
request.open("GET", url + "/festivali/" + params.get("orgkey") +".json");
request.send();