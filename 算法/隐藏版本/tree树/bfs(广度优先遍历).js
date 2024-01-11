const tree = {
    val:'a',
    children:[
        {
            val:'b',
            children:[
                {
                    val:'d',
                    children:[],
                },
                {
                    val:'e',
                    children:[],
                }
            ],
        },
        {
            val:'c',
            children:[
                {
                    val:'f',
                    children:[],
                },
                {
                    val:'g',
                    children:[],
                }
            ],
        }

    ]
};

const bfs = (root)=>{
    const q = [root];//新建队列，并且根节点入队
    while (q.length > 0) {
        const n = q.shift();//队头出队
        console.log(n.val);//访问队头
        n.children.forEach(child => {
            q.push(child);//队头的children挨个入队
        });
    }
}

bfs(tree);//abcdefg