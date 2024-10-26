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

param_ = function(x =
  "1john3:16-18!SG21@bgw;act4:12+5:1-3"){
  return x.split(";")
}
//console.log(param_());

split_ = function (x = param_()[0]){
  const s = x
    .match(/@[A-Z0-9]*/gi);
  const e = x
   .replace(s,"")
   .match(/![A-Z0-9]*/gi);
  const b = x
   .match(/^\d*[a-z]+/gi);
  const cv = x
   .replace(s,"")
   .replace(e,"")
   .replace(b,"")
   .split("+")
  const bcv = {
   s: s,
   e: e,
   b: b,
   cv: cv
   }
// delete ""  property
Object.keys(bcv)
  .forEach(key =>
    bcv[key] === null
    && delete bcv[key]);

  return bcv
}
console.log(split_());

canon_ = function(
  x= '2tim4:5',
  defaut= 'ps1:1!SG21@bgw'){
  const my_x = split_(x);
  const my_defaut = split_(defaut);
  const result = {...my_defaut, ...my_x};
  result.input = x;
  result.params = result.cv.map((x)=>result.b+x+result.e+result.s);
//  result.canon = result.b + result.cv +result.e +result.s
  return result
}
//console.log(canon_())

bcv_ = function(x= param_()){
  const res = x
//    .map((x) => split_(x)) 
    .map((x) => canon_(x))
  return res
}
//console.log(bcv_());

// api stands for retrieval of json data
// extracted Verses from Bgw

// what gathers all search and endpoint data
class miniWhat_ {
  constructor(x= 'john3:17!NGU-DE'){
console.log(x);
console.log(canon_(x));
    this.param = canon_(x).params[0];
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

//const bg2 = new What_('rom13:5-6,9!NGU-DE');
//console.log(bg2);
const bg2 = new miniWhat_('eph1-6');
console.log(bg2);
//bg2.content_().then(x=>console.log(x));
//bg2.api_().then(x=>console.log(x));

