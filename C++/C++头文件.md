# C++ 常用头文件及用途

> [!summary] 学习目标
> 本篇整理 C++ 学习和日常编程中最常用的标准库头文件。每个章节都会说明“什么时候使用”、常见类型或函数、完整示例以及容易踩到的坑。

> [!info] 示例约定
> - 示例默认使用 C++17 标准，特别标注的内容需要 C++20。
> - 每段“完整示例”都可以单独保存为 .cpp 文件进行编译。
> - 示例统一使用 `using namespace std;`，代码中不再重复书写命名空间前缀。
> - 编译示例：g++ main.cpp -std=c++17 -Wall -Wextra -o main

## 目录

- [[#1. 常用头文件速查表|1. 常用头文件速查表]]
- [[#2. 输入、输出与格式化|2. 输入、输出与格式化]]
- [[#3. 字符串与字符处理|3. 字符串与字符处理]]
- [[#4. 顺序容器|4. 顺序容器]]
- [[#5. 栈、队列与关联容器|5. 栈、队列与关联容器]]
- [[#6. 算法、数值计算与迭代器|6. 算法、数值计算与迭代器]]
- [[#7. 常用工具类型|7. 常用工具类型]]
- [[#8. 数学、随机数与时间|8. 数学、随机数与时间]]
- [[#9. 文件系统、异常与调试|9. 文件系统、异常与调试]]
- [[#10. 正则表达式、位运算与多线程|10. 正则表达式、位运算与多线程]]
- [[#11. 综合练习：学生成绩统计|11. 综合练习：学生成绩统计]]
- [[#12. 如何选择头文件|12. 如何选择头文件]]

## 1. 常用头文件速查表

| 头文件 | 主要用途 | 常见类型或函数 |
| --- | --- | --- |
| <iostream> | 控制台输入、输出和错误信息 | cin、cout、cerr |
| <iomanip> | 控制输出格式 | fixed、setprecision、setw |
| <fstream> | 读写文件 | ifstream、ofstream、fstream |
| <sstream> | 把字符串当作输入输出流 | istringstream、ostringstream |
| <string> | 使用字符串 | string、stoi、to_string |
| <string_view> | 只读查看字符串，减少复制 | string_view，C++17 |
| <cctype> | 判断或转换单个字符 | isdigit、isalpha、tolower |
| <cstring> | 操作 C 风格字符数组 | strlen、strcmp、strcpy |
| <vector> | 动态数组 | vector |
| <array> | 固定长度数组 | array |
| <deque> | 双端队列 | deque |
| <list> | 双向链表 | list |
| <stack> | 后进先出的栈 | stack |
| <queue> | 普通队列和优先队列 | queue、priority_queue |
| <set> | 有序且元素不重复的集合 | set、multiset |
| <unordered_set> | 基于哈希表的无序集合 | unordered_set |
| <map> | 有序键值对 | map、multimap |
| <unordered_map> | 基于哈希表的无序键值对 | unordered_map |
| <algorithm> | 排序、查找、计数、变换等通用算法 | sort、find、count_if |
| <numeric> | 求和、连续赋值、内积等数值算法 | accumulate、iota |
| <iterator> | 迭代器工具 | distance、back_inserter |
| <utility> | 二元组和通用工具 | pair、move、swap |
| <tuple> | 保存多个不同类型的值 | tuple、get、tie |
| <optional> | 表示“可能有值，也可能没有值” | optional，C++17 |
| <variant> | 一个变量保存多种候选类型之一 | variant、visit，C++17 |
| <functional> | 保存、传递和调用函数 | function、ref |
| <memory> | 智能指针和动态内存管理 | unique_ptr、shared_ptr |
| <cmath> | 常用数学计算 | sqrt、pow、round |
| <limits> | 查询数值类型范围 | numeric_limits |
| <random> | 生成高质量随机数 | mt19937、uniform_int_distribution |
| <chrono> | 时间点、时间段和计时 | chrono |
| <filesystem> | 路径、目录和文件信息 | filesystem，C++17 |
| <stdexcept> | 标准异常类型 | runtime_error、invalid_argument |
| <cassert> | 调试阶段的断言 | assert |
| <regex> | 正则表达式匹配和替换 | regex、regex_match |
| <bitset> | 固定长度的二进制位集合 | bitset |
| <thread> | 创建和管理线程 | thread |
| <mutex> | 多线程互斥保护 | mutex、lock_guard |

---

## 2. 输入、输出与格式化

### 2.1 <iostream>：控制台输入输出

什么时候使用：

- 从键盘读取数据。
- 向控制台打印结果。
- 输出错误或诊断信息。

常见对象：

| 对象 | 用途 |
| --- | --- |
| cin | 标准输入，通常来自键盘 |
| cout | 标准输出 |
| cerr | 错误输出，通常立即刷新 |
| clog | 日志输出，允许缓冲 |

完整示例：

~~~cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int age{};
    string name;

    cout << "请输入年龄：";

    if (!(cin >> age)) {
        cerr << "输入错误：年龄必须是整数。\n";
        return 1;
    }

    // ws 会先吃掉前面输入遗留的换行和空白。
    cout << "请输入姓名：";
    getline(cin >> ws, name);

    cout << "你好，" << name << "！\n";
    cout << "明年你将 " << age + 1 << " 岁。\n";

    return 0;
}
~~~

> [!warning] cin 和 getline 连用
> cin >> value 读取完成后，输入缓冲区中通常还留着换行符。紧接着直接调用 getline 可能读到空行。可以写成 getline(cin >> ws, text)。

---

### 2.2 <iomanip>：格式化输出

常用控制器：

| 控制器 | 作用 |
| --- | --- |
| fixed | 使用普通小数形式显示浮点数 |
| scientific | 使用科学计数法 |
| setprecision(n) | 设置精度；配合 fixed 时表示小数位数 |
| setw(n) | 设置下一项输出所占的最小宽度 |
| setfill(ch) | 设置填充字符 |
| left / right | 左对齐或右对齐 |
| boolalpha | 把 bool 输出为 true/false |
| hex / dec / oct | 十六进制、十进制、八进制 |

完整示例：

~~~cpp
#include <iomanip>
#include <iostream>
#include <string>
using namespace std;

int main() {
    double price = 12.5;
    double pi = 3.1415926535;

    cout << fixed << setprecision(2);
    cout << "价格：" << price << '\n';  // 12.50
    cout << "圆周率：" << pi << '\n';  // 3.14

    cout << "\n成绩表\n";
    cout << left
              << setw(12) << "姓名"
              << right
              << setw(8) << "成绩" << '\n';

    cout << setfill('-') << setw(20) << "" << '\n';
    cout << setfill(' ');

    cout << left
              << setw(12) << "Alice"
              << right
              << setw(8) << 95 << '\n';

    cout << boolalpha;
    cout << "是否及格：" << true << '\n';

    int number = 255;
    cout << "十进制：" << dec << number << '\n';
    cout << "十六进制：" << hex << number << '\n';

    return 0;
}
~~~

> [!note] setw 的特点
> setw 只影响紧接着输出的一项；fixed、setprecision 和 setfill 等状态会持续生效，必要时要主动改回去。

---

### 2.3 <fstream>：文件读写

三种文件流：

| 类型 | 用途 |
| --- | --- |
| ifstream | 读取文件 |
| ofstream | 写入文件 |
| fstream | 同时读写文件 |

完整示例：

~~~cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
    const string filename = "scores.txt";

    // 写文件。默认模式会覆盖原内容。
    {
        ofstream output(filename);

        if (!output) {
            cerr << "无法打开文件进行写入：" << filename << '\n';
            return 1;
        }

        output << "Alice 95\n";
        output << "Bob 87\n";
        output << "Cindy 92\n";
    }  // 离开作用域后，文件会自动关闭。

    // 读文件。
    ifstream input(filename);

    if (!input) {
        cerr << "无法打开文件进行读取：" << filename << '\n';
        return 1;
    }

    string name;
    int score{};
    int total = 0;
    int count = 0;

    while (input >> name >> score) {
        cout << name << " 的成绩是 " << score << '\n';
        total += score;
        ++count;
    }

    if (count > 0) {
        cout << "平均分："
                  << static_cast<double>(total) / count
                  << '\n';
    }

    return 0;
}
~~~

追加内容：

~~~cpp
ofstream output("log.txt", ios::app);
output << "这行会添加到文件末尾\n";
~~~

常用打开模式：

| 模式 | 用途 |
| --- | --- |
| ios::in | 读取 |
| ios::out | 写入 |
| ios::app | 每次写入都追加到末尾 |
| ios::trunc | 打开时清空原内容 |
| ios::binary | 二进制模式 |

---

### 2.4 <sstream>：解析和拼接字符串

适合的场景：

- 把一整行文字拆成多个值。
- 把数字和文字拼成一个字符串。
- 进行简单的类型转换。

完整示例：

~~~cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string record = "1001 Alice 87.5";
    istringstream input(record);

    int id{};
    string name;
    double score{};

    if (input >> id >> name >> score) {
        cout << "编号：" << id << '\n';
        cout << "姓名：" << name << '\n';
        cout << "成绩：" << score << '\n';
    } else {
        cerr << "记录格式不正确。\n";
    }

    ostringstream output;
    output << "学生 " << name << " 的成绩为 " << score;

    string message = output.str();
    cout << message << '\n';

    return 0;
}
~~~

---

## 3. 字符串与字符处理

### 3.1 <string>：标准字符串

常用成员函数：

| 写法 | 用途 |
| --- | --- |
| text.size() / text.length() | 字符数量 |
| text.empty() | 是否为空 |
| text.at(i) | 带越界检查地访问字符 |
| text.find(target) | 查找子串 |
| text.substr(pos, count) | 截取子串 |
| text.append(value) | 追加内容 |
| text.insert(pos, value) | 插入内容 |
| text.erase(pos, count) | 删除内容 |
| text.replace(pos, count, value) | 替换内容 |
| stoi(text) | 字符串转 int |
| stod(text) | 字符串转 double |
| to_string(value) | 数值转字符串 |

完整示例：

~~~cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "Hello, C++";

    cout << "长度：" << text.size() << '\n';
    cout << "第一个字符：" << text.front() << '\n';
    cout << "最后一个字符：" << text.back() << '\n';

    size_t position = text.find("C++");

    if (position != string::npos) {
        cout << "C++ 从下标 " << position << " 开始\n";
    }

    string greeting = text.substr(0, 5);
    cout << "截取结果：" << greeting << '\n';

    text.replace(position, 3, "World");
    cout << "替换结果：" << text << '\n';

    text += "!";
    cout << "追加结果：" << text << '\n';

    string numberText = "2026";

    try {
        int year = stoi(numberText);
        cout << "下一年：" << year + 1 << '\n';
    } catch (const invalid_argument&) {
        cerr << "字符串不是有效整数。\n";
    } catch (const out_of_range&) {
        cerr << "整数超出 int 的表示范围。\n";
    }

    double price = 19.9;
    string priceText = to_string(price);
    cout << "转换后的字符串：" << priceText << '\n';

    return 0;
}
~~~

> [!warning] find 的返回值
> find 找不到内容时返回 string::npos，而不是 -1。返回类型通常是 size_t。

---

### 3.2 <string_view>：只读查看字符串

string_view 从 C++17 开始提供。它通常只保存“字符串数据在哪里”和“长度是多少”，不会主动复制字符。

适合：

- 函数只需要读取字符串。
- 参数可能来自 string、字符串字面量或字符数组。
- 希望减少不必要的字符串复制。

完整示例：

~~~cpp
#include <iostream>
#include <string>
#include <string_view>
using namespace std;

bool startsWith(string_view text, string_view prefix) {
    return text.size() >= prefix.size()
        && text.substr(0, prefix.size()) == prefix;
}

int main() {
    string filename = "report.txt";

    cout << boolalpha;
    cout << startsWith(filename, "rep") << '\n';
    cout << startsWith("hello", "he") << '\n';

    return 0;
}
~~~

> [!danger] 生命周期
> string_view 不拥有字符数据。如果原来的 string 已经销毁或重新分配内存，指向它的 string_view 可能失效。不要返回指向局部字符串的 string_view。

---

### 3.3 <cctype>：判断和转换字符

常用函数：

| 函数 | 判断内容 |
| --- | --- |
| isdigit(ch) | 是否为数字 |
| isalpha(ch) | 是否为字母 |
| isalnum(ch) | 是否为字母或数字 |
| isspace(ch) | 是否为空白字符 |
| islower(ch) / isupper(ch) | 是否为小写/大写字母 |
| tolower(ch) / toupper(ch) | 转成小写/大写 |

完整示例：

~~~cpp
#include <cctype>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string text = "C++ 2026";
    int letters = 0;
    int digits = 0;

    for (char& ch : text) {
        // 转成 unsigned char 可以避免负值 char 带来的未定义行为。
        unsigned char value = static_cast<unsigned char>(ch);

        if (isalpha(value)) {
            ++letters;
            ch = static_cast<char>(tolower(value));
        } else if (isdigit(value)) {
            ++digits;
        }
    }

    cout << "转换结果：" << text << '\n';
    cout << "字母数量：" << letters << '\n';
    cout << "数字数量：" << digits << '\n';

    return 0;
}
~~~

---

### 3.4 <cstring>：C 风格字符串

C 风格字符串是以空字符 '\0' 结尾的 char 数组。现代 C++ 中通常优先使用 string，但调用旧的 C 接口时仍会遇到它。

完整示例：

~~~cpp
#include <cstring>
#include <iostream>
using namespace std;

int main() {
    char first[20] = "Hello";
    const char second[] = "World";

    cout << "first 长度：" << strlen(first) << '\n';

    if (strcmp(first, second) < 0) {
        cout << "first 按字典顺序排在 second 前面\n";
    }

    // first 的容量足够容纳 "Hi" 和结尾的 '\0'。
    strcpy(first, "Hi");
    cout << "复制后：" << first << '\n';

    return 0;
}
~~~

> [!danger] 数组越界
> strcpy 不知道目标数组的容量。如果目标空间不够，会造成越界。日常 C++ 代码优先使用 string；必须使用字符数组时，应明确检查容量。

---

## 4. 顺序容器

### 4.1 <vector>：动态数组

特点：

- 元素连续存储，支持快速按下标访问。
- 可以在尾部高效添加和删除元素。
- 中间插入、删除可能移动后面的许多元素。
- 是最常用、通常也应最先考虑的序列容器。

常用操作：

| 操作 | 用途 |
| --- | --- |
| values.push_back(x) | 在末尾复制加入元素 |
| values.emplace_back(...) | 在末尾直接构造元素 |
| values.pop_back() | 删除末尾元素 |
| values.size() | 元素数量 |
| values.at(i) | 带越界检查的访问 |
| values.front() / values.back() | 第一个/最后一个元素 |
| values.clear() | 清空所有元素 |
| values.reserve(n) | 预留容量，减少重新分配 |

完整示例：

~~~cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
    vector<int> scores{78, 92, 65, 88};

    scores.push_back(95);
    scores.emplace_back(71);

    cout << "原始成绩：";
    for (int score : scores) {
        cout << score << ' ';
    }
    cout << '\n';

    sort(scores.begin(), scores.end(), greater<int>());

    cout << "降序排列：";
    for (int score : scores) {
        cout << score << ' ';
    }
    cout << '\n';

    int total = accumulate(scores.begin(), scores.end(), 0);
    double average = static_cast<double>(total) / scores.size();
    cout << "平均分：" << average << '\n';

    // 删除所有低于 70 的成绩。
    scores.erase(
        remove_if(
            scores.begin(),
            scores.end(),
            [](int score) {
                return score < 70;
            }
        ),
        scores.end()
    );

    cout << "删除不及格成绩后：";
    for (int score : scores) {
        cout << score << ' ';
    }
    cout << '\n';

    return 0;
}
~~~

> [!tip] erase-remove 写法
> C++17 中，remove_if 只会把需要保留的元素移动到前面，并返回新的逻辑结尾；还要再调用 vector::erase 才会真正缩短容器。C++20 可以使用 erase_if。

---

### 4.2 <array>：固定长度数组

array 的长度在编译时确定。它比原生数组更容易获得长度，也能直接使用标准算法。

完整示例：

~~~cpp
#include <algorithm>
#include <array>
#include <iostream>
using namespace std;

int main() {
    array<int, 5> values{5, 2, 9, 1, 7};

    sort(values.begin(), values.end());

    cout << "排序结果：";
    for (int value : values) {
        cout << value << ' ';
    }
    cout << '\n';

    cout << "元素数量：" << values.size() << '\n';
    cout << "最小值：" << values.front() << '\n';
    cout << "最大值：" << values.back() << '\n';

    values.fill(0);

    cout << "清零后：";
    for (int value : values) {
        cout << value << ' ';
    }
    cout << '\n';

    return 0;
}
~~~

选择建议：

- 长度运行时变化：使用 vector。
- 长度固定且较小：使用 array。
- 只有特殊底层接口要求时，才优先考虑原生数组。

---

### 4.3 <deque>：双端队列

deque 可以高效地在头部和尾部添加或删除元素，并且支持下标访问。

~~~cpp
#include <deque>
#include <iostream>
using namespace std;

int main() {
    deque<int> tasks;

    tasks.push_back(2);
    tasks.push_back(3);
    tasks.push_front(1);

    cout << "队首：" << tasks.front() << '\n';
    cout << "队尾：" << tasks.back() << '\n';

    while (!tasks.empty()) {
        cout << "处理任务 " << tasks.front() << '\n';
        tasks.pop_front();
    }

    return 0;
}
~~~

---

### 4.4 <list>：双向链表

list 适合已经拿到目标迭代器后，频繁在中间插入或删除元素的场景。它不支持 values[index]，通常也不如 vector 节省内存。

~~~cpp
#include <iostream>
#include <list>
using namespace std;

int main() {
    list<int> values{10, 20, 30};

    auto position = values.begin();
    ++position;  // 指向 20。

    values.insert(position, 15);
    values.remove(30);

    for (int value : values) {
        cout << value << ' ';
    }
    cout << '\n';

    return 0;
}
~~~

> [!note] 不要因为“插入快”就默认使用 list
> 查找插入位置本身仍可能需要线性时间。现代计算机对连续内存更友好，因此大多数普通序列首先考虑 vector。

---

## 5. 栈、队列与关联容器

### 5.1 <stack>：后进先出

栈的规则是“最后放进去的元素最先取出”，常用于括号匹配、撤销操作、深度优先搜索等。

~~~cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool bracketsAreValid(const string& text) {
    stack<char> brackets;

    for (char ch : text) {
        if (ch == '(' || ch == '[' || ch == '{') {
            brackets.push(ch);
            continue;
        }

        if (ch != ')' && ch != ']' && ch != '}') {
            continue;
        }

        if (brackets.empty()) {
            return false;
        }

        char left = brackets.top();
        brackets.pop();

        bool matched =
            (left == '(' && ch == ')')
            || (left == '[' && ch == ']')
            || (left == '{' && ch == '}');

        if (!matched) {
            return false;
        }
    }

    return brackets.empty();
}

int main() {
    string expression = "{a + [b * (c + d)]}";
    cout << boolalpha
              << bracketsAreValid(expression)
              << '\n';
}
~~~

常用操作：push、pop、top、empty、size。注意 pop 不返回被删除的值，需要先读取 top。

---

### 5.2 <queue>：队列和优先队列

普通队列遵循“先进先出”：

~~~cpp
#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    queue<string> customers;

    customers.push("Alice");
    customers.push("Bob");
    customers.push("Cindy");

    while (!customers.empty()) {
        cout << "正在服务：" << customers.front() << '\n';
        customers.pop();
    }

    return 0;
}
~~~

优先队列会优先取出优先级最高的元素。默认是大顶堆，也就是最大值先出：

~~~cpp
#include <functional>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    priority_queue<int> maxHeap;
    maxHeap.push(30);
    maxHeap.push(10);
    maxHeap.push(50);

    cout << "最大值：" << maxHeap.top() << '\n';

    // 小顶堆：最小值先出。
    priority_queue<
        int,
        vector<int>,
        greater<int>
    > minHeap;

    minHeap.push(30);
    minHeap.push(10);
    minHeap.push(50);

    cout << "最小值：" << minHeap.top() << '\n';

    return 0;
}
~~~

---

### 5.3 <set> 与 <unordered_set>：集合

set：

- 元素自动有序。
- 元素不重复。
- 查找、插入和删除通常是 O(log n)。

unordered_set：

- 不保证遍历顺序。
- 平均查找、插入和删除为 O(1)。
- 元素类型需要支持哈希。

完整示例：

~~~cpp
#include <iostream>
#include <set>
#include <string>
#include <unordered_set>
using namespace std;

int main() {
    set<int> ordered{5, 2, 5, 1, 3};

    cout << "set 自动去重并排序：";
    for (int value : ordered) {
        cout << value << ' ';
    }
    cout << '\n';

    if (ordered.find(3) != ordered.end()) {
        cout << "集合中存在 3\n";
    }

    unordered_set<string> usernames{
        "alice",
        "bob"
    };

    string candidate = "alice";

    if (usernames.count(candidate) > 0) {
        cout << candidate << " 已经存在\n";
    }

    auto [iterator, inserted] = usernames.insert("cindy");
    cout << "是否成功插入 cindy："
              << boolalpha
              << inserted
              << '\n';

    return 0;
}
~~~

需要保留重复元素时，可以使用 multiset 或 unordered_multiset。

---

### 5.4 <map> 与 <unordered_map>：键值映射

map：

- 每个键对应一个值。
- 按键排序。
- 查找、插入和删除通常是 O(log n)。

unordered_map：

- 不保证键的遍历顺序。
- 平均查找、插入和删除为 O(1)。

完整示例：统计单词次数

~~~cpp
#include <iostream>
#include <sstream>
#include <string>
#include <unordered_map>
using namespace std;

int main() {
    string sentence = "cpp is fast and cpp is powerful";
    istringstream input(sentence);
    unordered_map<string, int> frequency;

    string word;
    while (input >> word) {
        ++frequency[word];
    }

    for (const auto& [currentWord, count] : frequency) {
        cout << currentWord << "：" << count << '\n';
    }

    string target = "cpp";
    auto iterator = frequency.find(target);

    if (iterator != frequency.end()) {
        cout << target << " 共出现 "
                  << iterator->second
                  << " 次\n";
    }

    return 0;
}
~~~

> [!warning] operator[] 会插入元素
> frequency[key] 在 key 不存在时，会先创建一个默认值。只想查询而不想插入时，使用 find、count，或者 C++20 的 contains。

---

## 6. 算法、数值计算与迭代器

### 6.1 <algorithm>：通用算法

最常用的算法：

| 算法 | 用途 |
| --- | --- |
| sort | 排序 |
| stable_sort | 稳定排序，相等元素保持原相对顺序 |
| find / find_if | 查找元素 |
| count / count_if | 计数 |
| min_element / max_element | 找最小/最大元素 |
| binary_search | 在已排序范围中二分判断是否存在 |
| lower_bound | 在已排序范围中寻找第一个不小于目标的位置 |
| transform | 对元素进行转换 |
| copy | 复制范围 |
| reverse | 反转范围 |
| remove_if | 把需要保留的元素移到前面 |
| all_of / any_of / none_of | 判断全部、任意或没有元素满足条件 |

完整示例：

~~~cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int main() {
    vector<Student> students{
        {"Alice", 88},
        {"Bob", 95},
        {"Cindy", 88},
        {"David", 72}
    };

    stable_sort(
        students.begin(),
        students.end(),
        [](const Student& left, const Student& right) {
            return left.score > right.score;
        }
    );

    cout << "按成绩降序：\n";
    for (const Student& student : students) {
        cout << student.name
                  << ' '
                  << student.score
                  << '\n';
    }

    auto firstExcellent = find_if(
        students.begin(),
        students.end(),
        [](const Student& student) {
            return student.score >= 90;
        }
    );

    if (firstExcellent != students.end()) {
        cout << "找到优秀学生："
                  << firstExcellent->name
                  << '\n';
    }

    int passed = count_if(
        students.begin(),
        students.end(),
        [](const Student& student) {
            return student.score >= 60;
        }
    );

    cout << "及格人数：" << passed << '\n';

    bool everyonePassed = all_of(
        students.begin(),
        students.end(),
        [](const Student& student) {
            return student.score >= 60;
        }
    );

    cout << boolalpha
              << "是否全部及格："
              << everyonePassed
              << '\n';

    return 0;
}
~~~

> [!warning] 二分算法的前提
> binary_search、lower_bound 和 upper_bound 要求数据已经按照相同规则排序，否则结果没有意义。

---

### 6.2 <numeric>：数值算法

完整示例：

~~~cpp
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
    vector<int> values(5);

    // 依次填入 1、2、3、4、5。
    iota(values.begin(), values.end(), 1);

    int sum = accumulate(
        values.begin(),
        values.end(),
        0
    );

    long long product = accumulate(
        values.begin(),
        values.end(),
        1LL,
        [](long long result, int value) {
            return result * value;
        }
    );

    vector<int> weights{2, 2, 3, 3, 5};
    int weightedSum = inner_product(
        values.begin(),
        values.end(),
        weights.begin(),
        0
    );

    vector<int> prefix(values.size());
    partial_sum(
        values.begin(),
        values.end(),
        prefix.begin()
    );

    cout << "总和：" << sum << '\n';
    cout << "乘积：" << product << '\n';
    cout << "加权和：" << weightedSum << '\n';

    cout << "前缀和：";
    for (int value : prefix) {
        cout << value << ' ';
    }
    cout << '\n';

    return 0;
}
~~~

> [!warning] accumulate 的初始值决定计算类型
> 对 long long 或 double 数据求和时，初始值应写成 0LL 或 0.0。若写成整数 0，中间计算可能按 int 进行，造成截断或溢出。

---

### 6.3 <iterator>：迭代器工具

迭代器可以理解为指向容器元素的“通用指针”。标准算法通过迭代器操作不同类型的容器。

~~~cpp
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>
using namespace std;

int main() {
    vector<int> source{1, 2, 3, 4};
    vector<int> destination;

    // back_inserter 会调用 destination.push_back。
    copy(
        source.begin(),
        source.end(),
        back_inserter(destination)
    );

    auto iterator = destination.begin();
    advance(iterator, 2);

    cout << "移动两步后的元素：" << *iterator << '\n';
    cout << "首尾距离："
              << distance(destination.begin(), destination.end())
              << '\n';

    return 0;
}
~~~

---

## 7. 常用工具类型

### 7.1 <utility>：pair、swap 与 move

~~~cpp
#include <iostream>
#include <string>
#include <utility>
using namespace std;

pair<int, string> findUser() {
    return {1001, "Alice"};
}

int main() {
    auto [id, name] = findUser();
    cout << id << ' ' << name << '\n';

    int first = 10;
    int second = 20;
    swap(first, second);

    cout << first << ' ' << second << '\n';

    string source = "一段很长的文字";
    string target = move(source);

    cout << "target：" << target << '\n';

    // source 仍然有效，但它的具体内容不应再被假定。
    source = "可以重新赋值";
    cout << "source：" << source << '\n';

    return 0;
}
~~~

> [!note] move 本身不一定移动
> move 只是把对象转换为允许被移动的形式，真正是否转移资源由接收方的移动构造或移动赋值操作决定。

---

### 7.2 <tuple>：保存多个不同类型的值

~~~cpp
#include <iostream>
#include <string>
#include <tuple>
using namespace std;

tuple<string, int, double> getStudent() {
    return {"Alice", 20, 92.5};
}

int main() {
    auto student = getStudent();

    cout << get<0>(student) << '\n';
    cout << get<1>(student) << '\n';
    cout << get<2>(student) << '\n';

    auto [name, age, score] = student;
    cout << name << ' '
              << age << ' '
              << score << '\n';

    return 0;
}
~~~

建议：

- 只有两个值：优先考虑 pair。
- 少量临时返回值：tuple 很方便。
- 字段有明确业务含义并长期使用：定义具名 struct 通常更清楚。

---

### 7.3 <optional>：可能没有结果

optional 从 C++17 开始提供，可以代替特殊返回值，例如用 -1 表示“没找到”。

~~~cpp
#include <iostream>
#include <optional>
#include <string>
#include <unordered_map>
using namespace std;

optional<int> findScore(
    const unordered_map<string, int>& scores,
    const string& name
) {
    auto iterator = scores.find(name);

    if (iterator == scores.end()) {
        return nullopt;
    }

    return iterator->second;
}

int main() {
    unordered_map<string, int> scores{
        {"Alice", 95},
        {"Bob", 87}
    };

    optional<int> result = findScore(scores, "Cindy");

    if (result.has_value()) {
        cout << "成绩：" << result.value() << '\n';
    } else {
        cout << "没有找到该学生。\n";
    }

    cout << "不存在时使用默认值："
              << result.value_or(0)
              << '\n';

    return 0;
}
~~~

---

### 7.4 <variant>：多种候选类型之一

variant 从 C++17 开始提供。它比 void 指针或手动联合体更安全。

~~~cpp
#include <iostream>
#include <string>
#include <variant>
#include <vector>
using namespace std;

using Value = variant<int, double, string>;

int main() {
    vector<Value> values{
        42,
        3.14,
        string("hello")
    };

    for (const Value& value : values) {
        visit(
            [](const auto& current) {
                cout << current << '\n';
            },
            value
        );
    }

    Value value = 100;

    if (holds_alternative<int>(value)) {
        cout << "整数值："
                  << get<int>(value)
                  << '\n';
    }

    return 0;
}
~~~

---

### 7.5 <functional>：保存和传递函数

function 可以保存普通函数、Lambda 和函数对象。

~~~cpp
#include <functional>
#include <iostream>
#include <vector>
using namespace std;

int add(int left, int right) {
    return left + right;
}

void applyToEach(
    const vector<int>& values,
    const function<void(int)>& operation
) {
    for (int value : values) {
        operation(value);
    }
}

int main() {
    function<int(int, int)> operation = add;
    cout << operation(3, 4) << '\n';

    operation = [](int left, int right) {
        return left * right;
    };
    cout << operation(3, 4) << '\n';

    vector<int> values{1, 2, 3};
    int total = 0;

    applyToEach(values, [&total](int value) {
        total += value;
    });

    cout << "总和：" << total << '\n';

    return 0;
}
~~~

> [!tip] 模板与 function
> function 使用方便，但有少量运行时开销。性能敏感的通用函数常直接接收模板参数；普通业务代码则可优先考虑可读性。

---

### 7.6 <memory>：智能指针

常见智能指针：

| 类型 | 所有权 |
| --- | --- |
| unique_ptr | 独占对象，同一时间只有一个所有者 |
| shared_ptr | 多个对象共享所有权，使用引用计数 |
| weak_ptr | 观察 shared_ptr 管理的对象，但不增加引用计数 |

完整示例：

~~~cpp
#include <iostream>
#include <memory>
#include <string>
using namespace std;

class Student {
public:
    explicit Student(string name)
        : name_(move(name)) {
        cout << name_ << " 被创建\n";
    }

    ~Student() {
        cout << name_ << " 被销毁\n";
    }

    void introduce() const {
        cout << "我是 " << name_ << '\n';
    }

private:
    string name_;
};

int main() {
    auto uniqueStudent = make_unique<Student>("Alice");
    uniqueStudent->introduce();

    // unique_ptr 不能复制，只能移动所有权。
    auto newOwner = move(uniqueStudent);

    if (!uniqueStudent) {
        cout << "原 unique_ptr 已不再拥有对象\n";
    }

    auto sharedStudent = make_shared<Student>("Bob");
    weak_ptr<Student> observer = sharedStudent;

    {
        auto secondOwner = sharedStudent;
        cout << "共享所有者数量："
                  << sharedStudent.use_count()
                  << '\n';
    }

    if (auto locked = observer.lock()) {
        locked->introduce();
    }

    return 0;
}
~~~

> [!tip] 优先顺序
> 首先考虑直接创建普通局部对象；确实需要动态生命周期时优先 unique_ptr；只有明确需要共享所有权时才使用 shared_ptr。

---

## 8. 数学、随机数与时间

### 8.1 <cmath>：数学函数

常用函数：

| 函数 | 用途 |
| --- | --- |
| abs(x) | 绝对值 |
| sqrt(x) | 平方根 |
| pow(x, y) | x 的 y 次幂 |
| floor(x) | 向下取整 |
| ceil(x) | 向上取整 |
| round(x) | 四舍五入 |
| sin、cos、tan | 三角函数，参数使用弧度 |
| log / log10 | 自然对数/常用对数 |
| hypot(x, y) | 计算 sqrt(x*x + y*y) |
| isnan / isfinite | 判断特殊浮点值 |

完整示例：

~~~cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
    double x = 3.0;
    double y = 4.0;

    cout << fixed << setprecision(2);
    cout << "斜边长度：" << hypot(x, y) << '\n';
    cout << "2 的 10 次方：" << pow(2.0, 10.0) << '\n';
    cout << "sqrt(9)：" << sqrt(9.0) << '\n';
    cout << "floor(3.8)：" << floor(3.8) << '\n';
    cout << "ceil(3.2)：" << ceil(3.2) << '\n';
    cout << "round(3.5)：" << round(3.5) << '\n';

    const double pi = acos(-1.0);
    double degrees = 30.0;
    double radians = degrees * pi / 180.0;
    cout << "sin(30°)：" << sin(radians) << '\n';

    return 0;
}
~~~

> [!warning] 浮点数比较
> 浮点数计算存在舍入误差。通常不要直接用 a == b 判断两个计算结果是否相等，可以比较 abs(a - b) 是否小于一个合适的误差范围。

---

### 8.2 <limits>：数值范围和输入清理

~~~cpp
#include <iostream>
#include <limits>
using namespace std;

int main() {
    cout << "int 最小值："
              << numeric_limits<int>::min()
              << '\n';
    cout << "int 最大值："
              << numeric_limits<int>::max()
              << '\n';
    cout << "double 最低值："
              << numeric_limits<double>::lowest()
              << '\n';
    cout << "double 最大值："
              << numeric_limits<double>::max()
              << '\n';

    int number{};
    cout << "请输入整数：";

    while (!(cin >> number)) {
        cout << "输入无效，请重新输入：";

        cin.clear();
        cin.ignore(
            numeric_limits<streamsize>::max(),
            '\n'
        );
    }

    cout << "你输入了：" << number << '\n';

    return 0;
}
~~~

区别：

- min()：浮点类型中表示最小的正正规数，不是最负值。
- lowest()：可以表示的最低值，也就是最负值。
- max()：可以表示的最大值。

---

### 8.3 <random>：现代随机数

不要用 rand() % n 作为首选方案。<random> 可以明确选择随机数引擎和概率分布。

~~~cpp
#include <iostream>
#include <random>
using namespace std;

int main() {
    // random_device 通常用于给伪随机引擎提供种子。
    random_device device;
    mt19937 engine(device());

    // 生成闭区间 [1, 6] 中的均匀整数。
    uniform_int_distribution<int> dice(1, 6);

    cout << "掷 10 次骰子：";
    for (int i = 0; i < 10; ++i) {
        cout << dice(engine) << ' ';
    }
    cout << '\n';

    // 生成 [0.0, 1.0) 中的均匀小数。
    uniform_real_distribution<double> probability(0.0, 1.0);
    cout << "随机概率：" << probability(engine) << '\n';

    // 均值为 100，标准差为 15 的正态分布。
    normal_distribution<double> scoreDistribution(100.0, 15.0);
    cout << "正态分布样本："
              << scoreDistribution(engine)
              << '\n';

    return 0;
}
~~~

> [!tip] 可重复测试
> 调试或测试时可使用固定种子，例如 mt19937 engine(12345);。这样每次运行都会得到相同的随机序列。

---

### 8.4 <chrono>：计时和时间段

~~~cpp
#include <chrono>
#include <iostream>
using namespace std;

int main() {
    auto start = chrono::steady_clock::now();

    long long sum = 0;
    for (int i = 1; i <= 10'000'000; ++i) {
        sum += i;
    }

    auto end = chrono::steady_clock::now();

    auto milliseconds =
        chrono::duration_cast<chrono::milliseconds>(
            end - start
        );

    cout << "计算结果：" << sum << '\n';
    cout << "耗时："
              << milliseconds.count()
              << " 毫秒\n";

    return 0;
}
~~~

常用时钟：

- steady_clock：只会向前走，适合测量耗时。
- system_clock：对应系统日期和时间，可能因校时而跳变。
- high_resolution_clock：实现所提供的最高精度时钟，但不一定是独立时钟。

---

## 9. 文件系统、异常与调试

### 9.1 <filesystem>：路径和目录

filesystem 从 C++17 开始提供。

~~~cpp
#include <filesystem>
#include <iostream>
using namespace std;

namespace fs = filesystem;

int main() {
    fs::path folder = "data";
    fs::path file = folder / "scores.txt";

    cout << "组合后的路径：" << file << '\n';
    cout << "文件名：" << file.filename() << '\n';
    cout << "扩展名：" << file.extension() << '\n';

    error_code error;
    bool created = fs::create_directories(folder, error);

    if (error) {
        cerr << "创建目录失败："
                  << error.message()
                  << '\n';
        return 1;
    }

    if (created) {
        cout << "目录已创建。\n";
    } else {
        cout << "目录已经存在。\n";
    }

    cout << "\n当前目录内容：\n";

    for (const fs::directory_entry& entry :
         fs::directory_iterator(".")) {
        cout << entry.path();

        if (entry.is_directory()) {
            cout << " [目录]";
        } else if (entry.is_regular_file()) {
            cout << " [文件，"
                      << entry.file_size()
                      << " 字节]";
        }

        cout << '\n';
    }

    return 0;
}
~~~

> [!tip] error_code 与异常
> filesystem 的很多函数有两种形式：一种失败时抛异常，另一种接收 error_code。需要自行处理错误且不希望抛异常时，可以使用 error_code 版本。

---

### 9.2 <stdexcept>：标准异常

常用异常：

| 类型 | 适用情况 |
| --- | --- |
| invalid_argument | 参数格式或内容不合法 |
| out_of_range | 下标或数值超出范围 |
| runtime_error | 运行时发生的一般错误 |
| logic_error | 程序逻辑违反约定 |

~~~cpp
#include <iostream>
#include <stdexcept>
using namespace std;

double divide(double numerator, double denominator) {
    if (denominator == 0.0) {
        throw invalid_argument("除数不能为 0");
    }

    return numerator / denominator;
}

int main() {
    try {
        cout << divide(10.0, 0.0) << '\n';
    } catch (const invalid_argument& error) {
        cerr << "参数错误：" << error.what() << '\n';
    } catch (const exception& error) {
        cerr << "其他标准异常：" << error.what() << '\n';
    }

    return 0;
}
~~~

建议：

- 异常用于不能在当前层正常处理的错误。
- 不要把异常当作普通循环或分支控制。
- 通常按 const 引用捕获异常，避免复制和对象切片。

---

### 9.3 <cassert>：调试断言

assert 用来检查程序员认为“一定成立”的内部条件。

~~~cpp
#include <cassert>
#include <iostream>
#include <vector>
using namespace std;

double average(const vector<int>& values) {
    assert(!values.empty());

    int total = 0;
    for (int value : values) {
        total += value;
    }

    return static_cast<double>(total) / values.size();
}

int main() {
    vector<int> values{80, 90, 100};
    cout << average(values) << '\n';
}
~~~

> [!danger] assert 不能替代用户输入检查
> 定义 NDEBUG 后，assert 会被移除。因此它适合检查程序内部不变量，不适合检查文件是否存在、用户是否输入正确等运行时错误。

---

## 10. 正则表达式、位运算与多线程

### 10.1 <regex>：正则表达式

~~~cpp
#include <iostream>
#include <regex>
#include <string>
using namespace std;

int main() {
    regex emailPattern(
        R"(^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$)"
    );

    string email = "student@example.com";

    if (regex_match(email, emailPattern)) {
        cout << "邮箱格式基本正确。\n";
    } else {
        cout << "邮箱格式不正确。\n";
    }

    string text = "订单号：2026，数量：15";
    regex numberPattern(R"(\d+)");

    for (
        sregex_iterator iterator(
            text.begin(),
            text.end(),
            numberPattern
        ), end;
        iterator != end;
        ++iterator
    ) {
        cout << "找到数字："
                  << iterator->str()
                  << '\n';
    }

    string hidden = regex_replace(
        text,
        numberPattern,
        "***"
    );
    cout << hidden << '\n';

    return 0;
}
~~~

> [!note] 正则表达式并非总是最佳选择
> 简单的固定格式用 string 的 find、substr 或字符串流往往更容易读，也可能更高效。

---

### 10.2 <bitset>：固定长度位集合

~~~cpp
#include <bitset>
#include <iostream>
#include <string>
using namespace std;

int main() {
    bitset<8> permissions;

    permissions.set(0);   // 设置第 0 位。
    permissions.set(2);   // 设置第 2 位。
    permissions.flip(2);  // 翻转第 2 位。

    cout << "二进制：" << permissions << '\n';
    cout << "置位数量：" << permissions.count() << '\n';
    cout << "第 0 位：" << permissions.test(0) << '\n';
    cout << "整数值：" << permissions.to_ulong() << '\n';

    bitset<8> fromString(string("10101010"));
    cout << "从字符串构造：" << fromString << '\n';

    return 0;
}
~~~

---

### 10.3 <thread> 与 <mutex>：基础多线程

thread 用于创建线程，mutex 用于保护多个线程共享的数据。

~~~cpp
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>
using namespace std;

mutex totalMutex;
long long total = 0;

void addRange(int begin, int end) {
    long long localTotal = 0;

    for (int value = begin; value <= end; ++value) {
        localTotal += value;
    }

    // lock_guard 构造时加锁，离开作用域时自动解锁。
    lock_guard<mutex> lock(totalMutex);
    total += localTotal;
}

int main() {
    thread first(addRange, 1, 500'000);
    thread second(addRange, 500'001, 1'000'000);

    first.join();
    second.join();

    cout << "总和：" << total << '\n';

    return 0;
}
~~~

> [!danger] 线程必须正确结束
> 一个仍然可 join 的 thread 在析构时会导致程序终止。通常要调用 join 等待线程结束，或明确调用 detach。多数业务场景中应谨慎使用 detach。

> [!warning] 数据竞争
> 多个线程同时访问同一个变量，并且至少一个线程写入，而又没有正确同步，会产生数据竞争和未定义行为。可以使用 mutex 或适合场景的 atomic 保护共享状态。

---

## 11. 综合练习：学生成绩统计

这个程序综合使用：

- <iostream>：输入输出。
- <iomanip>：表格和小数格式。
- <limits>：清理错误输入。
- <vector>：保存数量可变的学生。
- <string>：保存姓名。
- <algorithm>：排序和查找。
- <numeric>：计算总分。

完整程序：

~~~cpp
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <limits>
#include <numeric>
#include <string>
#include <vector>
using namespace std;

struct Student {
    string name;
    int score;
};

int readInteger(const string& prompt, int minimum, int maximum) {
    int value{};

    while (true) {
        cout << prompt;

        if (cin >> value
            && value >= minimum
            && value <= maximum) {
            return value;
        }

        cout << "输入无效，请输入 "
                  << minimum
                  << " 到 "
                  << maximum
                  << " 之间的整数。\n";

        cin.clear();
        cin.ignore(
            numeric_limits<streamsize>::max(),
            '\n'
        );
    }
}

int main() {
    int count = readInteger("学生人数：", 1, 1000);
    vector<Student> students;
    students.reserve(count);

    for (int i = 0; i < count; ++i) {
        Student student;

        cout << "第 " << i + 1 << " 位学生姓名：";
        getline(cin >> ws, student.name);

        student.score = readInteger("成绩（0~100）：", 0, 100);
        students.push_back(move(student));
    }

    sort(
        students.begin(),
        students.end(),
        [](const Student& left, const Student& right) {
            if (left.score != right.score) {
                return left.score > right.score;
            }

            return left.name < right.name;
        }
    );

    int total = accumulate(
        students.begin(),
        students.end(),
        0,
        [](int currentTotal, const Student& student) {
            return currentTotal + student.score;
        }
    );

    double average =
        static_cast<double>(total) / students.size();

    int passed = count_if(
        students.begin(),
        students.end(),
        [](const Student& student) {
            return student.score >= 60;
        }
    );

    cout << "\n成绩排名\n";
    cout << left
              << setw(8) << "排名"
              << setw(20) << "姓名"
              << right
              << setw(8) << "成绩"
              << '\n';

    cout << string(36, '-') << '\n';

    for (size_t i = 0; i < students.size(); ++i) {
        cout << left
                  << setw(8) << i + 1
                  << setw(20) << students[i].name
                  << right
                  << setw(8) << students[i].score
                  << '\n';
    }

    cout << fixed << setprecision(2);
    cout << "\n平均分：" << average << '\n';
    cout << "最高分：" << students.front().score << '\n';
    cout << "最低分：" << students.back().score << '\n';
    cout << "及格人数：" << passed << '\n';
    cout << "及格率："
              << 100.0 * passed / students.size()
              << "%\n";

    string target;
    cout << "\n输入要查询的姓名：";
    getline(cin >> ws, target);

    auto result = find_if(
        students.begin(),
        students.end(),
        [&target](const Student& student) {
            return student.name == target;
        }
    );

    if (result != students.end()) {
        cout << result->name
                  << " 的成绩是 "
                  << result->score
                  << '\n';
    } else {
        cout << "没有找到该学生。\n";
    }

    return 0;
}
~~~

可以继续尝试：

1. 把成绩保存到文件，下次启动时自动读取。
2. 增加中位数、方差和各分数段人数。
3. 允许修改或删除某位学生。
4. 使用 unordered_map 加快按姓名查询。
5. 把输入、统计和输出拆分成独立函数。

---

## 12. 如何选择头文件

### 按需求查找

| 我想做什么 | 优先考虑 |
| --- | --- |
| 键盘输入、屏幕输出 | <iostream> |
| 控制小数位数和表格宽度 | <iomanip> |
| 保存和处理文本 | <string> |
| 拆分一行文字 | <sstream> |
| 读写文件 | <fstream> |
| 保存数量会变化的一组元素 | <vector> |
| 保存固定数量的一组元素 | <array> |
| 在头尾频繁添加或删除 | <deque> |
| 后进先出 | <stack> |
| 先进先出 | <queue> |
| 始终取最大值或最小值 | <queue> 中的 priority_queue |
| 自动去重并保持有序 | <set> |
| 快速判断元素是否存在，不需要顺序 | <unordered_set> |
| 键对应值，并按键排序 | <map> |
| 快速通过键查值，不需要顺序 | <unordered_map> |
| 排序、查找、计数、反转 | <algorithm> |
| 求和、连续赋值、内积 | <numeric> |
| 平方根、幂、取整、三角函数 | <cmath> |
| 随机整数或小数 | <random> |
| 测量运行时间 | <chrono> |
| 操作路径和目录 | <filesystem> |
| 表示可能没有结果 | <optional> |
| 自动管理动态对象 | <memory> |

### 推荐的 include 原则

1. 用到哪个标准库功能，就包含它正式所属的头文件。
2. 不依赖其他头文件“顺便”间接包含的内容。
3. 在头文件中尽量只包含真正需要的依赖。
4. 不要在头文件中写 using namespace std;，它会污染所有包含者的命名空间。
5. 对参数和返回值尽量选择能表达所有权和可空性的类型。

### 关于 <bits/stdc++.h>

在部分竞赛环境中经常看到：

~~~cpp
#include <bits/stdc++.h>
using namespace std;
~~~

它会一次性包含大量标准库头文件，写竞赛代码很方便，但它不是 C++ 标准的一部分，主要由 GCC 系列编译器提供。

日常项目和学习笔记中，更推荐明确包含需要的头文件：

~~~cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;
~~~

这样做的好处：

- 代码可以在更多编译器上使用。
- 依赖关系更清楚。
- 减少不必要的编译工作。
- 更容易真正记住每项功能属于哪个头文件。

---

## 总结

最值得优先掌握的头文件是：

1. <iostream>、<iomanip>：输入与输出。
2. <string>、<sstream>：字符串处理。
3. <vector>、<array>：保存一组数据。
4. <map>、<unordered_map>、<set>：关联和去重。
5. <algorithm>、<numeric>：避免重复手写常见算法。
6. <fstream>：文件读写。
7. <cmath>、<random>、<chrono>：数学、随机数与计时。
8. <memory>、<optional>：更安全地表达资源和可选结果。

学习标准库时，不需要一次背完所有函数。先记住“某类问题应去哪一个头文件找工具”，再通过代码补全和文档确认具体接口，效率会更高。



