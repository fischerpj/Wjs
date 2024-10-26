// apmin.js offers the ClientAPI 
//   to the JsfAPI server, aka the proxy
//     OR to Bgw server, aka the source
//   for the request of Verses
//   sourced from Bgw, in- or -directly
//   and returned as json data

// VERSION: 0.214 26-oct-24
const level = "0.214 responseJson only";
// FUNCTIONS: look like
// - params_
// - mono_split_
// - mono_canon_
// - mini_split_

//  CLASSES: monoWhat_ is the ONLY class defined here
//  monoWhat_methods: [ 'jsf_api_', 'content_', 'bgw_verses_', 'passage_' ]
 
// version2 keeps verse_level structured elements
//    these known libraries

// objective
// full text of full chapter, structured as array of verses,
// formatted as 
// todo
// ref syntax 2:1-3:2
// remove subtitle element

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
        passage: 'div.passage-content',
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
res.param = param;
res.canon = res.search+res.version+res.call;
res.version  = res.version.replace(/[!@]/,"");
res.call  = res.call.replace(/[!@]/,"");
return res
}
//console.log(mono_canon_());

// monowhat gathers all Search and Endpoint data
class monoWhat_ {
constructor(x= 'john3:17-21!NGU-DE;ps1:1!SG21'){
    Object.assign(this,mono_canon_(x));
    Object.assign(this,api[this.call]);

// tentative constructor
//  this._result = await verses();
  }

// execute retrieval from Jsf
async jsf_api_(){
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
}  // end of method jsf_api_

// execute retrieval from Bgw directly
async content_(){
  try{
    this.href = this.url + '?'+ new URLSearchParams(
      {search: this.search,
       version: this.version})
      .toString();
    this._body = await axios
      .get(this.href)
      .then(x=>x.data);

    const $ = cheerio.load(this._body);// .footnote are all  removed up front from $ document
    $('.footnote').remove(); 
    const $passage = $(this['content']);
    this._content = $(this['content']);
//.text().trim();
//// V209 console.log(this._content);

const books = [];
const books1=  $(this['content']).children('span');
books1.each((index,book)=>{
    const structuredData = {
        vref: $(book).attr('class').replace('text ',''),
        vnum: $(book).find('.versenum').prop('outerHTML'),
        vtxt:  $(book, '*:not(.footnote)').prop('outerHTML')
    };
    books.push(structuredData)
});
//// V209 console.log(books);

    const arr = $(this['meta']);
    const ref = arr[0]['children']['0']['data'];
    const edition = arr[1]['children']['0']['data'];

    this._result = {
//      other: books,
      call: this.call,
      canon: this.canon,
      href: this.href,
      content: books,
      ref: ref,
      edition: edition,
      passage: $passage.prop('outerHTML'),
    };
    return this._result
  }
  catch(error){
    console.log(error)
    }
 } // end of method  'content_'

async bgw_verses_(){
  try{
// FETCH the resource in the cloud
// 1. craft the targeted url
    this.href = this.url + '?'+ new URLSearchParams(
      {search: this.search,
       version: this.version})
      .toString();
console.log(this.href);
// 2. FETCH actually the response abnd keep its data
    this._body = await axios
      .get(this.href)
      .then(x=>x.data);

// LOAD cheerio which is a FUNCTION
// load takes a string into a cheerio object, which is a function !
    const $ = cheerio.load(this._body);

// EXTRACT content-passage element
    this._passage = $(this['passage']);
// .footnote(s) are all  removed up front on $ document
    $('.footnote').remove();
    $('.footnotes').remove();
    this._nofoot = $(this['passage']); 

    $('.full-chap-link').remove();
    $('.chapternum').remove();
    $('.versenum').remove();

// META info
    const arr = $(this['meta']);
    const refs = arr[0]['children']['0']['data'];
    const edition = arr[1]['children']['0']['data'];
//console.log(refs+edition);

// keep only SPANS, a typeof  cheerio object
    this._spans =  $(this['passage'] + ' span');
// console.log(typeof this._spans);
// expected cheerio object keys
// [ '0', '1', '2', '3', 'length', 'options', '_root', 'prevObject' ]
// console.log(Object.keys(this._spans));

// ITERATE convert to Array / Map
    const verses = [];
// reference to last in _spans
    let last = undefined;
    let vhidden = 'false';
    this._spans.each((index,book)=>{
      let  vid =  $(book).attr('id');// isolate lang, version, verseid

// CASE undefined  id
    if (vid === undefined) {
// take previous value as replacement
      vid = verses[index-1].vid;
// inject id that is missing in this current
      $(book).attr("id", vid);
//  mark attr & prop as hidden 'last' which is a title text
      vhidden = 'true';
        $(last).attr("hidden",vhidden); 
        verses[index-1].hidden = vhidden;
      vhidden = 'false';
//  redo 'last' with this hidden attr
      verses[index-1].vouter = $(last).prop('outerHTML');
     };
// isolate lang, version, verseid
    let vlang, vversion, vseq;
    [vlang, vversion, vseq]=  vid.split("-");
// delineate bcv
   const  vref= $(book).attr('class').replace('text ','');
   let vbook, vchap, vnum;
   [vbook, vchap, vnum]=  vref.split("-");
// 
// make RESULT
      const structuredData = {
        vid: vid,
        hidden: vhidden,
        vlang: vlang,
        vversion: vversion,
        vseq: vseq,
        vref: vref,
        vbook: vbook,
        vchap: vchap,
        vnum: vnum,
        vouter:  $(book).prop('outerHTML'),
        vtext: $(book).text(),
        };
      verses.push(structuredData);
// memorize for next turn
    last = book;
    })
// make a Map thereof
const vmap = new Map(verses.map((obj) => [obj.vref, obj]
  ));
const jmap = JSON.stringify(Object.fromEntries(vmap));

// elaborate final RESULT of bgw_verses_
    this._result = {
// INPUT PARAMS recalled
//      paramInput: {
//        canon: this.canon,
//        call: this.call,
//        refs: refs,
//        edition: edition,
//        },
//      strucObject: {
//        outer: this._passage.prop('outerHTML'),
//        nofoot: this._nofoot.prop('outerHTML'),
//        spans: this._spans.prop('outerHTML'),
//        },
// VERSES collection AS JS Object is obliterated by V209
////      strucVerses: vmap,
// as JSON, the response object of [refs, edition, jmap] 
      responseJson: {
	level: level,
        param: this.param,
        search: this.search,
        version: this.version,
//      content: books,
        call: this.call,
        canon: this.canon,
        href: this.href,
        refs: refs,
        edition: edition,
// jmap is JSON MAP of VERSES collection
        jmap_content: jmap,
//        vjson: JSON.stringify(Array.from(verses)),
        }
      };
// return value of try of bgw_verses_
return this._result.responseJson;
//
  } //end of try
  catch(error){
    console.log(error)
    } // end of catch
 } // end of method  'bgw_verses_'

// retrieve from Bgw directly
async passage_(){
  try{
    this.href = this.url + '?'+ new URLSearchParams(
      {search: this.search,
       version: this.version})
      .toString();
    this._body = await axios
      .get(this.href)
      .then(x=>x.data);

    const $ = cheerio.load(this._body);
    this._raw_passage = $(this['passage']);
// .footnote(s) are all  removed up front from $ document
    $('.footnote').remove(); 
    $('.footnotes').remove(); 
//    $('.chapternum').remove(); 
    this._passage = $(this['passage']);
console.log(this._passage.prop('outerHTML'));
const books = [];
const books1=  $(this['passage'] + ' span');
books1.each((index,book)=>{
   let  vid =  $(book).attr('id');
console.log(index+vid);
   if (vid === undefined) {
     vid = books[index-1][0];
     books[index-1][0]= 'remove';
     };
// isolate lang, version, verseid
   let vlang, vversion, vseq;
   [vlang, vversion, vseq]=  vid.split("-");
// delineate bcv
   const  vref= $(book).attr('class').replace('text ','');
   let vbook, vchap, vnum;
   [vbook, vchap, vnum]=  vref.split("-");
    const structuredData = [
        vid,
        {vid: vid,
         vlang: vlang,
         vversion: vversion,
         vseq: vseq,
         vref: vref,
         vbook: vbook,
         vchap: vchap,
         vnum: vnum,
         vtxt:  $(book).prop('outerHTML')
    }];
    books.push(structuredData)
});
//console.log(books);

// convert to Map of verses
const verses = new Map(books);
// remove sole remaining bkey
////verses.delete('remove');
const vkeys = Array.from(verses.keys());
const vjson = JSON.stringify(Array.from(verses));
    const arr = $(this['meta']);
    const ref = arr[0]['children']['0']['data'];
    const edition = arr[1]['children']['0']['data'];

    this._result = {
//      other: books,
      paramInput: {
        param: this.param,
        canon: this.canon,
        call: this.call,
        version: this.version,
        search: this.search
        },
      queryUrl: {
        href: this.href,
        desc: this.desc,
        url: this.url
        },
      bodyRaw: {
        raw: this._raw_passage,
        passage: this._passage.prop('outerHTML'),
        content: this.content,
        passage: this.passage,
//        passage: $passage.prop('outerHTML'),
        meta: this.meta
        },
      strucObject: {
        verses: verses,
        vkeys: vkeys,
        v0: verses.get(vkeys[0]),
        v1: verses.get(vkeys[1]), 
        v1b: verses.get('remove')
        },
      responseJson: {
//      content: books,
        ref: ref,
        edition: edition,
        vjson: vjson
        }
    };
    return this._result
  }
  catch(error){
    console.log(error)
    }
 } // end of method  'content_'

} // end of object 'monoWhat_'

// make instance of object 'monoWhat_'
const mw = new monoWhat_("eph2:8-9");

// ENUMERATE the methods available in class monoWhat_

// general purpose UTILITY to list the methods of a class 
function listClassMethods(classObj) {
  let methods = Object.getOwnPropertyNames(classObj.prototype);
  return methods.filter(method => method !== 'constructor');
}

let methods = { monoWhat_methods: listClassMethods(monoWhat_)};
console.log("\nmw.methods =>");
console.log(methods); 

// mw.jsf_api_().then(x=>console.log(x));
//console.log(mw);

// invoke method 'content_'
console.log("\nmw.content_ =>");
//mw.content_().then(x=>console.log(x));

//// Recall bgw_verses return structure is a json object
//
console.log("\nmw.bg_verses_ =>");
mw.bgw_verses_().then(x=>console.log(x));

mini_split_ = function(x= params_()){
  return x.map((x) => mono_canon_(x))
}
