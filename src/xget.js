const axios = require('axios');

// ici on definit les functions
function xGet_() {
axios.get('http://webcode.me').then(
response => {console.log(response.data)}
);
}

// header just
function hGet_() {
axios.head('http://webcode.me').then(
response => {console.log(response)}
);
}

async function wGet_() {
try{
const response = await axios.get('http://webcode.me');
console.log(response);
}
catch(error){
console.log(error)
}
};
// ici on execute les functions
//xGet_();
//wGet_();
hGet_();
