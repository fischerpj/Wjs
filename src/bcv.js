bcv_ = function(x='2John3:16!SG21@bgw'){
const values = x.split(/[:!@]/);
const book =  x
  .toLowerCase()
  .match(/\d*[a-z]+/)[0];
// chapter : verse
const cv =  x
  .toLowerCase()
  .match(/\d+:\d+/)
  [0];
const version = x.match(/!\w@/);
// destructuring
const [c,v] = cv.split(/[:]/);
const bcv = {
  input: x,
  search: book+cv,
  bc: book+c,
  b: book,
  c: c,
  v: v,
  version: values[1],
  source: values[2]
  };
// delete undefined
Object.keys(bcv)
 .forEach(key => bcv[key] === undefined &&
 delete bcv[key]);

return bcv
}
console.log(bcv_('2John3:16!SG21'));
