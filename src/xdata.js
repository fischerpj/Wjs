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
//console.log(html);

    const $ = cheerio.load(html);
    const all_li = $('div#library-article-container li');
// Iterate over each div and span element and print its text content
all_li.each((i, element) => {
    console.log($(element).text());
});
//return $
// Use Cheerio to parse the HTML
////const $ = cheerio.load(html);

// Select all the elements with the class name "athing"
/////const articles = $(".athing");

// Loop through the selected elements
/////for (const article of articles) {
    // Organize the extracted data in an object
/////    const structuredData = {
/////        url: $(article).find(".titleline a").attr("href"),
////        rank: $(article).find(".rank").text().replace(".", ""),
////        title: $(article).find(".titleline").text(),
/////        author: $(article).find("+tr .hnuser").text(),
/////        points: $(article).find("+tr .score").text().replace(" points", ""),
////    };

    // Log each element's strcutured data results to the console
////    console.log(structuredData);
/////}

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
.then(html => asDom_(html));
//hGet_();

// document.getElementsByTagName("div") 

