let popup = document.getElementById("popup");
let login = document.getElementById("login");
let close = document.getElementById("close");
login.addEventListener('click', function(e)
{
    popup.style.display = "block";
});
close.addEventListener('click' , function(e){
    popup.style.display = "none";
})