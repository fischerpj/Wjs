// with  axios.get
// .get a data promise
// await response.data

const axios = require('axios');
const cheerio = require('cheerio');

// here functions definitions
//
// promised axios.get .data
function xGet_() {
return axios.get('http://webcode.me').then(reponse => reponse.data)
}

function asDom_(html){
    // Use Cheerio to parse the HTML
    const $ = cheerio.load(html);
return $
}

// asynchronous axios.get of .data
async function aData_(url) {
try{
let response = await axios.get(url);
return response.data
}
catch(error){
console.log(error)
}
};

// endpoint definitions
function endpoint_(){
return 'https://www.biblestudytools.com/concordances/torreys-topical-textbook/sin.html';
}

//  execute functions here
//console.log(xGet_());
aData_(endpoint_())
.then(html => console.log(asDom_(html)));
//hGet_();

// document.getElementsByTagName("div") 
