Array.prototype.binarySearch = function (item) {
    let low = 0;//搜索的最小下标
    let high = this.length - 1;//最大下标
    while (low < high) {
        const mid = Math.floor((low + high) / 2);//取中间元素 下标
        const element = this[mid];//取中间元素
        if (element < item) {
            low = mid + 1;
        } else if (element > item) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
};

const res = [1, 2, 3, 4, 5].binarySearch(3);//搜索3的下标