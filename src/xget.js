// with  axios.get
// aData_  response.data promise

// IMPORTS ..
//    proprietary js files
const uri = require("./uri");
//    known libraries
const axios = require('axios');
const cheerio = require('cheerio');

// here functions definitions
//
// response.data via asynchronous axios.get
export async function aData_(url) {
try{
let response = await axios.get(url);
return response.data
}
catch(error){
console.log(error)
}
};
