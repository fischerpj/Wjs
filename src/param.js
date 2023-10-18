param_ = function(x =
  "1john3:16-18!SG21@bgw;act4:12+5:1-3"){
  return x.split(";")
}
//console.log(param_());

split_ = function (x = param_()[0]){
  const s = x
    .match(/@[A-Z0-9]*/gi);
  const e = x
   .replace(s,"")
   .match(/![A-Z0-9]*/gi);
  const b = x
   .match(/^\d*[a-z]+/gi);
  const cv = x
   .replace(e+s,"")
   .replace(b,"")
   .split("+")
  const bcv = {
   s: s,
   e: e,
   b: b,
   cv: cv
   }
// delete ""  property
Object.keys(bcv)
  .forEach(key =>
    bcv[key] === null
    && delete bcv[key]);

  return bcv
}
//console.log(split_());

canon_ = function(
  x= '2tim4:5',
  defaut= 'ps1:1!SG21@bgw'){
  const my_x = split_(x);
  const my_defaut = split_(defaut);
  const result = {...my_defaut, ...my_x};
  result.input = x;
  result.canon = result.b + result.cv +result.e +result.s
  return result
}
//console.log(canon_())

bcv_ = function(x= param_()){
  const res = x
//    .map((x) => split_(x)) 
    .map((x) => canon_(x))
  return res
}
console.log(bcv_());
