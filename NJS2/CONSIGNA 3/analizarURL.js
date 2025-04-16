const { URL } = require('url'); 

function analizarURL(url) {
    const miUrl = new URL(url);

    console.log('   URL Completa: ', miUrl.href);
    console.log('   Host: ', miUrl.host);
    console.log('   Protocol: ', miUrl.protocol);
    console.log('   Pathname: ', miUrl.pathname);
    console.log('   Search: ', miUrl.search);
    console.log('   Hash: ', miUrl.hash);
    console.log('   Hostname: ', miUrl.hostname);
    console.log('   Port: ', miUrl.port);
    console.log('   Username: ', miUrl.username);
    console.log('   Password: ', miUrl.password);
}
//ejemplo de uso 
analizarURL('https://usuario:contraseña@www.ejemplo.com:8080/path?search=valor#fragmento');