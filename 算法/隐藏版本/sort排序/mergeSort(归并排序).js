Array.prototype.mergeSort = function () {
    // 分
    const rec = (arr) => {
        if (arr.length === 1) return arr;
        const mid = Math.floor(arr.length / 2);//获取数组中间下标
        const left = arr.slice(0, mid);//获取左边数组
        const right = arr.slice(mid);//获取右边数组
        const orderLeft = rec(left);//经过排序后有序的左边数组
        const orderRight = rec(right);//经过排序后有序的右边数组
        const res = [];
        while (orderLeft.length || orderRight.length) {//当左或右的有序数组有值
            if (orderLeft.length && orderRight.length) {
                // 将左右有序数组中较小的队头出队
                res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
            } else if (orderLeft.length) {//如果左边还有值，右边空了
                res.push(orderLeft.shift());
            } else if (orderRight.length) {//如果右边还有值，左边空了
                res.push(orderRight.shift());
            }
        }
        return res;
    }
    const res = rec(this);//把数组传入递归中
    res.forEach((n,i) => {//拷贝res到this上
        this[i] = n;
    });
};

const arr = [5, 4, 3, 2, 1];
arr.mergeSort();

// 时间复杂度：O(n*logN)