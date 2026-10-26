# C++ 基础语法

> [!summary] 学习目标
> 本篇按由浅入深的顺序整理 C++ 基础语法重点。学完后应能独立编写简单的控制台程序，读懂常见的数组、函数、指针和结构体代码。

> [!info] 代码约定
> 下文示例默认已包含所需头文件，并在文件开头写有 `using namespace std;`，因此代码中直接使用 `cout`、`cin`、`string` 和 `vector`。

## 目录

- [[#1. C++ 初识|1. C++ 初识]]
  - [[#1.1 第一个 C++ 程序|1.1 第一个 C++ 程序]]
  - [[#1.2 注释|1.2 注释]]
  - [[#1.3 变量与常量|1.3 变量与常量]]
  - [[#1.4 关键字|1.4 关键字]]
  - [[#1.5 标识符命名规则|1.5 标识符命名规则]]
- [[#2. 数据类型|2. 数据类型]]
  - [[#2.1 整型|2.1 整型]]
  - [[#2.2 sizeof 关键字|2.2 sizeof 关键字]]
  - [[#2.3 实型（浮点型）|2.3 实型（浮点型）]]
  - [[#2.4 字符型|2.4 字符型]]
  - [[#2.5 转义字符|2.5 转义字符]]
  - [[#2.6 字符串类型|2.6 字符串类型]]
  - [[#2.7 布尔类型|2.7 布尔类型]]
  - [[#2.8 数据输入|2.8 数据输入]]
  - [[#2.9 类型转换|2.9 类型转换]]
- [[#3. 运算符|3. 运算符]]
  - [[#3.1 算术运算符|3.1 算术运算符]]
  - [[#3.2 赋值运算符|3.2 赋值运算符]]
  - [[#3.3 比较运算符|3.3 比较运算符]]
  - [[#3.4 逻辑运算符|3.4 逻辑运算符]]
  - [[#3.5 递增与递减运算符|3.5 递增与递减运算符]]
- [[#4. 程序流程结构|4. 程序流程结构]]
  - [[#4.1 选择结构|4.1 选择结构]]
  - [[#4.2 循环结构|4.2 循环结构]]
  - [[#4.3 跳转语句|4.3 跳转语句]]
- [[#5. 数组|5. 数组]]
  - [[#5.1 一维数组|5.1 一维数组]]
  - [[#5.2 二维数组|5.2 二维数组]]
- [[#6. 函数|6. 函数]]
  - [[#6.1 函数的定义与调用|6.1 函数的定义与调用]]
  - [[#6.2 函数的常见形式|6.2 函数的常见形式]]
  - [[#6.3 值传递、地址传递与引用传递|6.3 参数传递]]
  - [[#6.4 函数声明与分文件编写|6.4 函数声明与分文件编写]]
- [[#7. 指针|7. 指针]]
  - [[#7.1 指针的定义与使用|7.1 指针的定义与使用]]
  - [[#7.2 指针占用的内存空间|7.2 指针占用的内存空间]]
  - [[#7.3 空指针与野指针|7.3 空指针与野指针]]
  - [[#7.4 const 修饰指针|7.4 const 修饰指针]]
  - [[#7.5 指针、数组与函数|7.5 指针、数组与函数]]
- [[#8. 结构体|8. 结构体]]
  - [[#8.1 结构体的定义与使用|8.1 结构体的定义与使用]]
  - [[#8.2 结构体数组|8.2 结构体数组]]
  - [[#8.3 结构体指针|8.3 结构体指针]]
  - [[#8.4 嵌套结构体|8.4 嵌套结构体]]
  - [[#8.5 结构体作为函数参数|8.5 结构体作为函数参数]]
  - [[#8.6 案例：老师带领学生|8.6 案例：老师带领学生]]
  - [[#8.7 案例：按年龄排序英雄|8.7 案例：按年龄排序英雄]]
- [[#总结|总结]]

---

## 1. C++ 初识

### 1.1 第一个 C++ 程序

一个最简单的 C++ 程序由头文件、`main` 函数和语句组成：

```cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}
```

- `#include <iostream>`：引入输入输出功能。
- `using namespace std;`：允许直接写 `cout`、`cin` 等标准库名称。
- `int main()`：程序入口，程序从这里开始执行。
- `{}`：代码块的范围。
- `cout <<`：向控制台输出内容；`endl`：换行。
- `return 0;`：表示程序正常结束。

### 1.2 注释

注释不会参与执行，用于说明代码意图：

```cpp
// 这是单行注释

/*
   这是多行注释
*/
```

> [!tip] 代码格式
> 建议每层代码块缩进 4 个空格；即使 `if` 或循环中只有一条语句，也保留花括号，后续修改更安全。

### 1.3 变量与常量

#### 变量与初始化

变量是带名字的存储空间，声明时需要给出类型、名称和初始值：

```cpp
int age = 18;
double price = 19.99;
bool isStudent = true;
```

变量声明后可以重新赋值：

```cpp
int score = 60;
score = 85;
```

#### 常量与 auto

常量使用 `const` 声明，创建后不能修改：

```cpp
const double PI = 3.1415926;
const int MAX_SIZE = 100;
```

`auto` 可以根据初始值自动推导类型：

```cpp
auto count = 10;     // int
auto length = 3.14;  // double
```

### 1.4 关键字

`int`、`double`、`if`、`else`、`while`、`return` 等是 C++ 预先保留的关键字，具有固定含义，不能作为变量名、函数名或其他自定义名称。

### 1.5 标识符命名规则

标识符是程序员为变量、函数、结构体等内容起的名字。

标识符可以包含字母、数字和下划线，但不能以数字开头；区分大小写；不要使用关键字。推荐用表达含义的名称：

```cpp
int studentCount;
double averageScore;
```

> [!warning] 初始化
> 声明变量时应尽量初始化。未初始化的局部变量可能保存不确定的值，直接使用会产生难以排查的错误。

## 2. 数据类型

### 2.1 整型

整型用于保存没有小数部分的数。根据需要表示的范围，可以选择 `short`、`int`、`long` 或 `long long`。

| 类型 | 用途 | 常见取值范围 | 示例 |
| --- | --- | --- | --- |
| `short` | 短整数 | -32,768 到 32,767 | `short age = 18;` |
| `int` | 常用整数 | -2,147,483,648 到 2,147,483,647 | `42` |
| `long` | 长整数 | Windows 常见为 -2,147,483,648 到 2,147,483,647 | `100L` |
| `long long` | 更大范围的整数 | 约 -9.22×10¹⁸ 到 9.22×10¹⁸ | `100LL` |

> [!note] 关于取值范围
> 上表是常见实现下的范围。不同系统、编译器和编译选项可能导致类型大小不同；需要确认当前环境时，可以使用 `sizeof`，或包含 `<limits>` 后使用 `numeric_limits<T>::min()` 和 `numeric_limits<T>::max()` 查询。

### 2.2 sizeof 关键字

`sizeof` 用于查看一种类型或一个变量占用多少字节：

```cpp
cout << sizeof(short) << endl;
cout << sizeof(int) << endl;
cout << sizeof(long long) << endl;
```

### 2.3 实型（浮点型）

实型用于保存带小数的数据。`float` 通常保留约 7 位有效数字，`double` 通常保留约 15～16 位有效数字。没有特殊需求时，一般优先使用 `double`。

| 类型 | 常见范围 | 有效数字 | 示例 |
| --- | --- | --- | --- |
| `float` | 约 -3.4×10³⁸ 到 3.4×10³⁸ | 约 7 位 | `3.14f` |
| `double` | 约 -1.7×10³⁰⁸ 到 1.7×10³⁰⁸ | 约 15～16 位 | `3.14159` |

```cpp
float height = 1.75f;
double pi = 3.141592653589793;
```

### 2.4 字符型

`char` 用于保存单个字符。字符使用单引号，字符串使用双引号：

一个 `char` 通常占 1 字节，常见取值范围是 -128 到 127，或 0 到 255；是否带符号取决于编译器实现。

```cpp
char grade = 'A';
string name = "Alice";
```

字符在内存中实际保存的是编码值，因此可以进行简单的整数运算：

```cpp
char letter = 'A';
cout << static_cast<int>(letter) << endl; // 常见输出为 65
```

### 2.5 转义字符

转义字符以反斜杠 `\` 开头，用于表示不能直接输入或具有特殊含义的字符：

| 写法 | 含义 |
| --- | --- |
| `\n` | 换行 |
| `\t` | 水平制表符，常用于对齐 |
| `\\` | 反斜杠本身 |
| `\"` | 双引号 |
| `\'` | 单引号 |

```cpp
cout << "姓名\t成绩\n";
cout << "小明\t90" << endl;
```

### 2.6 字符串类型

C++ 中常用 `string` 保存一段文字。使用前需要包含 `<string>` 头文件：

字符串长度没有固定的语法上限，实际可保存的内容受程序可用内存限制。

```cpp
#include <string>
string greeting = "Hello, C++";
cout << greeting << endl;
```

### 2.7 布尔类型

`bool` 只有 `true` 和 `false` 两种值，常用于保存判断结果：

```cpp
bool isAdult = age >= 18;
cout << isAdult << endl; // true 通常输出 1
```

### 2.8 数据输入

```cpp
string name;
int age;
cin >> name >> age;
cout << name << " 今年 " << age << " 岁" << endl;
```

`cin >>` 会自动跳过空白，但遇到空格会停止；读取一整行文字时使用 `getline`：

```cpp
string sentence;
getline(cin, sentence);
```

如果前面使用过 `cin >>`，输入缓冲区可能残留换行符，可以先清理：

```cpp
cin.ignore();
getline(cin, sentence);
```

可通过判断输入结果检查是否读取成功：

```cpp
int number;
if (cin >> number) {
    cout << "输入成功" << endl;
}
```

### 2.9 类型转换

不同类型参与运算时，编译器有时会自动转换类型。为了让意图清晰，推荐用 `static_cast` 显式转换：

```cpp
int total = 7;
int count = 2;
double wrong = total / count; // 结果是 3
double right = static_cast<double>(total) / count; // 结果是 3.5
```

当两个操作数都是整数时，除法会丢弃小数部分。

## 3. 运算符

运算符用于计算数据、比较数据或修改变量的值。

### 3.1 算术运算符

设 `a = 17`、`b = 5`：

| 运算符 | 含义 | 示例 | 结果 |
| --- | --- | --- | --- |
| `+` | 加法 | `a + b` | `22` |
| `-` | 减法 | `a - b` | `12` |
| `*` | 乘法 | `a * b` | `85` |
| `/` | 除法 | `a / b` | `3` |
| `%` | 取余，得到除法余数 | `a % b` | `2` |

```cpp
int a = 17;
int b = 5;
cout << a + b << endl; // 22
cout << a - b << endl; // 12
cout << a * b << endl; // 85
cout << a / b << endl; // 3
cout << a % b << endl; // 2
```

> [!warning] 整数除法
> 两个整数相除时，`/` 会丢弃小数部分；`%` 只能用于整数。需要小数结果时，至少一个操作数应是浮点数。

### 3.2 赋值运算符

赋值运算符用于把右侧结果保存到左侧变量中。除基本赋值 `=` 外，还可以用复合赋值简化代码：

| 运算符 | 含义 | 等价写法 |
| --- | --- | --- |
| `=` | 直接赋值 | `a = 10` |
| `+=` | 加后赋值 | `a += 2` 等价于 `a = a + 2` |
| `-=` | 减后赋值 | `a -= 2` 等价于 `a = a - 2` |
| `*=` | 乘后赋值 | `a *= 2` 等价于 `a = a * 2` |
| `/=` | 除后赋值 | `a /= 2` 等价于 `a = a / 2` |
| `%=` | 取余后赋值 | `a %= 2` 等价于 `a = a % 2` |

### 3.3 比较运算符

比较结果为 `true` 或 `false`：

| 运算符 | 含义 | 示例 | 结果 |
| --- | --- | --- | --- |
| `==` | 是否相等 | `a == b` | `false` |
| `!=` | 是否不相等 | `a != b` | `true` |
| `>` | 是否大于 | `a > b` | `true` |
| `<` | 是否小于 | `a < b` | `false` |
| `>=` | 是否大于或等于 | `a >= 17` | `true` |
| `<=` | 是否小于或等于 | `b <= 5` | `true` |

### 3.4 逻辑运算符

设 `age = 20`、`hasTicket = true`：

| 运算符  | 含义          | 示例                       | 结果           |           |     |            |        |
| ---- | ----------- | ------------------------ | ------------ | --------- | --- | ---------- | ------ |
| `&&` | 逻辑与：两边都真才为真 | `age >= 18 && hasTicket` | `true`       |           |     |            |        |
| `    |             | `                        | 逻辑或：至少一边真就为真 | `age < 18 |     | hasTicket` | `true` |
| `!`  | 逻辑非：反转真假    | `!hasTicket`             | `false`      |           |     |            |        |

`&&` 和 `||` 会短路求值：`&&` 左边为 `false` 时，右边不会执行；`||` 左边为 `true` 时，右边不会执行。

> [!warning] `=` 与 `==`
> `=` 是赋值，`==` 是相等判断。条件中把 `==` 误写为 `=` 是常见错误。

### 3.5 递增与递减运算符

自增和自减运算符每次只让变量改变 1：`++` 表示加 1，`--` 表示减 1。它们放在变量前面叫前置，放在变量后面叫后置。

关键要分清两件事：

1. **变量最终变成多少**：四种写法都会让 `x` 加 1 或减 1。
2. **这条表达式先拿到什么值**：前置先改变变量再取值，后置先取旧值再改变变量。

| 写法 | 执行顺序 | 如果 `x = 5`，表达式得到的值 | 执行后 `x` |
| --- | --- | --- | --- |
| `++x` | 先让 `x` 加 1，再取值 | `6` | `6` |
| `x++` | 先取 `x` 的旧值，再让 `x` 加 1 | `5` | `6` |
| `--x` | 先让 `x` 减 1，再取值 | `4` | `4` |
| `x--` | 先取 `x` 的旧值，再让 `x` 减 1 | `5` | `4` |

#### 前置示例：先改变，再使用

```cpp
int x = 5;
int y = ++x;
```

执行过程：

1. `x` 先加 1，从 5 变成 6。
2. 把新值 6 交给 `y`。
3. 最终 `x = 6`，`y = 6`。

#### 后置示例：先使用，再改变

```cpp
int x = 5;
int y = x++;
```

执行过程：

1. 先把旧值 5 交给 `y`。
2. `x` 再加 1，变成 6。
3. 最终 `x = 6`，`y = 5`。

同理，`--x` 是“先减后用”，`x--` 是“先用后减”。如果只是单独让变量加 1 或减 1，四种写法的最终结果相同；只有把它放进赋值、输出或其他表达式时，前置和后置的区别才会体现出来。

> [!tip] 推荐写法
> 初学时把自增、自减单独写成一行，例如 `++x;` 或 `x--;`。不要在一条复杂表达式中多次修改同一个变量，这样更清晰，也更不容易出错。

## 4. 程序流程结构

### 4.1 选择结构

#### 4.1.1 if、else if 与 else

```cpp
int score = 85;
if (score >= 90) {
    cout << "优秀" << endl;
} else if (score >= 60) {
    cout << "及格" << endl;
} else {
    cout << "不及格" << endl;
}
```

`if` 用于单条件判断，`else if` 用于多个互斥条件，`else` 处理前面所有条件都不满足的情况。嵌套 `if` 适合“满足外层条件后，再判断内层条件”的场景。

#### 4.1.2 三目运算符

三目运算符是简短的条件表达式：

```cpp
int a = 10;
int b = 20;
int maxValue = a > b ? a : b;
```

语法是 `条件 ? 条件为真时的结果 : 条件为假时的结果`。简单二选一可以使用；逻辑复杂时使用 `if` 更清晰。

#### 4.1.3 switch 语句

```cpp
int day = 2;
switch (day) {
    case 1:
        cout << "星期一" << endl;
        break;
    case 2:
        cout << "星期二" << endl;
        break;
    default:
        cout << "未知日期" << endl;
        break;
}
```

`switch` 适合根据一个整数或字符的固定取值分支。`break` 用于结束当前分支；缺少它会继续执行下一个 `case`，称为贯穿执行。

#### 4.1.4 案例：三只小猪称体重

**题目：** 输入三只小猪的体重，输出最重的一只。

**思路：** 先假设第一只最重，再依次与第二只、第三只比较并更新最大值。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    int a, b, c;
    cout << "请输入三只小猪的体重：";
    cin >> a >> b >> c;

    int maxWeight = a;
    if (b > maxWeight) {
        maxWeight = b;
    }
    if (c > maxWeight) {
        maxWeight = c;
    }

    cout << "最重的体重是：" << maxWeight << endl;
    return 0;
}
```

输入 `100 150 120` 时，输出为 `最重的体重是：150`。

### 4.2 循环结构

#### 4.2.1 while 循环

当循环次数不确定、只要条件成立就继续时，常使用 `while`：

```cpp
int count = 3;
while (count > 0) {
    cout << count << endl;
    --count;
}
```

#### 4.2.2 案例：猜数字

**题目：** 程序生成 1～100 的随机数，用户不断猜测，直到猜中为止。

**思路：** 使用 `while` 重复输入；猜大了就缩小，猜小了就增大。

```cpp
#include <cstdlib>
#include <ctime>
#include <iostream>
using namespace std;

int main() {
    srand(static_cast<unsigned int>(time(nullptr)));
    int target = rand() % 100 + 1;
    int guess = 0;

    while (guess != target) {
        cout << "请输入 1～100 的数字：";
        cin >> guess;

        if (guess > target) {
            cout << "猜大了" << endl;
        } else if (guess < target) {
            cout << "猜小了" << endl;
        } else {
            cout << "恭喜你，猜对了" << endl;
        }
    }
    return 0;
}
```

`rand() % 100` 得到 0～99，再加 1 得到 1～100。`srand` 用当前时间设置随机种子，使每次运行的结果更可能不同。

#### 4.2.3 do...while 循环

`do...while` 会先执行一次循环体，再判断条件：

```cpp
int choice;
do {
    cin >> choice;
} while (choice != 0 && choice != 1);
```

#### 4.2.4 案例：水仙花数

**题目：** 找出所有三位水仙花数。水仙花数满足：百位、十位、个位的立方和等于原数。

```cpp
#include <iostream>
using namespace std;

int main() {
    int number = 100;
    do {
        int hundreds = number / 100;
        int tens = number / 10 % 10;
        int ones = number % 10;

        if (hundreds * hundreds * hundreds +
            tens * tens * tens +
            ones * ones * ones == number) {
            cout << number << " ";
        }
        ++number;
    } while (number < 1000);

    return 0;
}
```

输出为：`153 370 371 407`。

#### 4.2.5 for 循环与嵌套循环

```cpp
for (int i = 0; i < 5; ++i) {
    cout << i << endl;
}
```

`for` 的三个部分依次是初始化、循环条件和每轮结束后的操作。嵌套循环通常用于表格、矩阵和乘法口诀表：

```cpp
for (int i = 1; i <= 9; ++i) {
    for (int j = 1; j <= i; ++j) {
        cout << j << " * " << i << " = " << i * j << "	";
    }
    cout << endl;
}
```

#### 4.2.6 案例：敲桌子

**题目：** 从 1 数到 100，数字中含 7、是 7 的倍数或个位是 7 时输出“敲桌子”。

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int number = 1; number <= 100; ++number) {
        bool isMultiple = number % 7 == 0;
        bool onesHasSeven = number % 10 == 7;
        bool tensHasSeven = number / 10 == 7;

        if (isMultiple || onesHasSeven || tensHasSeven) {
            cout << "敲桌子" << endl;
        } else {
            cout << number << endl;
        }
    }
    return 0;
}
```

三个条件之间使用逻辑或 `||`，只要有一个条件成立就执行“敲桌子”。

#### 4.2.7 案例：九九乘法表

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int row = 1; row <= 9; ++row) {
        for (int column = 1; column <= row; ++column) {
            cout << column << "×" << row << "="
                 << column * row << "\t";
        }
        cout << endl;
    }
    return 0;
}
```

外层循环控制行数，内层循环控制每行打印多少个算式。内层条件 `column <= row` 让第几行恰好输出几个算式。

### 4.3 跳转语句

#### 4.3.1 break、continue 与 goto

- `break`：立即结束当前循环或 `switch`。
- `continue`：跳过当前这一次循环的剩余语句，进入下一轮。
- `goto`：直接跳转到同一函数中的标签位置。

```cpp
for (int i = 1; i <= 10; ++i) {
    if (i == 5) {
        continue;
    }
    if (i == 8) {
        break;
    }
    cout << i << endl;
}

goto END;
cout << "这行不会执行" << endl;
END:
cout << "结束" << endl;
```

> [!warning] goto
> `goto` 能实现跳转，但会破坏正常的控制流程。初学时了解其语法即可，实际代码中应优先使用函数、条件和循环。

## 5. 数组

### 5.1 一维数组

数组是一组相同类型、连续存放的数据。数组长度在定义后固定，下标从 0 开始：

```cpp
int scores[5] = {90, 85, 78, 92, 88};
cout << scores[0] << endl; // 90
```

常见定义方式：

```cpp
int arr1[5];
int arr2[5] = {1, 2, 3, 4, 5};
int arr3[] = {1, 2, 3};
```

数组名在大多数表达式中会表示首元素地址；`sizeof(arr)` 可以得到整个数组的字节数。元素个数可写为：

```cpp
int length = sizeof(scores) / sizeof(scores[0]);
```

> [!warning] 数组越界
> `scores[5]` 已经越界，因为合法下标是 0 到 4。越界访问可能不报错，但会导致不可预测的问题。

#### 5.1.1 遍历、最大值与逆置

**遍历数组：** 按下标依次访问每个元素。

```cpp
int arr[] = {5, 2, 9, 1, 7};
int length = sizeof(arr) / sizeof(arr[0]);
int maxValue = arr[0];

for (int i = 0; i < length; ++i) {
    if (arr[i] > maxValue) {
        maxValue = arr[i];
    }
}

cout << "最大值：" << maxValue << endl; // 9
```

**数组逆置思路：**

1. 设置左下标指向第一个元素，右下标指向最后一个元素。
2. 交换左右两端元素。
3. 左下标右移，右下标左移。
4. 两个下标相遇时结束。

```cpp
for (int left = 0, right = length - 1; left < right; ++left, --right) {
    int temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
}
```

逆置前为 `{5, 2, 9, 1, 7}`，逆置后为 `{7, 1, 9, 2, 5}`。

#### 5.1.2 冒泡排序

冒泡排序会反复比较相邻元素，将较大的元素逐步移动到后面：

```cpp
int arr[] = {4, 2, 8, 0, 5, 7, 1, 3, 9};
int length = sizeof(arr) / sizeof(arr[0]);

for (int i = 0; i < length - 1; ++i) {
    for (int j = 0; j < length - 1 - i; ++j) {
        if (arr[j] > arr[j + 1]) {
            int temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}
```

它便于理解双层循环和交换操作，但数据量大时效率不高。

**排序过程：** 外层循环决定排序轮数；内层循环比较相邻元素。每完成一轮，当前未排序部分中最大的元素会移动到末尾，因此下一轮可以少比较一次。

排序后的数组为 `{0, 1, 2, 3, 4, 5, 7, 8, 9}`。

### 5.2 二维数组

#### 5.2.1 定义与访问

二维数组可以理解为“数组中的每个元素还是数组”，常用于表格或矩阵数据：

```cpp
int scores[3][2] = {
    {90, 80},
    {85, 95},
    {70, 88}
};
```

访问时第一个下标表示行，第二个下标表示列：

```cpp
cout << scores[1][0] << endl; // 85
```

#### 5.2.2 遍历与行列数量

遍历二维数组通常使用嵌套循环：

```cpp
for (int i = 0; i < 3; ++i) {
    for (int j = 0; j < 2; ++j) {
        cout << scores[i][j] << " ";
    }
    cout << endl;
}
```

二维数组的行数为 `sizeof(scores) / sizeof(scores[0])`，列数为 `sizeof(scores[0]) / sizeof(scores[0][0])`。

#### 5.2.3 案例：考试成绩统计

**题目：** 三名学生各有三门成绩，计算并输出每名学生的总分。

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string names[3] = {"张三", "李四", "王五"};
    int scores[3][3] = {
        {100, 100, 100},
        {90, 50, 100},
        {60, 70, 80}
    };

    for (int row = 0; row < 3; ++row) {
        int total = 0;
        for (int column = 0; column < 3; ++column) {
            total += scores[row][column];
        }
        cout << names[row] << "的总分是：" << total << endl;
    }
    return 0;
}
```

输出结果：

```text
张三的总分是：300
李四的总分是：240
王五的总分是：210
```

外层循环每次处理一名学生，内层循环累加该学生所在行的全部成绩。每开始处理新的一行，都要把 `total` 重新设为 0。

## 6. 函数

### 6.1 函数的定义与调用

函数用于封装可复用逻辑。一个函数由返回类型、函数名、参数列表和函数体组成：

```cpp
返回值类型 函数名(参数列表) {
    函数体;
    return 返回值;
}
```

```cpp
int add(int a, int b) {
    return a + b;
}

int result = add(2, 3);
```

- `int`：函数返回值的类型。
- `add`：函数名，调用函数时使用这个名字。
- `int a, int b`：形式参数，用来接收调用者传入的数据。
- `return a + b`：结束函数，并把计算结果交还给调用位置。
- `add(2, 3)`：函数调用，`2` 和 `3` 是实际参数。

调用后 `result` 的值为 `5`。

### 6.2 函数的常见形式

函数可以有返回值，也可以没有返回值；可以有参数，也可以没有参数：

```cpp
void sayHello() {
    cout << "Hello" << endl;
}

int getNumber() {
    return 10;
}

void printNumber(int number) {
    cout << number << endl;
}
```

| 参数 | 返回值 | 示例 | 用途 |
| --- | --- | --- | --- |
| 无 | 无 | `void sayHello()` | 只执行一项操作 |
| 无 | 有 | `int getNumber()` | 生成或取得一个结果 |
| 有 | 无 | `void printNumber(int n)` | 使用传入的数据执行操作 |
| 有 | 有 | `int add(int a, int b)` | 根据参数计算并返回结果 |

### 6.3 值传递、地址传递与引用传递

值传递会复制实参，函数内修改副本不会影响原变量：

```cpp
void changeValue(int value) {
    value = 100;
}
```

调用 `changeValue(number)` 后，原来的 `number` 不会改变，因为函数修改的是副本。

使用指针参数可以通过地址修改原变量：

```cpp
void changeByPointer(int* value) {
    *value = 100;
}
```

调用时需要传入地址：`changeByPointer(&number);`。函数通过解引用找到原变量，因此原变量会变成 100。

引用传递写法更简洁，也可以修改原变量：

```cpp
void changeByReference(int& value) {
    value = 100;
}
```

调用引用参数时仍写 `changeByReference(number);`，不需要在调用处写取地址符。

只读且不想复制较大对象时，使用 `const` 引用：

```cpp
void printName(const string& name) {
    cout << name << endl;
}
```

### 6.4 函数声明与分文件编写

如果函数定义在调用位置之后，需要先声明：

```cpp
int multiply(int a, int b);
```

较大的程序通常将声明放入头文件，将定义放入源文件。例如：

```cpp
// swap.h
void swapNumber(int& a, int& b);

// swap.cpp
#include "swap.h"
void swapNumber(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

// main.cpp
#include <iostream>
#include "swap.h"
using namespace std;

int main() {
    int a = 10;
    int b = 20;
    swapNumber(a, b);
    cout << a << " " << b << endl; // 20 10
    return 0;
}
```

头文件负责声明“有什么可以用”，源文件负责定义“具体怎么做”。

## 7. 指针

### 7.1 指针的定义与使用

指针保存的是对象在内存中的地址。

```cpp
int value = 10;
int* ptr = &value;
cout << &value << endl; // value 的地址
cout << *ptr << endl;   // 通过地址得到 10
```

- `&value`：取地址。
- `int* ptr`：声明一个指向 `int` 的指针。
- `*ptr`：解引用，访问指针指向的对象。

指针变量本身占用的空间与所指向的数据类型无关，在同一平台上通常大小相同。

### 7.2 指针占用的内存空间

指针变量用于保存地址。在同一运行平台上，不同类型的指针通常占用相同大小：32 位程序通常为 4 字节，64 位程序通常为 8 字节。可以使用 `sizeof(ptr)` 查看当前环境中的实际大小。

### 7.3 空指针与野指针

空指针不指向任何对象：

```cpp
int* ptr = nullptr;
if (ptr != nullptr) {
    cout << *ptr << endl;
}
```

野指针是未初始化或指向无效地址的指针。不要解引用空指针或野指针。

### 7.4 const 修饰指针

`const` 的位置不同，限制也不同：

```cpp
const int* p1 = &value;       // 不能通过 p1 修改 value
int* const p2 = &value;       // p2 不能改指向其他地址
const int* const p3 = &value; // 两者都不能修改
```

可以使用“看 `const` 在星号哪一边”的方法记忆：

| 写法 | 指针指向的数据 | 指针本身的指向 |
| --- | --- | --- |
| `const int* p` | 不可通过 `p` 修改 | 可以改变 |
| `int* const p` | 可以修改 | 不可以改变 |
| `const int* const p` | 不可修改 | 不可以改变 |

### 7.5 指针、数组与函数

数组名常可当作首元素地址使用：

```cpp
int arr[] = {10, 20, 30};
int* p = arr;
cout << *p << endl;       // 10
cout << *(p + 1) << endl; // 20
```

将数组传入函数时，通常传入首元素地址和元素数量：

```cpp
void printArray(const int* arr, int length) {
    for (int i = 0; i < length; ++i) {
        cout << arr[i] << " ";
    }
}
```

#### 7.5.1 案例：通过指针交换两个数

```cpp
#include <iostream>
using namespace std;

void swapNumber(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int first = 10;
    int second = 20;
    swapNumber(&first, &second);
    cout << first << " " << second << endl;
    return 0;
}
```

输出为 `20 10`。形参 `a` 和 `b` 保存实参地址，`*a` 和 `*b` 才代表地址中的原始变量。

## 8. 结构体

### 8.1 结构体的定义与使用

结构体可以将多个相关但类型可能不同的数据组合为一个新类型：

```cpp
struct Student {
    string name;
    int age;
    int score;
};

Student student = {"小明", 18, 90};
cout << student.name << endl;
```

`struct Student` 定义了一种新的数据类型；`student` 是根据该类型创建的变量。普通结构体变量使用点号 `.` 访问成员，例如 `student.age`。

### 8.2 结构体数组

```cpp
Student students[3] = {
    {"小明", 18, 90},
    {"小红", 19, 95},
    {"小刚", 18, 88}
};

for (int i = 0; i < 3; ++i) {
    cout << students[i].name << "：" << students[i].score << endl;
}
```

### 8.3 结构体指针

通过结构体指针访问成员时使用 `->`：

```cpp
Student* p = &student;
cout << p->name << endl;
```

`p->name` 等价于 `(*p).name`。使用箭头运算符可以更方便地通过指针访问结构体成员。

### 8.4 嵌套结构体

结构体中还可以包含另一个结构体：

```cpp
struct Teacher {
    string name;
    int id;
};

struct ClassRoom {
    string roomName;
    Teacher teacher;
};
```

### 8.5 结构体作为函数参数

传递结构体会产生复制；只读取时使用 `const` 引用可避免复制并防止误修改：

```cpp
void printStudent(const Student& student) {
    cout << student.name << "：" << student.score << endl;
}
```

`const Student&` 同时实现两件事：引用避免复制整个结构体，`const` 防止函数意外修改原对象。

### 8.6 案例：老师带领学生

**题目：** 创建三名老师，每名老师带领五名学生，为老师和学生设置姓名与分数并输出。

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Student {
    string name;
    int score;
};

struct Teacher {
    string name;
    Student students[5];
};

void createData(Teacher teachers[], int teacherCount) {
    string nameSeed = "ABCDE";

    for (int i = 0; i < teacherCount; ++i) {
        teachers[i].name = "老师_";
        teachers[i].name += nameSeed[i];

        for (int j = 0; j < 5; ++j) {
            teachers[i].students[j].name = "学生_";
            teachers[i].students[j].name += nameSeed[j];
            teachers[i].students[j].score = 60 + i * 5 + j;
        }
    }
}

void printData(const Teacher teachers[], int teacherCount) {
    for (int i = 0; i < teacherCount; ++i) {
        cout << teachers[i].name << endl;
        for (int j = 0; j < 5; ++j) {
            cout << "  " << teachers[i].students[j].name
                 << "，分数：" << teachers[i].students[j].score
                 << endl;
        }
    }
}

int main() {
    Teacher teachers[3];
    int count = sizeof(teachers) / sizeof(teachers[0]);
    createData(teachers, count);
    printData(teachers, count);
    return 0;
}
```

这个案例综合使用了嵌套结构体、结构体数组、数组作为函数参数和双层循环。

### 8.7 案例：按年龄排序英雄

**题目：** 使用结构体保存五名英雄的姓名、年龄和性别，并按年龄升序排列。

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Hero {
    string name;
    int age;
    string gender;
};

void sortHeroes(Hero heroes[], int length) {
    for (int i = 0; i < length - 1; ++i) {
        for (int j = 0; j < length - 1 - i; ++j) {
            if (heroes[j].age > heroes[j + 1].age) {
                Hero temp = heroes[j];
                heroes[j] = heroes[j + 1];
                heroes[j + 1] = temp;
            }
        }
    }
}

void printHeroes(const Hero heroes[], int length) {
    for (int i = 0; i < length; ++i) {
        cout << heroes[i].name << "，年龄：" << heroes[i].age
             << "，性别：" << heroes[i].gender << endl;
    }
}

int main() {
    Hero heroes[5] = {
        {"刘备", 23, "男"},
        {"关羽", 22, "男"},
        {"张飞", 20, "男"},
        {"赵云", 21, "男"},
        {"貂蝉", 19, "女"}
    };

    int length = sizeof(heroes) / sizeof(heroes[0]);
    sortHeroes(heroes, length);
    printHeroes(heroes, length);
    return 0;
}
```

这里仍然使用冒泡排序，但交换的不再是整数，而是完整的 `Hero` 结构体对象。

## 总结

本篇按照 C++ 基础入门的学习顺序，依次讲解了以下八个部分：

1. **C++ 初识**：程序结构、注释、变量、常量、关键字和命名。
2. **数据类型**：整型、实型、字符、字符串、布尔值、输入和类型转换。
3. **运算符**：算术、递增递减、赋值、比较和逻辑运算。
4. **程序流程结构**：选择、循环、嵌套循环和跳转语句。
5. **数组**：一维数组、二维数组、逆置、排序和成绩统计。
6. **函数**：定义、调用、参数传递、声明和分文件编写。
7. **指针**：地址、解引用、空指针、野指针、const、数组和函数。
8. **结构体**：定义、数组、指针、嵌套、函数参数和综合案例。

> [!tip] 学习顺序
> 建议先理解语法示例，再独立完成每章案例。遇到错误时优先查看编译器提示，并检查分号、括号、变量类型、数组下标和指针是否有效。
