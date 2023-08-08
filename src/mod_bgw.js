// model_bgw
// retrieve verse from bgw

//    known libraries
const axios = require('axios');
const cheerio = require('cheerio');

cElement_ = function(html,top){
// Use Cheerio to parse the HTML
console.log(top);
const $ = cheerio.load(html);
const data = $(top);
// Extract the text content of the first .red element
//const data2 = $.extract({
//  red: top});
return data
}

// response.data via asynchronous axios.get
aBody_ = async function (url) {
try{
let response = await axios.get(url);
console.log('return from abody');
return response.data
}
catch(error){
console.log(error)
}
};

class Bgw {
  constructor() {
    this.name = 'Bgw';
    this.ask = 'rom1:17';
    this.version = 'SG21';
    this.url = 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
    this.filter = 'div.passage-content p',
    this.filter2 = '.dropdown-display-text',
    this.body =  aBody_(this.url),
    this.text = cElement_(this.body,this.filter),
//    this.ref = aCombo_(this.body,this.filter2);
    this.json = function() {return JSON.stringify(this.ask)}
    }
}

// instanciation of object
const bgw1 = new Bgw();
// can execute functions before definit>
//bgw1.json().then(x => console.log(x));
console.log(bgw1.text.length);
//.then(x=>console.log(x));
// selected properties
////const picked = (({ask,text}) => ({ask,text}))(bgw1);
////console.log(picked);

//bgw1.json().then(x => console.log(x));
//console.log(bgw1.json());
//const picked = (({ ask, ref }) => ({ ask, ref}))(bgw1);
//console.log(picked);
//const picked = (({ a, c }) => ({ a, c }))(object);
