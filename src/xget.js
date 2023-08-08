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
// filter inside body
exports.asDom_ = function (html,top){
// Use Cheerio to parse the HTML
console.log(top);
//console.log(html);

    const $ = cheerio.load(html);
    const all_li = $(top);
// Iterate over each div and span element and print its text content
all_li.each((i, element) => {
    console.log($(element).text());
});

// Extract the text content of the first .red element
const data = $.extract({
  red: '.red',
});

const animalsCopy = all_li.reduce((gang, animal) => [
  ...gang,
  { animal }
], []);

console.log(animalsCopy);
return all_li
}
// response.data via asynchronous axios.get
exports.aData_ = async function (url) {
try{
let response = await axios.get(url);
return response.data
}
catch(error){
console.log(error)
}
};
