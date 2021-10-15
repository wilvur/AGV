const requestURL = 'http://localhost/agv/api/';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function(){
    const avisos = request.response;
    console.log(avisos)
} 