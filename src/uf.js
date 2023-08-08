// uf stands for Url Filter
// extract verse from bgw
// todo: destructure sel2 or extract
//    known libraries
const axios = require('axios');
const cheerio = require('cheerio');

// declaration of CLASSES
// qr_ : query data
// gen_ : extracts Content, Meta from Url, 
class Qro_{
  constructor(params={
    version: 'SG21',
    ref: 'rom1:17'}
    ){
    const keys = Object.keys(params);
    for (const k in keys) {this[k]= params[k]};
}}

qro = new Qro_();
console.log(qro);

class Qr_ {
  constructor(...params){
   this[params[0]]='tito'
   params.forEach((pp,ii) => 
this[ii]= pp)
}
}
console.log(new Qr_(version='SG21'));

class gen_ {
  constructor(
    ask = 'rom1:17-18',
    url='https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
    content = 'div.passage-content p', 
    meta= 'div.dropdown-display-text',
    version ='SG21',
    type='filter'){
  this.ask = ask;
  this.version= version;
  this.url = url;
  this.content = content;
  this.meta = meta;
  this.type= type;
  this.parse = new URL(url);
  this.requery = this.requery_(this.ask,this.version);
  this.research = this.research_(this.parse,this.requery);
  }
// methods
// recraft query string
 requery_(aa='rom1:17',vv='SG21'){ 
  let p1 = new URLSearchParams();
// handle searchParams
  p1.append('search',aa);
  p1.append('version',vv);
  return '?'+p1.toString()
}
// recraft SEARCH string 
  research_(uu=this.parse, qq=this.requery) {
    // do something
    return  uu.origin + uu.pathname+qq;
  }
}

// acces with Name an object's collection of objects 
const w3 = {};
// bgw passage search like rom1:17
w3['bgw'] = new gen_();
// bst dictionnary entry like faith
w3['bst'] = new gen_(
  ask = 'faith',
  url= 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/faith.html',
  content= 'div#library-article-container li',
  meta='');
//
console.log(w3.bgw);

// handle urls
let f1= new gen_();
let my_url = new URL(f1.url);
let base = my_url.origin+ my_url.pathname;
//console.log(my_url);
//console.log(base);
//console.log(JSON.stringify(f1));
//console.log(my_url.searchParams);
let p1 = new URLSearchParams();
// handle searchParams
p1.append('search','rom1:1-6');
p1.append('version','SG21');
//console.log(p1.toString());

aCombo_ = function(
  search = 'rom1:17',
  url='https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
  meta='.dropdown-display-text',
  content='div.passage-content p'){

//let my_bgw  = new Bgw();

let my_data = aBody_(url)
  .then(body=>{
    const $ = cheerio.load(body);
    const data = $(content);
    const data2 = $(meta);
//     const data3 = $.extract({toto: sel2});
    return data2
  });

return my_data
}

// aBody_ stands for Url,Get,Body
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
  constructor(
    ask='rom1:17',
    version='SG21') {
      this.name = 'Bgw';
      this.ask = ask;
      this.version = version;
      this.url = 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21';
      this.filter = 'div.passage-content p';
    this.filter2 = '.dropdown-display-text'
    }
}

// instanciation of object
const verse = aCombo_();
verse.then(x=>console.log(x.text()));

// URI definitions
// uri_
//
// uri_ defines Array of url and filter
uri_ = function (){
var arr = [];
    arr.push({
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
        elements:[{filter: 'div.passage-content p'},
                  {filter2: 'div.dropdown-display-text'}],
        desc: 'bgw'
    });
    arr.push({
        url: 'https://www.biblestudytools.com',
        filter: 'div#library-article-container li',
        desc: 'bst'
    });
return arr;
}
// UTILS
// names of arguments
//var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getParamNames(func) {
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if(result === null)
     result = [];
  return result;
}
console.log(getParamNames(aCombo_));
