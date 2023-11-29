// api stands for retrieval of json data
// extracted Verses from Bgw
// test change for git 
//    these known libraries
const axios = require('axios');
const cheerio = require('cheerio');
const API_ENDPOINT =  'https://jsfapi.netlify.app/.netlify/functions/bgw';

// metadata on WebSources
const api = {
      bgw: {
        desc: 'BibleGateway',
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
        content:'div.passage-content p',
        meta: 'div.dropdown-display-text',
        api: 'https://jsfapi.netlify.app/.netlify/functions/bgw',
        },
      bst: {
        desc: 'BibleStudyTools',
        url: 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/faith.html',
        content: 'div#library-article-container li',
        },
      jsf: {
        desc: 'jsfapi.netlify.app',

        }
    };

// returns only one merged object
actuals_ = function(
  param={
    search: 'ps1:1',
    version: 'NGU-DE'
    },
  defaut = { 
    search: 'hab2:4',
    version: 'SG21'
    }
  ){
return {...defaut, ...param}
}

params_ = function( x='2john3:16-17,2,5+5:3;ps51+53:2' ){
  const params = x.split(";");
  return params
}
//console.log(params_());

bcv_split_ = function( x='2john3:16-17,2,5+5:3' ){
// syntax is ^BC:V-V!E@S$
//  source web is 
//  everything but stripped before @
  const s = x
// from start to eventually @ make empty to keep source
   .replace(/^.*@*/,"@")
//  edition
// discard previous source
// from start to enventually ! make empty 
  const e = x
    .replace(s,"")
    .replace(/^.+!*/,"!")
// book
  const b =  x
//  nullify from chapter : to end 
    .replace(/[0-9]+:.+$/,"")
// verses
  const cv = x
    .replace(/^\d*[a-z]+/,"")
    .replace(/!.+/,"")
    .split("+")

//  const canon = cv.map(x => {return b+x+e+s});

  const bcv = {
    param: x,
    source: s,
    version: e,
    b: b,
    cv: cv
    };

// delete ""  property
//Object.keys(bcv)
//  .forEach(key => 
//   bcv[key] == "" && delete bcv[key]);

return bcv
}
console.log(bcv_split_('ps1:1!SG21@bgw'));

canon_ = function(
  param = params_()[0], 
  defaut= 'ps1:1!SG21@bgw'){
const my_param = bcv_split_(param);
const my_defaut = bcv_split_(defaut);
const res = {...my_param,...my_defaut};
return res
}
console.log(canon_());

bcv_ = function( x='2john3:16-17!SG21@bgw' ){
// syntax is ^BC:V-V!E@S$
  const bc = x
    .match(/^\d*[a-z]+[0-9]+/i);
  const b =  bc[0]
    .match(/^\d*[a-z]+/i);
  const c = bc[0]
    .match(/\d*$/);
  const v = x
    .match(/:[0-9-,]*/);
  const e = x
    .match(/![a-z0-9-]*@*/i);
  const s = x
    .match(/@[a-z0-9]+$/i);
  const bcv = {
    bc: bc,
//    b: b,
//    c: c,
      v: v,
    version: e,
    source: s
    };
// delete null  property
Object.keys(bcv)
 .forEach(key => 
  bcv[key] === null && delete bcv[key]);

// collect param's values in array
  const myKeys = Object.keys(bcv);
  const myValues = Object.values(bcv);

  const myMap = new Map();
    myKeys.forEach((pp,ii) =>  myMap.set(pp,myValues[ii][0].replace(/[@:!]/g,'')));
    const myResult  = Object.fromEntries(myMap);
//    myResult.bc = myResult.b + myResult.c;
    myResult.search = [myResult.bc,myResult.v].filter(Boolean).join(':');
    myResult.param = x;
  return myResult
}
//console.log(bcv_("2Sam1:6-7,12,15"));

// normalize bcv input
input_ = function(
  x= '2tim4:5-8',
  defaut= 'ps1:1!SG21@bgw'){
  const my_x = bcv_(x);
  const my_defaut = bcv_(defaut);
  const result = actuals_(param=my_x, defaut=my_defaut);
  result.canon = result.search +'!'+result.version+'@'+result.source;
  result.query = '?'+ new 
URLSearchParams(
{search: result.search, 
version: result.version})
.toString();
return result
};
//console.log(input_());

// what gathers all search and endpoint data
class miniWhat_ {
  constructor(x= 'john3:17!NGU-DE'){
    this.param = x;
    this.api = API_ENDPOINT;
  }

async api_(){
  try{
    this._body = await axios
      .get(this.api, {
        params: { param: this.param}
        })
      .then(x=>x.data);
    return this._body
  }
  catch(error){
    console.log(error)
  }
}}

// what gathers all search and endpoint data
class What_ {
  constructor(x= 'john3:17!NGU-DE'){
    Object.assign(this,input_(x));
    Object.assign(this,api[this.source]);
//    this._search = '?'+ new URLSearchParams({search: this.search, version: this.version}).toString();
// update api url
   const my_parse = new URL(this.url);
   this.href = my_parse.origin + my_parse.pathname + this.query;
  }

async content_(){
  try{
    this._body = await 
      axios.get(this.url).then(x=>x.data);
    const $ = cheerio.load(this._body);
    this._content = $(this['content']).text().trim();
    const arr = $(this['meta']);
    const ref = arr[0]['children']['0']['data'];
    const edition = arr[1]['children']['0']['data'];

    this._result = {
      search: this.search,
      version: this.version,
      text: this._content,
      ref: ref,
      edition: edition,
      href: this.href,
    };
    return this._result
  }
  catch(error){
    console.log(error)
    }
 } // end of fun
}

const bg2 = new What_('rom13:5-6,9!NGU-DE');
//console.log(bg2);
//const bg = new miniWhat_('is42:1-5!SG21');
//console.log(bg);
//bg2.content_().then(x=>console.log(x));
//bg2.api_().then(x=>console.log(x));

//≠≠============


queryString_dep_ = function(
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
