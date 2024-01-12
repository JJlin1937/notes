const bt = require('./bt(二叉树)');

// 中序遍历 左 根 右
// const inorder = (root) => {
//     // 拦截根节点为空
//     if (!root) { return; }
//     inorder(root.left);//递归访问左子树
//     console.log(root.val);//打印根节点
//     inorder(root.right);//递归访问右子树
// }



// 中序遍历(非递归版) 左 根 右  
const inorder = (root) => {
    // 拦截根节点为空
    if (!root) { return; }
    const stack = [];
    let p = root;
    while (stack.length || p) {
        while (p) {
            stack.push(p);
            p = p.left;
        }
        const n = stack.pop();
        console.log(n.val);
        p = n.right;
    }
}


inorder(bt);//4 2 5 1 6 3 7