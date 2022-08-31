function plugin(){
   // let utils = require.context(".", false, /\.js$/)
   const utils= import.meta.globEager('./*.js') 
   console.log(utils)
   let $util = new Object();   
   utils.keys().forEach(key=>{
     if (key === './index.js') return;
     let utilName = key.replace(/^\.\//, "").replace(/\.js/, ""); 
     $util[utilName] = utils(key).default; 
   });
   
 }
 export default plugin