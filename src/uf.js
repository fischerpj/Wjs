// uf stands for Url Filter
// extract verse from bgw
// todo: destructure sel2 or extract
//    known libraries
const axios = require('axios');
const cheerio = require('cheerio');

// preliminary objects
console.log('-----> prelim objects');
const registry = {
      bgw: {
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
        search: {
          search:'rom1:17',
          version:'SG21'},
        elements:  {
          content:'div.passage-content p',
          meta: 'div.dropdown-display-text'
        }},
      bst: {
        url: 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/faith.html',
        index: 'faith.html',
        elements: {
          content: 'div#library-article-container li',
          meta:''
        }}
    };
//console.log(registry.bgw.search);

// preliminary functions
console.log('-----> start of preliminary functions');

// helper with default arguments
// returns only one merged object

actuals_ = function(
  param={
    ref: 'ps1:1',
    version: 'SG21'},
  defaut = { 
    ref: 'gen1:1',
    version: 'SG21'}
  ){
return {...defaut, ...param}
}
////console.log(actuals_({version: 'NGU-DE'}));

query_string_ = function(search =registry.bgw.search){
// collect param's keys in array
   const myKeys = Object.keys(search);
// collect param's values in array
   const myValues = Object.values(search);
    my_search = new URLSearchParams;
    myKeys.forEach((pp,ii)=> my_search.append(myKeys[ii],myValues[ii]));
    return '?'+my_search.toString();
}
console.log(query_string_());

// declaration of CLASSES
// gen_ : extracts Content, Meta from Url, 
console.log('-----> Start Classes');

// Obj_ ...params populates Keys, Values, Properties
class Obj_ {
 constructor(
   ...params){
// collect all keys in array
   this._keys = Object.keys(...params);
// collect all values in array
   this._values = Object.values(...params);
// populate individual this.properties of this
   this._keys.forEach((pp,ii)=>this[this._keys[ii]]=this._values[ii]);
//   params.forEach((pp,ii) => this[ii]= pp)
// check presence
// collect param's values in array
//if (this._keys.includes('search')){
//  const myValues = Object.values();
    this._search = query_string_(this.search);
//    myKeys.forEach((pp,ii)=> this._search.append(myKeys[ii],myValues[ii]));(
    this._url = this._keys.includes('url');
}}

console.log(new Obj_(registry.bgw));

// Query_ extends Obj_ with  UrlSearchParams 
class Query_ extends Obj_ {
  constructor(
    params = actuals_(),
    ...rest
    ){
// craft URLSearchParams
// need to call super constructir first
  const args= actuals_(params,...rest);
  super(args);
// collect param's keys in array
   const myKeys = Object.keys(params);
// collect param's values in array
   const myValues = Object.values(params);
    this._search = new URLSearchParams;
    myKeys.forEach((pp,ii)=> this._search.append(myKeys[ii],myValues[ii]));
}
// method 
  toString() {
    return '?'+this._search.toString();
  }
}

qro = new Query_(
  {ref: 'heb4:12',version: 'NGU-DE'},
  {toto: 'itsme',field: 'magnetic'});
////console.log(qro.toString());

// create a bgw instance from registry info
const bgw = new Query_(
  registry['bgw'].what, 
  actuals_(registry.bgw.where,
  registry.bgw.how));
console.log(bgw);

// build actuals 
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
  research_(
    uu=this.parse, 
    qq=this.requery) {
    // do something
    return  uu.origin + uu.pathname+qq;
  }
}

class Bgw {
  constructor(
    ask='rom1:17',
    version='SG21') {
      this.name = 'Bgw';
      this.ask = ask;
      this.version = version;
      this.url='https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
      this.filter = 'div.passage-content p';
      this.filter2= 'div.dropdown-display-text';
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
////console.log(w3.bgw);

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
console.log(p1);
console.log(p1.get('search'));

// FUNCTIONS
console.log('-----> Start Functions');

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

// instanciation of object
const verse = aCombo_();
verse.then(x=>console.log(x.text()));

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
