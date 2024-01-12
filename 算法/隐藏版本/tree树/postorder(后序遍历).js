const bt = require('./bt(二叉树)');

// 后序遍历 左  右  根
// const postorder = (root) => {
//     // 拦截根节点为空
//     if (!root) { return; }
//     postorder(root.left);//递归访问左子树
//     postorder(root.right);//递归访问右子树
//     console.log(root.val);//打印根节点
// }



// 后序遍历(非递归版) 左  右  根
// 后序遍历 左 右 根反过来，和先序遍历的 根 左 右差不多，可以用先序遍历实现
const postorder = (root) => {
    // 拦截根节点为空
    if (!root) { return; }
    const outputStack = [];//实现倒置的栈
    const stack = [root];
    while (stack.length) {
        const n = stack.pop();
        outputStack.push(n);
        if (n.right) stack.push(n.right);//此处调换了left 和 right的入栈顺序，则结果为根 右 左
        if (n.left) stack.push(n.left);
    }
    while (outputStack.length) {
        const n = outputStack.pop();//倒序输出节点就是 左 右 根
        console.log(n.val);//访问根节点的值
    }
}


postorder(bt);//4 5 2 6 7 3 1