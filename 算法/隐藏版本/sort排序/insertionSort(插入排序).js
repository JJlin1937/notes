Array.prototype.insertionSort = function () {
    for (let i = 1; i < this.length; i++) {
        const temp = this[i];//获取第二个数
        let j = i;
        while (j > 0) {
            if (this[j - 1] > temp) {//如果前面某个数大于第二个数
                this[j] = this[j - 1];//往后移
            } else {
                break;
            }
            j -= 1;
        }
        this[j] = temp;
    }
};

const arr = [5, 4, 3, 2, 1];
arr.insertionSort();

// 时间复杂度：O(n^2)
// 空间复杂度：