// uri definitions

// here functions definitions
// uri_
//
exports.uri_one_ = function(ii){
return uri_()[ii]
}

// using object as collection of tags
col_ = function(){
const my ={}
my.bgw='biblegateway';
return my
}
console.log(col_());

// uri_ defines url and filter
exports.uri_ = function (){
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

