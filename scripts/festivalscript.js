const main = document.getElementById("main");
const url = "https://web-design-data-a605e-default-rtdb.firebaseio.com";
const params = new URLSearchParams(window.location.search);
const request = new XMLHttpRequest();
const queryrequest = new XMLHttpRequest();
request.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        festival = JSON.parse(request.responseText);
        if(festival == null){
            window.location.href = "error.html"
        }
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
        if(params.has("name") || params.has("type")){
            queryrequest.onreadystatechange = function(){
                if(this.readyState == 4 && this.status == 200){
                    orgkeys = JSON.parse(queryrequest.responseText);
                    if(orgkeys == null){
                        window.location.href = "error.html"
                    }
                    let results = document.getElementById("results");
                    let tbody = document.getElementById("tbody");
                    for(var key in orgkeys){
                        let festlist = orgkeys[key];
                        for(var festkey in festlist){
                            let fest = festlist[festkey];
                            let isresult = true;
                            if (params.has("name") && !(fest.naziv.toLowerCase().includes(params.get("name")) || fest.naziv.includes(params.get("name")))){
                                isresult = false;
                            }
                            if (params.has("type") && fest.tip != params.get("type")){
                                isresult = false;
                            }
                            if(isresult){
                                let row = document.createElement("tr");
                                tbody.appendChild(row);
                                let festname = document.createElement("td");
                                let festnamestr = fest.naziv;
                                if (params.has("name")){
                                    let marked = "<mark>" + params.get("name") + "</mark>";
                                    let captquery = params.get("name").charAt(0).toUpperCase() + params.get("name").slice(1);
                                    let markedcapt = "<mark>" + captquery + "</mark>";
                                    festnamestr = festnamestr.replaceAll(params.get("name"), marked);
                                    festnamestr = festnamestr.replaceAll(captquery, markedcapt)
                                }
                                festname.innerHTML = festnamestr;
                                row.appendChild(festname)
                                let festprice = document.createElement("td");
                                festprice.innerHTML = fest.cena + "RSD";
                                festprice.setAttribute("class", "mobileno");
                                row.appendChild(festprice);
                                let festtype = document.createElement("td");
                                festtype.innerHTML = fest.tip;
                                festtype.setAttribute("class", "mobileno");
                                row.appendChild(festtype);
                                let festlink = document.createElement("td");
                                let linktext = document.createElement("a");
                                linktext.innerHTML = "Pogledajte ovde";
                                linktext.setAttribute("href", "festival.html?dict=" + key + "&fest=" + festkey);
                                festlink.appendChild(linktext);
                                row.appendChild(festlink);
                            }
                        }
                    }
                    results.style.display = "table";
                }
            }
            queryrequest.open("GET", url + "/festivali.json");
            queryrequest.send();
        }
    }      
}
const searchbtn = document.getElementById("searchbtn");
const festname = document.getElementById("festname");
const festtype = document.getElementById("festtype");
searchbtn.addEventListener("click", function(e){
    let queryname = festname.value;
    let querytype = document.querySelector("#festtypes").value;
    let querystring = "";
    if(queryname != ""){
        querystring += "&name=" + queryname;
    }
    if(querytype != ""){
        querystring += "&type=" + querytype;
    }
    window.location.href = "festival.html?dict=" + params.get("dict") + "&fest=" + params.get("fest") + querystring;
});
request.open("GET", url + "/festivali/" + params.get("dict") + "/" + params.get("fest") + ".json");
request.send();