Array.prototype.sequentialSearch = function (item) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === item) {//当前元素等于搜索目标值
            return i;
        }
    }
    return -1;
};

const res = [1, 2, 3, 4, 5].sequentialSearch(3);//搜索3的下标