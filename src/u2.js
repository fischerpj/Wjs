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

bcv_ = function(x='2john3:16!SG21@bgw'){
// tri-split
const values = x.split(/[!@]/);
const book =  x
  .match(/\d*[a-z]+/i)[0];
// chapter : verse
const cv =  x
  .match(/\d+:\d*/i)
  [0];
// destructuring
const [c,v] = cv.split(/[:]/);
const bcv = {
  input: x,
  query: '?'+ new URLSearchParams({search: book+cv, version: values[1]}).toString(),
  search: book+cv,
  bc: book+c,
  b: book,
  c: c,
  v: v,
  version: values[1],
  source: values[2]
  };
// delete undefined property
Object.keys(bcv)
 .forEach(key => bcv[key] === undefined &&
 delete bcv[key]);
return bcv
}

// normalize bcv input
input_ = function(
  x= '2tim4:5!NGU-DE',
  defaut= 'ps1:1!SG21@bgw'){
  const my_x = bcv_(x);
  const my_defaut = bcv_(defaut);
  const result = actuals_(param=my_x, defaut=my_defaut);
  return result
};
//console.log(input_());

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
      axios.get(this.href).then(x=>x.data);
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

const bg = new What_();

bg.content_().then(x=>console.log(x));


