import { sub, sum } from "./module1";
import { data as d, message } from "./module2";
import school from './module3'
import data from '../json/test.json'
import '../css/demo.css'
import '../css/demo.less'
import '../css/iconfont.css'
import '@babel/polyfill'
/* 
  app.js是webpack的入口，所有的外部文件(js,json,css,less等)都需要在这里引入
*/
// json文件es6默认帮我们暴露出来了

// babel是专门负责es6转es5,你如果写了箭头函数可以帮你转为普通函数
// webpack确实可以帮我们6转5，但是仅仅是帮我们把es6里面的模块化语法翻译成了浏览器认识的(注意这里直接转成了浏览器认识的，也就不需要broswerfy
// )。至于es6的其它语法，解构赋值

sum(1,2)
sub(3,4)
console.log(data);
console.log(message);
console.log(school);

const obj = {a:()=>{console.log('@0826@');}}
const {a} =obj
a()

const p = new Promise((resolve,reject) => {
  setTimeout(() => {
    resolve(100)
  },1000)
})

p.then((res) => {
  console.log("成功",res);
},err=>{
  console.log("失败",err);
})