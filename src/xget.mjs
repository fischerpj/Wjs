// with  axios.get
// aData_  response.data promise

// IMPORTS ..
//    proprietary js files
const uri = import("./uri.js");
//    known libraries
const axios = import('axios');
const cheerio = import('cheerio');

// here functions definitions
//
// response.data via asynchronous axios.get
async function aData_(url) {
try{
let response = await axios.get(url);
return response.data
}
catch(error){
console.log(error)
}
};
