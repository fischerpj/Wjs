// uri definitions

// here functions definitions
// uri_
//
// uri_ defines url and filter
function uri_(){
var arr = [];
    arr.push({
        url: 'https://www.biblegateway.com/passage/?search=Rom1%3A1&version=SG21',
        filter: '.dropdown-display-text',
        desc: 'bgw'
    });
    arr.push({
        url: 'https://www.biblestudytools.com',
        filter: 'div#library-article-container li',
        desc: 'bst'
    });
return arr;
}
