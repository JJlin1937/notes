const bt = require('./bt(二叉树)');

// 先序遍历 根 左 右
// const preorder = (root) =>{
//     // 拦截根节点为空
//     if(!root) {return;}
//     console.log(root.val);//打印根节点
//     preorder(root.left);//递归访问左子树
//     preorder(root.right);//递归访问右子树
// }



// 先序遍历(非递归版) 根 左 右  使用堆栈模拟递归过程
const preorder = (root) => {
    if (!root) { return; }
    const stack = [root];
    while (stack.length) {
        const n = stack.pop();
        console.log(n.val);//访问根节点的值
        if (n.right) stack.push(n.right);
        if (n.left) stack.push(n.left);//因为栈是后进先出，为保证先访问left则先push right
    }

}

preorder(bt);//1 2 4 5 3 6 7