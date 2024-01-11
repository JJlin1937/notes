let mySet = new Set();//{}

mySet.add(1)
mySet.add(5)
mySet.add(5);//只会添加一个5，因为set的唯一性
mySet.add('TEXT');
let o = { a: 1, b: 2 };
mySet.add(o);
mySet.add({ a: 1, b: 2 })//会添加两个{ a: 1, b: 2 }，因为o和这个的内存地址不一样

const has = mySet.has(1);//true
const hass = mySet.has(11);//false


mySet.delete(5);

// 如何迭代一个set
for (let item of mySet)  console.log(item);
for (let item of mySet.keys())  console.log(item);
for (let item of mySet.values())  console.log(item);


// 将Set转为Array
// const myArr = [...mySet];
const myArr = Array.from(mySet);

// 将Array转为Set
const mySet2 = new Set([1,2,3,4]);


// 求交集
const intersection = new Set([...mySet].filter(x=>mySet2.has(x)));

// 求差集
const difference = new Set([...mySet].filter(x=>!mySet2.has(x)));