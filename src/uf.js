// uf stands for Url-Filter
// extracts Verses from Bgw

//    these known libraries
const axios = require('axios');
const cheerio = require('cheerio');

//console.log('---> prelim objects');

// metadata on WebSources
const registry = {
      bgw: {
        desc: 'BibleGateway',
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
        search: {
          search:'rom1:17',
          version:'SG21'},
        elements:  {
          content:'div.passage-content p',
          meta: 'div.dropdown-display-text'
        }},
      bst: {
        desc: 'BibleStudyTools',
        url: 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/faith.html',
        index: 'faith.html',
        elements: {
          content: 'div#library-article-container li',
          meta:''
        }}
    };

//console.log('-----> prelim functions');

// helper with default arguments
// returns only one merged object
actuals_ = function(
  param={
    search: 'ps1:1',
    version: 'NGU-DE'},
  defaut = { 
    search: 'hab2:4',
    version: 'SG21'}
  ){
return {...defaut, ...param}
}

// assemble queryString
query_string_ = function(
  search = registry.bgw.search
  ){
// collect param's keys in array
   const myKeys = Object.keys(search);
// collect param's values in array
    const myValues = Object.values(search);
    my_search = new URLSearchParams;
    myKeys.forEach((pp,ii)=> my_search.append(myKeys[ii],myValues[ii]));
    return '?'+my_search.toString();
}

//console.log('----->  Functions');

// one-wrapper url and extract
aCombo_DEP_ = function(
  url= bgw.href,
  content='div.passage-content p'
  ){
let my_data = aBody_(url)
  .then(body=>{
    const $ = cheerio.load(body);
    const data = $(content);
    return data
  });
return my_data
}

// aBody_ stands for Url,Get,Body
// response.data via asynchronous axios.get
aBody_ = async function (
  url = registry.bgw.url
  ) {
try{
  let response = await axios.get(url);
  return response.data
  }
catch(error){
  console.log(error)
  }
};

//aBody_().then(x=> console.log(x));

cExtract_ =  function(
  content='div.passage-content p',
  x= aBody_()
  ){
let my_data =   x.then(body=>{
    const $ = cheerio.load(body);
    const data = $(content).text().trim();
    return data
    });
return my_data;
};
//cExtract_().then(x=>console.log(x.text()));

//console.log('-----> Start Classes');
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
   this._search = query_string_(this.search);
   this._parse = new URL(this.url);
   this._href = this._parse.origin + this._parse.pathname+ this._search;
}
// getter-setter methods
get href() {
  return this._href 
};

 set  what(x){
  this._search = query_string_(actuals_({search: x}));
  this._href = this._parse.origin + this._parse.pathname + this._search;
  this._body = aBody_(this._href);
  this._content =  cExtract_(this.elements['content'],this._body);
  this._result = {
    href: this._href, 
    content: this._content
    };
  };
}

// instance of bgw
const bgw = new Obj_(registry.bgw);
// reset search upto body zand content
bgw.what = 'rom2:1-12';
//bgw.what.then(x=>console.log(x));
bgw._content.then(x=>console.log(x));
console.log(bgw._result);
