var t=Object.defineProperty;var l=Object.getOwnPropertyDescriptor;var n=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var P=(o,e)=>{for(var r in e)t(o,r,{get:e[r],enumerable:!0})},d=(o,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of n(e))!y.call(o,s)&&s!==r&&t(o,s,{get:()=>e[s],enumerable:!(a=l(e,s))||a.enumerable});return o};var i=o=>d(t({},"__esModule",{value:!0}),o);var A={};P(A,{lambdaHandler:()=>c});module.exports=i(A);var c=async o=>{let e;try{e={statusCode:200,headers:{"Access-Control-Allow-Origin":"*"},body:JSON.stringify({message:"hello world"})}}catch(r){console.log(r),e={statusCode:500,headers:{"Access-Control-Allow-Origin":"*"},body:JSON.stringify({message:"some error happened"})}}return e};0&&(module.exports={lambdaHandler});
//# sourceMappingURL=app.js.map