Array.prototype.selectionSort = function () {
    for (let i = 0; i < this.length - 1; i++) {
        let indexMin = i;//定义最小值的下标初始化为0
        for (let j = i; j < this.length; j++) {
            if (this[j] < this[indexMin]) {//如果当前元素小于最小值
                indexMin = j;//则最小值的下标就换成当前元素的下标
            }
        }
        if (indexMin !== i) {//如果最小值和当前值相等则不需要交换位置了
            // 将最小值和数组的第一个元素交换位置
            const temp = this[i];
            this[i] = this[indexMin];
            this[indexMin] = temp;
        }
    }
};

const arr = [5, 4, 3, 2, 1];
arr.selectionSort();

// 时间复杂度：O(n^2)
// 空间复杂度：