// const obj = {};
// const func = ()=>{};
// const arr = [];

// obj.__proto__ === Object.prototype  true;

// 判断A是否是B的实例
// const instanceOf = (A,B)=>{
//     let p = A;//设置一个指针指向A
//     while (p) {
//         if(p === B.prototype){//如果p指针等于B的原型对象
//             return true
//         }
//         p = p.__proto__;//P的指针沿着A往下走
//     }
//     return false
// }
// instanceOf([],Object)

var foo = {},F = function(){};
Object.prototype.a = 'value a';
Function.prototype.b = 'value b';

console.log(foo.a);//'value a'
console.log(foo.b);//undefined

console.log(F.a);//'value a'
console.log(F.b);'value b'