const m = new Map();

// 增
m.set('a','aa');//Map(1) {'a' => 'aa'}
m.set('b','bb');//Map(2) {'a' => 'aa', 'b' => 'bb'}

// 删
m.delete('b');//Map(1) {'a' => 'aa'}
m.clear();//删除所有的键值对

// 改
m.set('a','aaa');//Map(1) {'a' => 'aaa'}

// 查
m.get('a');//'aaa'