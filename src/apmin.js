	// api stands for retrieval of json data
// extracted Verses from Bgw

//    these known libraries
const axios = require('axios');
const cheerio = require('cheerio');
const API_ENDPOINT =  'https://jsfapi.netlify.app/.netlify/functions/bgw';

// metadata on WebSources
const api = {
      bgw: {
        desc: 'BibleGateway',
        api: 'https://jsfapi.netlify.app/.netlify/functions/bgw',
        url: 'https://www.biblegateway.com/passage/',
        content:'div.passage-content p',
        meta: 'div.dropdown-display-text',
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
//console.log(api.bgw);

params_ = function( 
  x='rom1:17;gen1:1!NGU-DE;ps1:1-3!KJV@bgw;ps121:1,4,5!SG21;ps117@bgw' ){
  const params = x.split(";");
  return params
}
//console.log(params_());

// Splits just One Param String
mono_split_ = function(x= params_()[0]){
// source
const source = x
  .match(/@[A-Z]+/gi);
// version
const version = x
  .match(/![A-Z0-9-]+/gi);
// search ie entire bcv
const search = x
  .match(/^[A-Z0-9:,-]+/gi);
// result object
const bcv = {
  param: x,
  canon: '',
  call: source,
  search: search,
  version: version
}
// delete null property
Object.keys(bcv)
 .forEach(key => 
  bcv[key] === null && delete bcv[key]);
return bcv
}
//console.log(mono_split_());

/// Canonize Just One Param
mono_canon_ = function(
  param = params_()[0], 
  defaut= 'ps1:1!SG21@bgw'){
const my_param = mono_split_(param);
const my_defaut = mono_split_(defaut);
const res = {...my_defaut,...my_param};
// from array to string
Object.keys(res)
 .forEach(key => 
  res[key] = ""+ res[key]);
res.canon = res.search+res.version+res.call;
res.version  = res.version.replace(/[!@]/,"");
res.call  = res.call.replace(/[!@]/,"");
return res
}
console.log(mono_canon_());

// monowhat gathers all search and endpoint data
class monoWhat_ {
  constructor(x= 'john3:17!NGU-DE'){
    Object.assign(this,mono_canon_(x));
    Object.assign(this,api[this.call]);
  }

// retrieve from Jsf
async api_(){
  try{
    this.href = this.api + '?'+ new URLSearchParams(
      {param: this.canon})
      .toString();
    this._body = await axios
      .get(this.href)
      .then(x=>x.data);
    return this._body
  }
  catch(error){
    console.log(error)
  }
}

// retrieve from Bgw directly
async content_(){
  try{
    this.href = this.url + '?'+ new URLSearchParams(
      {search: this.search,
       version: this.version})
      .toString();
    this._body = await axios
      .get(this.href)
      .then(x=>x.data);

    const $ = cheerio.load(this._body);
    this._content = $(this['content']).text().trim();
    const arr = $(this['meta']);
    const ref = arr[0]['children']['0']['data'];
    const edition = arr[1]['children']['0']['data'];

    this._result = {
      call: this.call,
      canon: this.canon,
      href: this.href,
      content: this._content,
      ref: ref,
      edition: edition,
    };
    return this._result
  }
  catch(error){
    console.log(error)
    }
 } // end of fun
}
const mw = new monoWhat_();
console.log(mw);
mw.api_().then(x=>console.log(x));
mw.content_().then(x=>console.log(x));

mini_split_ = function(x= params_()){
  return x.map((x) => mono_canon_(x))
}
console.log(mini_split_());
