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
