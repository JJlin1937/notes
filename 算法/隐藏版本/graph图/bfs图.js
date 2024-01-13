const graph = require('./graph');

const visited = new Set();
visited.add(2);
const q = [2];
while (q.length) {
    const n = q.shift();
    console.log(n);//2 0 3 1
    graph[n].forEach(c => {
        if(!visited.has(c)){
            q.push(c);
            visited.add(n);
        }
    });
}
