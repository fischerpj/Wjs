// u2 stands for Url-Filter
// extracts Verses from Bgw

//    these known libraries
const axios = require('axios');
const cheerio = require('cheerio');

// metadata on WebSources
const api = {
      bgw: {
        desc: 'BibleGateway',
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1-6&version=SG21',
        content:'div.passage-content p',
        meta: 'div.dropdown-display-text'
        },
      bst: {
        desc: 'BibleStudyTools',
        url: 'https://www.biblestudytools.com/dictionaries/bakers-evangelical-dictionary/faith.html',
        content: 'div#library-article-container li',
        }
    };
console.log(api.bgw);

const sources = {
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
// 3 split if verse reference
split_ = function(
  x='eph2:8!SG21@bgw'){
  const values = x.split(/[!@]/);
  const keys = ['search','version','source'];
  const my_map = new Map();
  keys.forEach((pp,ii)=>{my_map.set(pp,values[ii])});
// delete undefined properties
  const result = Object.fromEntries(my_map);
  Object.keys(result).forEach(key => result[key] === undefined && delete result[key]);
  return result
};

input_ = function(
  x= '1tim3:16',
  defaut= 'ps1:1!SG21@bgw'){
  const my_x = split_(x);
  const my_defaut = split_(defaut);
  const result = actuals_(param=my_x, defaut=my_defaut);
//  return {
//    search:{search:  result.search, 
//            version: result.version},
//    source: result.source}
  return result
};
//console.log(input_());
//console.log(split_('gal3:2'));
//console.log(input_('ps1:1'));

// assemble queryString
queryString_ = function(
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

class What_ {
  constructor(x= 'john3:17'){
    Object.assign(this,input_(x));
    Object.assign(this,api[this.source]);
    this._search = '?'+ new URLSearchParams({search: this.search, version: this.version}).toString();
// update api url
   const my_parse = new URL(this.url);
   this._href = my_parse.origin + my_parse.pathname + this._search;
  }
async body_(){
  try{ 
    this._body = await 
      axios.get(this._href).then(x=>x.data);
    const $ = cheerio.load(this._body);
    this._content = $(this['content']).text().trim();
    return  {
        href: this._href,
        search: this.search,
        content: this._content
        };
  }
  catch(error){
  console.log(error)
  }
 } // end of fun
}
const bg = new What_();
bg.body_().then(x=>console.log(x));

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
// update searchString
   this._search = queryString_(this.search);
// update api url
   this._parse = new URL(this.url);
   this._href = this._parse.origin + this._parse.pathname+ this._search;
} // end of constructor
async body_(){
  try{ 
    this._body = await 
      axios.get(this._href).then(x=>x.data);
    const $ = cheerio.load(this._body);
    this._content = $(this.elements['content']).text().trim();
    return  {
        href: this._href,
        search: this.search,
        content: this._content
        };
  }
  catch(error){
  console.log(error)
  }
 } // end of fun
} // end of class
// instance of bgw
const bgw = new Obj_(sources.bgw);
//console.log(bgw);
//bgw.body_().then(x=>console.log(x));
