const qrcode = new QRCode(document.getElementById('qrcode'), {
  text: 'http://jindo.dev.naver.com/collie',
  width: 128,
  height: 128,
  colorDark : '#000',
  colorLight : '#fff',
  correctLevel : QRCode.CorrectLevel.H
});


// in html
// <script src="https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js"></script>
//<div id="qrcode"></div>


// __ Importing qrcode __ \\
const qrcode = require('qrcodejs');

//var qrcode = new QRCode("test", {
  //  text: "http://jindo.dev.naver.com/collie",
  //  width: 128,
  //  height: 128,
  //  colorDark : "#000000",
  //  colorLight : "#ffffff"
//    correctLevel : QRCode.CorrectLevel.H
//});
qrcode.clear(); // clear the code.
qrcode.makeCode("http://naver.com"); // make another code.
