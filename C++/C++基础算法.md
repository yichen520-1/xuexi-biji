# C++ 基础算法

> [!summary] 学习目标
> 本篇面向已经掌握变量、判断、循环、数组、函数和 `vector` 的初学者。学完后，应能理解常见算法的思考过程，根据题目特点选择枚举、排序、二分、前缀和、双指针、递归或基础搜索，并能分析程序大致需要运行多久。

> [!info] 代码约定
> 下文示例使用 C++17，所有完整代码都可以单独复制运行。示例会写出所需头文件，并使用 `using namespace std;`。数组下标默认从 `0` 开始；涉及元素个数时，常用 `n` 表示。

> [!tip] 学习算法的方法
> 不要只背代码。先弄清楚“当前要解决什么问题”“每个变量表示什么”“循环每执行一次完成了什么”，然后再独立写一遍。算法代码通常不长，真正重要的是代码背后的步骤。

## 目录

- [[#1. 算法与复杂度|1. 算法与复杂度]]
  - [[#1.1 什么是算法|1.1 什么是算法]]
  - [[#1.2 时间复杂度|1.2 时间复杂度]]
  - [[#1.3 空间复杂度|1.3 空间复杂度]]
- [[#2. 枚举算法|2. 枚举算法]]
  - [[#2.1 枚举的基本思想|2.1 枚举的基本思想]]
  - [[#2.2 案例：寻找两数之和|2.2 案例：寻找两数之和]]
- [[#3. 基础排序|3. 基础排序]]
  - [[#3.1 冒泡排序|3.1 冒泡排序]]
  - [[#3.2 选择排序|3.2 选择排序]]
  - [[#3.3 插入排序|3.3 插入排序]]
  - [[#3.4 std::sort|3.4 std::sort]]
  - [[#3.5 三种手写排序对比|3.5 三种手写排序对比]]
- [[#4. 二分查找|4. 二分查找]]
  - [[#4.1 二分查找的基本思想|4.1 二分查找的基本思想]]
  - [[#4.2 案例：查找目标值|4.2 案例：查找目标值]]
  - [[#4.3 lower_bound 与 upper_bound|4.3 lower_bound 与 upper_bound]]
- [[#5. 前缀和|5. 前缀和]]
  - [[#5.1 前缀和的基本思想|5.1 前缀和的基本思想]]
  - [[#5.2 案例：多次查询区间和|5.2 案例：多次查询区间和]]
- [[#6. 双指针|6. 双指针]]
  - [[#6.1 双指针的基本思想|6.1 双指针的基本思想]]
  - [[#6.2 案例：有序数组中寻找两数之和|6.2 案例：有序数组中寻找两数之和]]
  - [[#6.3 案例：原地删除重复元素|6.3 案例：原地删除重复元素]]
- [[#7. 递归|7. 递归]]
  - [[#7.1 递归的基本思想|7.1 递归的基本思想]]
  - [[#7.2 案例：计算阶乘|7.2 案例：计算阶乘]]
  - [[#7.3 递归调用过程|7.3 递归调用过程]]
- [[#8. 基础搜索|8. 基础搜索]]
  - [[#8.1 深度优先搜索 DFS|8.1 深度优先搜索 DFS]]
  - [[#8.2 广度优先搜索 BFS|8.2 广度优先搜索 BFS]]
  - [[#8.3 DFS 与 BFS 的区别|8.3 DFS 与 BFS 的区别]]
- [[#9. 算法选择与总结|9. 算法选择与总结]]

---

## 1. 算法与复杂度

### 1.1 什么是算法

算法就是解决问题的一组明确步骤。

例如，要找出数组 `{5, 2, 9, 1, 7}` 中的最大值，可以按照下面的步骤操作：

1. 先把第一个元素 `5` 当作当前最大值。
2. 依次查看后面的每个元素。
3. 如果遇到更大的数，就更新当前最大值。
4. 全部查看完后，当前最大值就是答案。

对应的代码如下：

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {5, 2, 9, 1, 7};
    int maxValue = numbers[0];

    for (int number : numbers) {
        if (number > maxValue) {
            maxValue = number;
        }
    }

    cout << "最大值：" << maxValue << endl;
    return 0;
}
```

输出结果：

```text
最大值：9
```

**代码讲解：**

- `maxValue` 用来记录目前见过的最大值。
- `for (int number : numbers)` 会依次取出数组中的每个元素。
- 当 `number > maxValue` 时，说明找到了更大的数，因此更新 `maxValue`。
- 循环结束后，每个元素都比较过一次，所以答案一定保存在 `maxValue` 中。

算法不只是“能够得到答案”就够了。面对相同的问题，不同算法所需的时间和内存可能相差很大，因此还要学会判断算法的效率。

### 1.2 时间复杂度

时间复杂度描述的是：当数据量不断增大时，算法的操作次数大约怎样增长。它通常使用大写字母 `O` 表示。

| 时间复杂度 | 通俗理解 | 常见例子 |
| --- | --- | --- |
| `O(1)` | 无论数据多少，只执行固定次数 | 读取数组中的一个元素 |
| `O(log n)` | 每一步都把范围缩小一半 | 二分查找 |
| `O(n)` | 数据增加多少，操作次数大致增加多少 | 遍历数组 |
| `O(n log n)` | 比普通遍历多一些，但远小于平方级 | `std::sort` |
| `O(n²)` | 通常有两层与 `n` 有关的循环 | 冒泡排序、枚举两个元素 |
| `O(2^n)` | 数据每增加一点，操作数迅速翻倍 | 某些递归枚举问题 |

#### O(1)：固定次数

```cpp
cout << numbers[0] << endl;
```

无论数组有 5 个元素还是 100 万个元素，读取第一个元素都只需要一次操作。

#### O(n)：一层遍历

```cpp
for (int number : numbers) {
    cout << number << ' ';
}
```

数组有 `n` 个元素，循环就执行 `n` 次，所以是 `O(n)`。

#### O(n²)：双层遍历

```cpp
for (int i = 0; i < n; ++i) {
    for (int j = 0; j < n; ++j) {
        cout << i << ' ' << j << endl;
    }
}
```

外层执行 `n` 次，每次外层循环都会让内层再执行 `n` 次，总次数约为 `n × n`，所以是 `O(n²)`。

> [!note] 为什么忽略常数
> 如果一个循环执行 `2n + 3` 次，当 `n` 很大时，真正决定增长速度的是 `n`，因此时间复杂度写成 `O(n)`，不写成 `O(2n + 3)`。

> [!warning] 复杂度不是准确运行时间
> 时间复杂度用于比较数据变大后的增长趋势。实际运行速度还会受到电脑性能、编译器、数据特点和代码写法影响。

### 1.3 空间复杂度

空间复杂度描述算法额外使用的内存会怎样随数据量增长。

下面的代码只使用了几个普通变量：

```cpp
int sum = 0;
for (int number : numbers) {
    sum += number;
}
```

无论 `numbers` 有多长，额外变量仍然只有 `sum` 和 `number`，额外空间复杂度是 `O(1)`。

如果另外创建一个长度为 `n` 的数组：

```cpp
vector<int> copy = numbers;
```

新数组会随着原数组一起变大，因此额外空间复杂度是 `O(n)`。

> [!tip] 初学时怎样分析
> 先数与数据量有关的循环层数，再观察是否创建了与数据量同样大小的新数组。这样虽然不能覆盖所有复杂情况，但足以分析本篇的大多数算法。

---

## 2. 枚举算法

### 2.1 枚举的基本思想

枚举也叫穷举，意思是把所有可能的情况依次尝试一遍，从中找出符合条件的答案。

它的优点是思路直接、不容易漏掉答案；缺点是可能尝试很多无用情况。数据量较小时，枚举往往是最容易想到、也最可靠的方法。

枚举问题通常包含三个部分：

1. **枚举对象**：需要尝试哪些可能？
2. **判断条件**：怎样才算满足题目要求？
3. **记录答案**：找到后立即结束，还是继续寻找更优答案？

例如，要在 1～100 中寻找所有能被 3 和 5 同时整除的数：

```cpp
for (int number = 1; number <= 100; ++number) {
    if (number % 3 == 0 && number % 5 == 0) {
        cout << number << ' ';
    }
}
```

这里枚举的是 1～100 的每个整数，判断条件是“除以 3 和除以 5 的余数都为 0”。

### 2.2 案例：寻找两数之和

**题目：** 给定数组 `{2, 7, 11, 15}` 和目标值 `9`，找出两个不同位置的元素，使它们的和等于 `9`。

**核心思想：** 枚举所有不同的元素组合。用 `i` 指向第一个数，用 `j` 指向第二个数，并检查 `numbers[i] + numbers[j]`。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {2, 7, 11, 15};
    int target = 9;
    bool found = false;

    for (int i = 0; i < static_cast<int>(numbers.size()); ++i) {
        for (int j = i + 1; j < static_cast<int>(numbers.size()); ++j) {
            if (numbers[i] + numbers[j] == target) {
                cout << "找到下标：" << i << " 和 " << j << endl;
                cout << numbers[i] << " + " << numbers[j]
                     << " = " << target << endl;
                found = true;
                break;
            }
        }

        if (found) {
            break;
        }
    }

    if (!found) {
        cout << "没有找到符合条件的两个数" << endl;
    }

    return 0;
}
```

输出结果：

```text
找到下标：0 和 1
2 + 7 = 9
```

**枚举过程：**

| `i` | `j` | 检查的两个数 | 和 | 是否符合 |
| --- | --- | --- | --- | --- |
| 0 | 1 | 2 和 7 | 9 | 符合，找到答案 |

如果目标值改为 `26`，程序会依次尝试 `2+7`、`2+11`、`2+15`、`7+11`、`7+15`，最后在下标 2 和 3 处找到 `11+15`。

**代码讲解：**

- `j` 从 `i + 1` 开始，保证两个下标不同，也避免重复检查 `2+7` 和 `7+2`。
- `found` 记录是否已经找到答案。
- 内层的 `break` 只能结束内层循环，所以外层循环后还要再次判断 `found`。
- 最坏情况下需要检查大约 `n(n-1)/2` 个组合，时间复杂度是 `O(n²)`。
- 程序只使用了少量额外变量，空间复杂度是 `O(1)`。

> [!warning] 常见错误
> 如果让 `j` 从 `0` 开始，不仅会重复检查，还可能让同一个元素与自己相加。枚举组合时，应先想清楚下标能否相同、顺序是否重要。

---

## 3. 基础排序

排序是按照一定规则重新排列数据，例如从小到大、从大到小，或者按照姓名、成绩等字段排列。

排序后的数据更容易查找、去重和统计。本章先手写三种基础排序来理解原理，再学习实际开发和刷题中更常用的 `std::sort`。

### 3.1 冒泡排序

冒泡排序会反复比较相邻元素。如果左边比右边大，就交换它们。每完成一轮，当前未排序部分中最大的元素都会移动到最右边，就像气泡逐渐“冒”到末尾。

以 `{5, 3, 4, 1}` 为例，第一轮过程如下：

```text
5 3 4 1  -> 比较 5 和 3，交换 -> 3 5 4 1
3 5 4 1  -> 比较 5 和 4，交换 -> 3 4 5 1
3 4 5 1  -> 比较 5 和 1，交换 -> 3 4 1 5
```

第一轮结束后，最大值 `5` 已经到达最后一个位置，下一轮不需要再比较它。

```cpp
#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& numbers) {
    for (int number : numbers) {
        cout << number << ' ';
    }
    cout << endl;
}

int main() {
    vector<int> numbers = {5, 3, 4, 1};
    int n = static_cast<int>(numbers.size());

    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;

        for (int j = 0; j < n - 1 - i; ++j) {
            if (numbers[j] > numbers[j + 1]) {
                swap(numbers[j], numbers[j + 1]);
                swapped = true;
            }
        }

        cout << "第 " << i + 1 << " 轮：";
        printVector(numbers);

        if (!swapped) {
            break;
        }
    }

    cout << "排序结果：";
    printVector(numbers);
    return 0;
}
```

输出结果：

```text
第 1 轮：3 4 1 5
第 2 轮：3 1 4 5
第 3 轮：1 3 4 5
排序结果：1 3 4 5
```

**代码讲解：**

- 外层循环 `i` 控制排序轮数，最多进行 `n - 1` 轮。
- 内层循环 `j` 比较相邻的 `numbers[j]` 和 `numbers[j + 1]`。
- `n - 1 - i` 表示已经排好的末尾元素不用再次参与比较。
- `swapped` 记录本轮是否发生过交换。如果一轮中一次交换都没有，说明数组已经有序，可以提前结束。
- 平均和最坏时间复杂度是 `O(n²)`，加入提前结束后，已经有序时最好可以达到 `O(n)`。
- 只在原数组上交换，额外空间复杂度是 `O(1)`。

> [!warning] 常见错误
> 内层循环必须保证 `j + 1` 不越界，所以条件不能写成 `j < n - i`。正确上限是 `j < n - 1 - i`。

### 3.2 选择排序

选择排序会把数组分成“已排序部分”和“未排序部分”。每一轮从未排序部分中找到最小值，再把它放到这一轮应该出现的位置。

以 `{5, 3, 4, 1}` 为例：

```text
开始：5 3 4 1
第 1 轮找到最小值 1，与位置 0 交换：1 3 4 5
第 2 轮从 3 4 5 中找到最小值 3：1 3 4 5
第 3 轮从 4 5 中找到最小值 4：1 3 4 5
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& numbers) {
    for (int number : numbers) {
        cout << number << ' ';
    }
    cout << endl;
}

int main() {
    vector<int> numbers = {5, 3, 4, 1};
    int n = static_cast<int>(numbers.size());

    for (int i = 0; i < n - 1; ++i) {
        int minIndex = i;

        for (int j = i + 1; j < n; ++j) {
            if (numbers[j] < numbers[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex != i) {
            swap(numbers[i], numbers[minIndex]);
        }

        cout << "第 " << i + 1 << " 轮：";
        printVector(numbers);
    }

    cout << "排序结果：";
    printVector(numbers);
    return 0;
}
```

**代码讲解：**

- `i` 表示本轮要确定的位置。`i` 左侧的元素已经排好。
- `minIndex` 保存未排序部分中最小元素的下标，初始值设为 `i`。
- 内层循环从 `i + 1` 开始，寻找更小的元素。
- 一轮寻找结束后，只进行一次交换，把最小值放到 `i` 的位置。
- 无论原数组是否有序，都要进行大量比较，因此最好、平均和最坏时间复杂度都是 `O(n²)`。
- 额外空间复杂度是 `O(1)`。

**冒泡和选择的区别：** 冒泡排序一轮中可能交换很多次；选择排序先找到最小值，一轮通常只交换一次。

### 3.3 插入排序

插入排序很像整理手中的扑克牌：把前面的牌看成已经排好，每次拿出一张新牌，从右向左寻找合适位置并插进去。

以 `{5, 3, 4, 1}` 为例：

```text
开始：5 | 3 4 1
插入 3：3 5 | 4 1
插入 4：3 4 5 | 1
插入 1：1 3 4 5
```

竖线左边表示已经有序的部分。

```cpp
#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& numbers) {
    for (int number : numbers) {
        cout << number << ' ';
    }
    cout << endl;
}

int main() {
    vector<int> numbers = {5, 3, 4, 1};
    int n = static_cast<int>(numbers.size());

    for (int i = 1; i < n; ++i) {
        int current = numbers[i];
        int j = i - 1;

        while (j >= 0 && numbers[j] > current) {
            numbers[j + 1] = numbers[j];
            --j;
        }

        numbers[j + 1] = current;

        cout << "插入 " << current << " 后：";
        printVector(numbers);
    }

    cout << "排序结果：";
    printVector(numbers);
    return 0;
}
```

**代码讲解：**

- 第一个元素单独看时已经有序，所以 `i` 从 `1` 开始。
- `current` 暂存本轮准备插入的元素，否则移动元素时会覆盖它。
- `j` 从已排序部分的末尾开始向左检查。
- 只要 `numbers[j] > current`，就把较大的元素向右移动一格。
- 循环结束时，`j + 1` 就是 `current` 应该插入的位置。
- 平均和最坏时间复杂度是 `O(n²)`；数组接近有序时移动次数较少，最好时间复杂度是 `O(n)`。
- 额外空间复杂度是 `O(1)`。

> [!warning] 判断条件的顺序
> `while (j >= 0 && numbers[j] > current)` 必须先判断 `j >= 0`。`&&` 具有短路特性，当 `j < 0` 时不会继续访问 `numbers[j]`，从而避免下标越界。

### 3.4 std::sort

实际开发和大多数算法题中，如果题目只是要求排序，通常直接使用标准库中的 `std::sort`。它速度快、经过充分测试，也能自定义排序规则。

使用 `sort` 需要包含头文件：

```cpp
#include <algorithm>
```

完整示例：

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <vector>
using namespace std;

void printVector(const vector<int>& numbers) {
    for (int number : numbers) {
        cout << number << ' ';
    }
    cout << endl;
}

int main() {
    vector<int> numbers = {5, 3, 4, 1};

    sort(numbers.begin(), numbers.end());
    cout << "从小到大：";
    printVector(numbers);

    sort(numbers.begin(), numbers.end(), greater<int>());
    cout << "从大到小：";
    printVector(numbers);

    return 0;
}
```

输出结果：

```text
从小到大：1 3 4 5
从大到小：5 4 3 1
```

**代码讲解：**

- `numbers.begin()` 指向第一个元素。
- `numbers.end()` 指向最后一个元素后面的位置，不是最后一个元素本身。
- `sort(numbers.begin(), numbers.end())` 默认从小到大排序。
- 第三个参数 `greater<int>()` 表示从大到小排序，需要包含 `<functional>`。
- `std::sort` 的平均时间复杂度是 `O(n log n)`，数据较多时通常明显快于 `O(n²)` 的基础排序。

还可以使用 Lambda 表达式自定义规则。例如按照绝对值从小到大排序：

```cpp
sort(numbers.begin(), numbers.end(), [](int a, int b) {
    return abs(a) < abs(b);
});
```

比较函数的含义是：“当 `a` 应该排在 `b` 前面时返回 `true`”。

> [!warning] 比较函数不能写成小于等于
> 从小到大时应写 `a < b`，不能写 `a <= b`。否则相等元素之间会产生矛盾的比较结果，排序行为可能出错。

### 3.5 三种手写排序对比

| 算法 | 核心动作 | 平均时间复杂度 | 最好情况 | 额外空间 | 适合学习什么 |
| --- | --- | --- | --- | --- | --- |
| 冒泡排序 | 相邻元素比较交换 | `O(n²)` | `O(n)` | `O(1)` | 双层循环、交换 |
| 选择排序 | 每轮选择最小值 | `O(n²)` | `O(n²)` | `O(1)` | 下标记录、区间划分 |
| 插入排序 | 把新元素插入有序部分 | `O(n²)` | `O(n)` | `O(1)` | 元素移动、有序区间 |
| `std::sort` | 标准库高效排序 | `O(n log n)` | 与实现有关 | 与实现有关 | 实际排序与自定义规则 |

> [!tip] 怎样选择
> 手写排序主要用来理解算法过程。实际做题时，除非题目明确要求实现某种排序，一般优先使用 `std::sort`。

---

## 4. 二分查找

### 4.1 二分查找的基本思想

二分查找用于在**有序数据**中快速寻找目标。它每次检查中间元素，并排除一半不可能的范围。

在 `{1, 3, 5, 7, 9, 11, 13}` 中寻找 `9`：

```text
范围 [1, 3, 5, 7, 9, 11, 13]，中间值是 7
9 > 7，目标只可能在右半部分

范围 [9, 11, 13]，中间值是 11
9 < 11，目标只可能在左半部分

范围 [9]，找到目标
```

原来最多要检查 7 个元素，二分只检查了 3 次。数据量越大，这种差距越明显。

> [!important] 使用前提
> 普通二分查找要求数据已经按照与判断逻辑一致的顺序排列。没有排序就直接二分，可能排除真正包含答案的区间。

### 4.2 案例：查找目标值

```cpp
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(const vector<int>& numbers, int target) {
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;

    while (left <= right) {
        int middle = left + (right - left) / 2;

        if (numbers[middle] == target) {
            return middle;
        }

        if (numbers[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

int main() {
    vector<int> numbers = {1, 3, 5, 7, 9, 11, 13};
    int target = 9;
    int index = binarySearch(numbers, target);

    if (index != -1) {
        cout << "目标值的下标是：" << index << endl;
    } else {
        cout << "没有找到目标值" << endl;
    }

    return 0;
}
```

输出结果：

```text
目标值的下标是：4
```

**三个关键变量：**

- `left`：当前查找范围的最左下标。
- `right`：当前查找范围的最右下标。
- `middle`：当前查找范围的中间下标。

**区间变化规则：**

- 如果中间值等于目标，直接返回下标。
- 如果中间值小于目标，说明中间及其左边都不可能是答案，令 `left = middle + 1`。
- 如果中间值大于目标，说明中间及其右边都不可能是答案，令 `right = middle - 1`。
- 当 `left > right` 时，查找范围为空，说明目标不存在。

`middle` 写成：

```cpp
int middle = left + (right - left) / 2;
```

它与 `(left + right) / 2` 的结果相同，但能避免 `left + right` 在数值特别大时溢出。

每次查找都把范围缩小一半，时间复杂度是 `O(log n)`，额外空间复杂度是 `O(1)`。

> [!warning] 常见错误
> 本例使用闭区间 `[left, right]`，所以循环条件是 `left <= right`，更新时要使用 `middle + 1` 和 `middle - 1`。如果只写 `left = middle`，某些情况下范围不会继续缩小，程序会陷入死循环。

### 4.3 lower_bound 与 upper_bound

C++ 标准库提供了用于有序区间的二分函数：

- `lower_bound`：找到第一个**大于或等于**目标值的位置。
- `upper_bound`：找到第一个**大于**目标值的位置。

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 2, 2, 4, 6};
    int target = 2;

    auto first = lower_bound(numbers.begin(), numbers.end(), target);
    auto afterLast = upper_bound(numbers.begin(), numbers.end(), target);

    cout << "第一个 2 的下标：" << first - numbers.begin() << endl;
    cout << "2 出现的次数：" << afterLast - first << endl;
    return 0;
}
```

输出结果：

```text
第一个 2 的下标：1
2 出现的次数：3
```

迭代器相减可以得到两个位置之间的元素数量，因此 `afterLast - first` 就是目标值出现的次数。

---

## 5. 前缀和

### 5.1 前缀和的基本思想

如果只查询一次数组区间和，直接循环相加就可以。但当题目要进行很多次区间查询时，每次重新相加会浪费时间。

前缀和会提前记录“从开头到当前位置的总和”，之后只需做一次减法就能求出任意连续区间的和。

对于数组：

```text
原数组 numbers：  2  4  1  3  5
下标：             0  1  2  3  4
```

为了让公式更简单，前缀和数组通常比原数组多一个元素：

```text
prefix[0] = 0
prefix[1] = 2
prefix[2] = 2 + 4 = 6
prefix[3] = 2 + 4 + 1 = 7
prefix[4] = 2 + 4 + 1 + 3 = 10
prefix[5] = 2 + 4 + 1 + 3 + 5 = 15
```

所以 `prefix` 是 `{0, 2, 6, 7, 10, 15}`。

要求原数组下标 `[1, 3]` 的和，也就是 `4 + 1 + 3`：

```text
prefix[4] - prefix[1] = 10 - 2 = 8
```

通用公式为：

```text
区间 [left, right] 的和 = prefix[right + 1] - prefix[left]
```

### 5.2 案例：多次查询区间和

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {2, 4, 1, 3, 5};
    int n = static_cast<int>(numbers.size());
    vector<int> prefix(n + 1, 0);

    for (int i = 0; i < n; ++i) {
        prefix[i + 1] = prefix[i] + numbers[i];
    }

    vector<pair<int, int>> queries = {
        {1, 3},
        {0, 4},
        {2, 2}
    };

    for (const auto& query : queries) {
        int left = query.first;
        int right = query.second;
        int rangeSum = prefix[right + 1] - prefix[left];

        cout << "区间 [" << left << ", " << right
             << "] 的和：" << rangeSum << endl;
    }

    return 0;
}
```

输出结果：

```text
区间 [1, 3] 的和：8
区间 [0, 4] 的和：15
区间 [2, 2] 的和：1
```

**代码讲解：**

- `prefix` 的长度是 `n + 1`，其中 `prefix[0] = 0` 表示前 0 个元素的和。
- `prefix[i + 1] = prefix[i] + numbers[i]` 表示在前 `i` 个元素之和的基础上，再加当前元素。
- `prefix[right + 1]` 包含下标 `0` 到 `right` 的元素。
- 减去 `prefix[left]` 后，正好去掉下标 `0` 到 `left - 1` 的元素，只留下 `[left, right]`。

建立前缀和数组需要 `O(n)` 时间和 `O(n)` 额外空间。建立完成后，每次区间查询只做一次减法，因此是 `O(1)`。

如果有 `q` 次查询：

- 每次重新循环相加，最坏约为 `O(nq)`。
- 使用前缀和，总时间约为 `O(n + q)`。

> [!warning] 数据范围与溢出
> 如果数组元素很大或元素很多，前缀和可能超过 `int` 的范围。此时应把 `vector<int>` 和 `rangeSum` 改为 `vector<long long>` 与 `long long`。

---

## 6. 双指针

### 6.1 双指针的基本思想

双指针不是 C++ 的指针类型，而是一种算法思路：使用两个下标或迭代器从不同位置移动，共同完成一次扫描。

常见形式有：

| 形式 | 移动方式 | 常见用途 |
| --- | --- | --- |
| 左右指针 | 一个从左向右，一个从右向左 | 有序数组两数之和、反转数组 |
| 快慢指针 | 两个指针同向，但速度或职责不同 | 删除重复元素、移动元素 |
| 同向滑动 | 右指针扩大范围，左指针缩小范围 | 连续区间问题 |

双指针常把原本需要双层循环的 `O(n²)` 问题优化为一次扫描的 `O(n)`，但能否使用取决于数据是否具有顺序或单调性。

### 6.2 案例：有序数组中寻找两数之和

**题目：** 在有序数组 `{1, 2, 4, 6, 10}` 中寻找两个数，使它们的和等于 `8`。

**核心思想：** 左指针从最小值开始，右指针从最大值开始。

- 当前和小于目标，说明需要更大的数，左指针右移。
- 当前和大于目标，说明需要更小的数，右指针左移。
- 当前和等于目标，找到答案。

```text
1 + 10 = 11，太大，右指针左移
1 + 6  = 7， 太小，左指针右移
2 + 6  = 8， 找到答案
```

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 4, 6, 10};
    int target = 8;
    int left = 0;
    int right = static_cast<int>(numbers.size()) - 1;
    bool found = false;

    while (left < right) {
        int sum = numbers[left] + numbers[right];

        if (sum == target) {
            cout << "找到：" << numbers[left] << " + "
                 << numbers[right] << " = " << target << endl;
            found = true;
            break;
        }

        if (sum < target) {
            ++left;
        } else {
            --right;
        }
    }

    if (!found) {
        cout << "没有找到符合条件的两个数" << endl;
    }

    return 0;
}
```

输出结果：

```text
找到：2 + 6 = 8
```

**为什么不会漏掉答案：**

当最小值与当前最大值之和仍然太大时，保留最大值并换成其他更大的左侧元素只会让和更大，所以当前最大值不可能组成答案，可以放心让右指针左移。和太小时的道理相反。

两个指针最多各走过数组一次，时间复杂度是 `O(n)`，额外空间复杂度是 `O(1)`。

> [!important] 使用条件
> 上面的移动规则依赖数组已经从小到大排序。如果数组无序，可以先排序再使用双指针，但排序会使总时间复杂度变为 `O(n log n)`。

### 6.3 案例：原地删除重复元素

**题目：** 给定有序数组 `{1, 1, 2, 2, 2, 3, 4, 4}`，让每个不同的数字只保留一次，并返回新长度。

这里使用快慢指针：

- `fast` 负责查看每个元素。
- `slow` 指向已经整理好的不重复部分的最后一个位置。
- 当 `numbers[fast] != numbers[slow]` 时，说明发现了新数字，将它写到 `slow + 1`。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int removeDuplicates(vector<int>& numbers) {
    if (numbers.empty()) {
        return 0;
    }

    int slow = 0;

    for (int fast = 1; fast < static_cast<int>(numbers.size()); ++fast) {
        if (numbers[fast] != numbers[slow]) {
            ++slow;
            numbers[slow] = numbers[fast];
        }
    }

    return slow + 1;
}

int main() {
    vector<int> numbers = {1, 1, 2, 2, 2, 3, 4, 4};
    int newLength = removeDuplicates(numbers);

    cout << "新长度：" << newLength << endl;
    cout << "去重结果：";

    for (int i = 0; i < newLength; ++i) {
        cout << numbers[i] << ' ';
    }
    cout << endl;

    return 0;
}
```

输出结果：

```text
新长度：4
去重结果：1 2 3 4
```

**过程说明：**

```text
开始：slow 指向第一个 1
fast 遇到第二个 1：与 slow 相同，跳过
fast 遇到 2：发现新数字，slow 右移并写入 2
fast 遇到后面的 2：与 slow 相同，跳过
fast 遇到 3：slow 右移并写入 3
fast 遇到 4：slow 右移并写入 4
```

函数没有真正缩短 `vector`，而是把前 `newLength` 个位置整理成正确答案。题目只要求原地处理时，这样可以避免创建新数组。

时间复杂度是 `O(n)`，额外空间复杂度是 `O(1)`。

---

## 7. 递归

### 7.1 递归的基本思想

递归是函数直接或间接调用自己。它适合把一个大问题拆成结构相同、规模更小的问题。

一个正确的递归通常必须包含两个部分：

1. **终止条件**：问题小到可以直接得到答案时停止调用。
2. **递归关系**：把当前问题变成规模更小的同类问题。

例如，`5!` 表示：

```text
5! = 5 × 4 × 3 × 2 × 1
```

它也可以写成：

```text
5! = 5 × 4!
4! = 4 × 3!
3! = 3 × 2!
2! = 2 × 1!
1! = 1
```

每一步都把 `n!` 变成更小的 `(n - 1)!`，直到 `n == 1`。

### 7.2 案例：计算阶乘

```cpp
#include <iostream>
using namespace std;

long long factorial(int n) {
    if (n <= 1) {
        return 1;
    }

    return n * factorial(n - 1);
}

int main() {
    int number = 5;
    cout << number << "! = " << factorial(number) << endl;
    return 0;
}
```

输出结果：

```text
5! = 120
```

**代码讲解：**

- `if (n <= 1)` 是终止条件。没有它，函数会一直调用自己。
- `factorial(n - 1)` 计算规模更小的阶乘。
- `return n * factorial(n - 1)` 表示当前答案等于 `n` 乘以前一个阶乘。
- 使用 `long long` 可以表示比 `int` 更大的整数，但阶乘增长极快，数值过大时仍会溢出。

时间复杂度是 `O(n)`，因为从 `n` 一直计算到 `1`。递归调用会在调用栈中保存每一层的状态，所以额外空间复杂度也是 `O(n)`。

### 7.3 递归调用过程

调用 `factorial(5)` 时，程序先不断向下调用：

```text
factorial(5)
  等待 5 × factorial(4)
    等待 4 × factorial(3)
      等待 3 × factorial(2)
        等待 2 × factorial(1)
          factorial(1) 返回 1
```

到达终止条件后，再逐层返回：

```text
factorial(1) = 1
factorial(2) = 2 × 1  = 2
factorial(3) = 3 × 2  = 6
factorial(4) = 4 × 6  = 24
factorial(5) = 5 × 24 = 120
```

可以把它想成叠放盘子：每次调用放上一个盘子，触发终止条件后再从最上面逐个取下。

> [!warning] 递归的常见问题
> 缺少终止条件、问题规模没有变小，都会导致无限递归。递归层数过深还可能耗尽调用栈，产生栈溢出。能用简单循环清楚解决的问题，不一定非要使用递归。

---

## 8. 基础搜索

搜索算法用于从许多可能状态中寻找目标或遍历全部状态。本章用二维地图介绍两种最基础的搜索方式：深度优先搜索 DFS 和广度优先搜索 BFS。

地图中约定：

- `0` 表示可以经过的位置。
- `1` 表示障碍物。
- 每次只能向上、下、左、右移动一格。

### 8.1 深度优先搜索 DFS

DFS 是 Depth-First Search 的缩写，中文叫深度优先搜索。它会沿着一条路线尽量向深处走，走不下去时再退回来尝试其他路线。

可以把 DFS 理解为走迷宫：来到一个路口时先选择一条路一直走；如果遇到死路，就退回最近的路口再换一条路。

**题目：** 统计地图中从起点 `(0, 0)` 出发能够到达多少个位置。

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int ROWS = 4;
const int COLS = 5;

vector<vector<int>> grid = {
    {0, 0, 1, 0, 0},
    {1, 0, 1, 0, 1},
    {0, 0, 0, 0, 1},
    {0, 1, 1, 0, 0}
};

vector<vector<bool>> visited(ROWS, vector<bool>(COLS, false));

int directionRow[4] = {-1, 1, 0, 0};
int directionCol[4] = {0, 0, -1, 1};

int dfs(int row, int col) {
    visited[row][col] = true;
    int reachableCount = 1;

    for (int direction = 0; direction < 4; ++direction) {
        int nextRow = row + directionRow[direction];
        int nextCol = col + directionCol[direction];

        bool inside = nextRow >= 0 && nextRow < ROWS
                   && nextCol >= 0 && nextCol < COLS;

        if (inside && grid[nextRow][nextCol] == 0
                   && !visited[nextRow][nextCol]) {
            reachableCount += dfs(nextRow, nextCol);
        }
    }

    return reachableCount;
}

int main() {
    int count = dfs(0, 0);
    cout << "能够到达的位置数量：" << count << endl;
    return 0;
}
```

输出结果：

```text
能够到达的位置数量：13
```

**代码讲解：**

- `visited` 记录某个位置是否访问过，防止在两个相邻位置之间来回递归。
- `directionRow` 和 `directionCol` 组合出上、下、左、右四个方向。
- `inside` 判断新位置是否仍在地图范围内，必须先判断范围，再访问数组。
- 新位置在地图内、不是障碍物、并且没有访问过时，才继续递归。
- `reachableCount` 初始为 `1`，表示当前格子本身可以到达，再加上相邻区域的数量。

如果地图有 `R` 行、`C` 列，每个位置最多访问一次，时间复杂度是 `O(R × C)`；`visited` 和递归调用栈需要额外空间。

> [!warning] 忘记标记访问
> 如果不写 `visited[row][col] = true`，相邻位置会不断互相调用，造成无限递归。通常应在确认进入一个状态后立即标记，避免它被重复加入搜索过程。

### 8.2 广度优先搜索 BFS

BFS 是 Breadth-First Search 的缩写，中文叫广度优先搜索。它会先访问距离起点一步的位置，再访问距离两步的位置，然后是三步、四步……

BFS 通常借助队列实现：

1. 把起点放入队列。
2. 取出队首位置。
3. 把它所有尚未访问的相邻位置放到队尾。
4. 重复操作，直到队列为空。

因为 BFS 按照距离从近到远访问，所以在每次移动代价相同的地图中，第一次到达终点时得到的就是最少步数。

**题目：** 在地图中计算从左上角 `(0, 0)` 到右下角 `(3, 4)` 的最少步数。

```cpp
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
    vector<vector<int>> grid = {
        {0, 0, 1, 0, 0},
        {1, 0, 1, 0, 1},
        {0, 0, 0, 0, 1},
        {0, 1, 1, 0, 0}
    };

    int rows = static_cast<int>(grid.size());
    int cols = static_cast<int>(grid[0].size());

    vector<vector<int>> distance(rows, vector<int>(cols, -1));
    queue<pair<int, int>> positions;

    int directionRow[4] = {-1, 1, 0, 0};
    int directionCol[4] = {0, 0, -1, 1};

    positions.push({0, 0});
    distance[0][0] = 0;

    while (!positions.empty()) {
        int row = positions.front().first;
        int col = positions.front().second;
        positions.pop();

        for (int direction = 0; direction < 4; ++direction) {
            int nextRow = row + directionRow[direction];
            int nextCol = col + directionCol[direction];

            bool inside = nextRow >= 0 && nextRow < rows
                       && nextCol >= 0 && nextCol < cols;

            if (inside && grid[nextRow][nextCol] == 0
                       && distance[nextRow][nextCol] == -1) {
                distance[nextRow][nextCol] = distance[row][col] + 1;
                positions.push({nextRow, nextCol});
            }
        }
    }

    int targetRow = rows - 1;
    int targetCol = cols - 1;

    if (distance[targetRow][targetCol] == -1) {
        cout << "无法到达终点" << endl;
    } else {
        cout << "最少步数：" << distance[targetRow][targetCol] << endl;
    }

    return 0;
}
```

输出结果：

```text
最少步数：7
```

**代码讲解：**

- `queue<pair<int, int>>` 保存等待处理的位置，每个位置由行、列两个数字组成。
- `distance` 同时记录距离和访问状态。初始值 `-1` 表示尚未访问。
- 起点到自己的距离是 `0`，所以设置 `distance[0][0] = 0`。
- `positions.front()` 读取队首，`positions.pop()` 将它移出队列。
- 相邻位置的距离等于当前位置的距离加 `1`。
- 在相邻位置第一次进入队列时立即记录距离，避免同一个位置被重复加入。

每个位置最多进入队列一次，所以时间复杂度是 `O(R × C)`，队列和 `distance` 数组的额外空间复杂度也是 `O(R × C)`。

> [!note] 为什么第一次到达就是最短距离
> 队列保证先加入的位置先处理。距离为 1 的位置会在距离为 2 的位置之前处理，因此 BFS 是一层一层向外扩展的，不可能先用更多步数到达某个位置。

### 8.3 DFS 与 BFS 的区别

| 对比项 | DFS | BFS |
| --- | --- | --- |
| 中文名称 | 深度优先搜索 | 广度优先搜索 |
| 主要思路 | 一条路尽量走到底，再回退 | 按距离一层一层向外扩展 |
| 常用实现 | 递归或栈 | 队列 |
| 常见用途 | 遍历全部状态、连通区域、回溯 | 等权情况下的最短步数、层序遍历 |
| 主要风险 | 递归过深导致栈溢出 | 队列可能占用较多内存 |

如果只需要判断“能不能到达”或遍历所有位置，DFS 和 BFS 都可以。如果题目明确要求每一步代价相同情况下的最少步数，通常优先想到 BFS。

---

## 9. 算法选择与总结

### 常见题目特征与算法

| 看到的题目特征 | 可以优先考虑 | 原因 |
| --- | --- | --- |
| 数据量较小，需要尝试所有可能 | 枚举 | 思路直接，能够完整覆盖所有情况 |
| 需要把数据按大小或规则排列 | `std::sort` | 标准库高效且可靠 |
| 在有序数据中查找目标或边界 | 二分查找 | 每次排除一半范围 |
| 多次查询连续区间的和 | 前缀和 | 预处理后每次查询只需 `O(1)` |
| 有序数组两端移动、原地整理数组 | 双指针 | 两个下标配合，一次扫描完成 |
| 问题可以拆成规模更小的同类问题 | 递归 | 代码能直接表达问题结构 |
| 遍历地图、连通区域、所有路径 | DFS | 沿一条路线深入，再回退尝试 |
| 等权地图中的最少步数 | BFS | 按距离从近到远搜索 |

### 复杂度速查

| 算法 | 常见时间复杂度 | 常见额外空间复杂度 |
| --- | --- | --- |
| 单层枚举 | `O(n)` | `O(1)` |
| 枚举两个元素 | `O(n²)` | `O(1)` |
| 冒泡、选择、插入排序 | `O(n²)` | `O(1)` |
| `std::sort` | `O(n log n)` | 与实现有关 |
| 二分查找 | `O(log n)` | `O(1)` |
| 建立前缀和 | `O(n)` | `O(n)` |
| 前缀和单次查询 | `O(1)` | 不再增加 |
| 双指针扫描 | `O(n)` | `O(1)` |
| 阶乘递归 | `O(n)` | `O(n)` |
| 网格 DFS 或 BFS | `O(R × C)` | `O(R × C)` |

### 本篇重点

1. **算法是明确的解题步骤**，不仅要能得到答案，还要关注时间和空间效率。
2. **枚举是最直接的起点**，数据量小时不要为了复杂而复杂。
3. **排序能让数据产生顺序**，为二分和双指针等算法创造条件。
4. **二分依赖有序或单调性**，核心是每次正确排除一半范围。
5. **前缀和用一次预处理换取多次快速查询**。
6. **双指针通过有规律地移动两个位置减少重复检查**。
7. **递归必须有终止条件，并且每次调用都要让问题规模变小**。
8. **DFS 擅长深入遍历，BFS 擅长寻找等权条件下的最少步数**。

> [!tip] 推荐学习顺序
> 先用纸笔模拟示例中的数组和指针变化，再遮住代码独立实现。写完后使用小数据、空数据、单个元素、重复元素和找不到答案等情况测试。能清楚说出每个变量的含义，才算真正理解了算法。
