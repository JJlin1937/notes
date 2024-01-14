Array.prototype.bubbleSort = function () {
    for (let i = 0; i < this.length - 1; i++) {//执行n-1轮
        for (let j = 0; j < this.length - 1 - i; j++) {//-i 为了每执行一轮区间就变小
            if (this[j] > this[j + 1]) {
                const temp = this[j];
                this[j] = this[j + 1];
                this[j + 1] = temp;
            }
        }
    }
};

const arr = [5, 4, 3, 2, 1];
arr.bubbleSort();

// 时间复杂度：O(n^2)
// 空间复杂度：