Array.prototype.quickSort = function () {
    const rec = () => {
        if (arr.length === 1) { return arr; }
        const left = [];
        const right = [];
        const mid = arr[0];//找到基准
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < mid) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        // 对 left 和right继续递归的操作
        return [...rec(left), mid, ...rec[right]];
    };
    const res = rec(this);
    res.forEach((n, i) => {//将res的值拷贝到this上
        this[i] = n;
    });
};

const arr = [5, 4, 3, 2, 1];
arr.quickSort();

// 时间复杂度：O(n*logN)