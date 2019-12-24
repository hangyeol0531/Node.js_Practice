function getUser(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status === 200){
            var users = JSON.parse(xhr.responseText);
            var list = document.getElementById('list');
            list.innerHTML = ' ';
        }
    }
}