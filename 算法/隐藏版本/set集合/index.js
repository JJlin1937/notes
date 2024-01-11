// 去重
const arr = [1,1,2,2];
const arr2 = [...new Set(arr)];//[1,2]


//判断元素是否在集合中
const set = new Set(arr);//{1,2}
const has = set.has(1);//true

// 求set和set2的交集
const set2 = new Set([2,3]);

//筛选出set里面有且set2里面也有的值
const set3 = new Set([...set].filter(item=>set2.has(item)));
