const graph = require('./graph')


const visited = new Set();//设置一个不可重复对象存放访问过的
const dfs = (n)=>{
    console.log(n);//2 0 1 3
    visited.add(n);
    graph[n].forEach(c=>{
        if(!visited.has(c)){
            dfs(c);
        }
    })
}