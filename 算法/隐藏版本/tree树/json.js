const json = {
    a: { b: { c: 1 } },
    d: [1, 2],
}

// 使用深度优先遍历访问json里面的所有值
const dfs = (n) => {
    console.log(n,path);//访问当前节点
    Object.keys(n).forEach(k => {// Object.keys(n)拿到所有的key
        dfs(n[k], path.concat(k));//n[k] 就是所有的孩子节点
    });
};

dfs(json,[]);