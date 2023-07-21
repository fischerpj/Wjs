const axios = require('axios');

// 
function endpoint_(){
return 'https://www.biblestudytools.com/concordances/torreys-topical-textbook/sin.html';
}

// ici on definit les functions

// header just
function hGet_(url) {
// 'http://webcode.me'
axios.head(url).then(response=> {console.log(response)});;
}

// ici on execute les functions
hGet_(endpoint_());
console.log(endpoint_());
