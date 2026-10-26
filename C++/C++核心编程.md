# C++ 核心编程

> [!summary] 学习目标
> 本篇对应黑马程序员 C++ 教程“核心编程”第 1～64 讲（合集 P84～P146），重点理解内存模型、引用、函数提高、面向对象三大特性以及文件操作。完成学习后，应能设计有清晰生命周期的类，并使用封装、继承和多态组织中等规模程序。

> [!info] 视频与代码约定
> 视频范围：[黑马程序员 C++ 教程 P84～P146](https://www.bilibili.com/video/BV1et411b73Z/?p=84)。下文示例以课程讲解为主，默认使用 `#include <iostream>` 和 `using namespace std;`；涉及字符串、文件或其他组件时会单独列出头文件。

> [!important] 本篇主线
> ==对象的生命周期与资源管理== 是核心编程的主线。内存分区解释“数据放在哪里”，构造与析构解释“对象何时建立和销毁”，拷贝控制解释“资源如何复制”，继承与多态解释“不同对象如何通过统一接口协作”。

## 目录

- [[#1. 内存分区模型|1. 内存分区模型]]
  - [[#1.1 程序运行前：代码区与全局区|1.1 代码区与全局区]]
  - [[#1.2 程序运行后：栈区与堆区|1.2 栈区与堆区]]
  - [[#1.3 new 与 delete|1.3 new 与 delete]]
- [[#2. 引用|2. 引用]]
  - [[#2.1 引用的基本语法与注意事项|2.1 基本语法]]
  - [[#2.2 引用作为函数参数|2.2 引用作为函数参数]]
  - [[#2.3 引用作为函数返回值|2.3 引用作为函数返回值]]
  - [[#2.4 引用的本质与常量引用|2.4 引用本质与常量引用]]
- [[#3. 函数提高|3. 函数提高]]
  - [[#3.1 默认参数与占位参数|3.1 默认参数与占位参数]]
  - [[#3.2 函数重载|3.2 函数重载]]
- [[#4. 类和对象|4. 类和对象]]
  - [[#4.1 封装|4.1 封装]]
  - [[#4.2 对象的初始化和清理|4.2 对象的初始化和清理]]
  - [[#4.3 对象模型与 this 指针|4.3 对象模型与 this 指针]]
  - [[#4.4 友元|4.4 友元]]
  - [[#4.5 运算符重载|4.5 运算符重载]]
  - [[#4.6 继承|4.6 继承]]
  - [[#4.7 多态|4.7 多态]]
- [[#5. 文件操作|5. 文件操作]]
  - [[#5.1 文本文件|5.1 文本文件]]
  - [[#5.2 二进制文件|5.2 二进制文件]]
- [[#6. 总结与复习清单|6. 总结与复习清单]]

---

## 1. 内存分区模型

C++ 程序在执行时，可以从教学角度把内存划分为四个区域：

| 区域 | 主要内容 | 管理者 | 典型生命周期 |
| --- | --- | --- | --- |
| 代码区 | 编译后的机器指令 | 操作系统 | 程序运行期间 |
| 全局区 | 全局变量、静态变量、常量 | 操作系统 | 程序开始到结束 |
| 栈区 | 函数参数、局部变量等 | 编译器 | 所在作用域结束 |
| 堆区 | 动态申请的数据 | 程序员 | `delete` 或程序结束 |

> [!note] 模型的作用
> “四区”是便于入门的逻辑模型。真实系统还会有只读数据段、线程栈、动态库映射等更细的区域，但不影响本阶段理解变量生命周期。

### 1.1 程序运行前：代码区与全局区

#### 代码区

代码区存放函数体编译后的二进制指令，通常具有以下特点：

- **共享**：频繁执行的程序只需在内存中保留一份代码。
- **只读**：防止程序意外修改自身指令。

#### 全局区

全局变量、静态变量和常量通常放在全局区，它们在程序结束后由操作系统释放。

```cpp
#include <iostream>
using namespace std;

int globalValue = 10;
const int globalConst = 20;

int main() {
    static int staticValue = 30;
    const int localConst = 40;
    cout << &globalValue << endl;
    cout << &staticValue << endl;
    cout << &globalConst << endl;
    cout << &localConst << endl;
    return 0;
}
```

从概念上可进一步区分：

- **全局/静态存储区**：全局变量、`static` 变量。
- **常量存储区**：字符串常量和通常具有静态存储期的全局常量。
- 局部 `const` 变量仍是局部对象，通常随所在作用域结束。

> [!warning] 不要用地址距离判断标准结论
> 视频通过打印地址帮助观察现象，但地址的具体数值、排列顺序由编译器、系统和构建方式决定。应记住的是**存储期和生命周期**，而不是地址大小。

### 1.2 程序运行后：栈区与堆区

#### 栈区

栈区数据由编译器自动分配和释放，常见内容包括函数参数和普通局部变量。

```cpp
int* badAddress() {
    int value = 10;
    return &value;  // 错误：返回局部变量地址
}
```

`value` 在函数结束时已经销毁，返回的指针成为==悬空指针==。继续解引用属于未定义行为。

> [!danger] 必须掌握
> 不要返回局部变量的地址，也不要返回局部变量的引用。即使某次运行“还能读到原值”，程序仍然是错误的。

#### 堆区

堆区数据由程序员使用 `new` 申请、使用 `delete` 释放。

```cpp
int* createValue() {
    int* p = new int(10);
    return p;
}

int main() {
    int* p = createValue();
    cout << *p << endl;
    delete p;
    p = nullptr;
    return 0;
}
```

指针变量 `p` 本身可以位于栈区，但它保存的地址指向堆区对象。函数返回后，堆区对象仍存在，直到被释放。

### 1.3 new 与 delete

#### 申请和释放单个对象

```cpp
int* p = new int(10);
cout << *p << endl;

delete p;
p = nullptr;
```

`new T(value)` 创建一个 `T` 类型对象并返回指针；`delete` 调用对象的析构函数并释放对应存储。

#### 申请和释放数组

```cpp
int* values = new int[10];

for (int i = 0; i < 10; ++i) {
    values[i] = i + 100;
}

delete[] values;
values = nullptr;
```

| 申请方式 | 正确释放方式 |
| --- | --- |
| `new T` | `delete p` |
| `new T[n]` | `delete[] p` |

> [!warning] 动态内存常见错误
> - 忘记释放：造成内存泄漏。
> - 重复释放：产生未定义行为。
> - `new[]` 与 `delete` 混用：产生未定义行为。
> - 释放后继续访问：形成悬空指针。

> [!tip] 现代 C++ 补充
> 实际项目优先让对象自动管理资源，例如使用 `std::vector` 代替动态数组，使用 `std::unique_ptr` 或 `std::shared_ptr` 表达所有权。直接使用 `new`/`delete` 仍需理解，因为它们是构造、析构和智能指针的基础。

---

## 2. 引用

引用是变量的==别名==。建立引用后，对引用的操作就是对原变量的操作。

### 2.1 引用的基本语法与注意事项

```cpp
int value = 10;
int& ref = value;

ref = 20;
cout << value << endl;  // 20
```

引用的基本规则：

1. 引用声明时必须初始化。
2. 引用一旦绑定，就不能改为另一个对象的别名。
3. 引用的类型应与被引用对象相容。

```cpp
int a = 10;
int b = 20;
int& ref = a;

ref = b;  // 不是重新绑定；等价于 a = b
```

> [!note] 引用不是独立对象
> 语法上可以把引用理解成别名。编译器在很多场景下会使用指针实现引用，但 C++ 标准没有要求引用必须以某一种固定方式存储。

### 2.2 引用作为函数参数

引用传递可让函数直接修改实参，而且调用形式比地址传递更自然。

```cpp
void swapByReference(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int main() {
    int x = 10;
    int y = 20;
    swapByReference(x, y);
    cout << x << ", " << y << endl;
    return 0;
}
```

| 传递方式 | 函数能否修改实参 | 是否复制对象 | 调用形式 |
| --- | --- | --- | --- |
| 值传递 `T value` | 否 | 是 | `func(x)` |
| 指针传递 `T* p` | 是 | 复制指针 | `func(&x)` |
| 引用传递 `T& ref` | 是 | 否 | `func(x)` |
| 常量引用 `const T& ref` | 否 | 否 | `func(x)` |

大型对象只读传入时，优先使用常量引用：

```cpp
void printName(const string& name) {
    cout << name << endl;
}
```

### 2.3 引用作为函数返回值

函数可以返回引用，但被引用对象必须在函数结束后仍然有效。

#### 错误：返回局部变量引用

```cpp
int& badResult() {
    int value = 10;
    return value;  // 错误：value 即将销毁
}
```

#### 可行：返回生命周期足够长的对象

```cpp
int& counter() {
    static int value = 0;
    return value;
}

int main() {
    counter() = 100;
    cout << counter() << endl;
    return 0;
}
```

返回引用的函数调用可以作为左值，是因为表达式代表原对象本身。

> [!warning] 生命周期优先
> 判断能否返回引用时，先问：“函数返回后，这个对象还存在吗？”静态对象、全局对象或由调用者拥有的对象可以满足条件；普通局部变量不可以。

### 2.4 引用的本质与常量引用

课程中把引用的本质描述为“编译器内部维护的指针常量”，这有助于理解它为何不能重新绑定：

```cpp
int value = 10;
int& ref = value;

// 可类比理解为：
// int* const hidden = &value;
```

但在语言层面仍应把引用当作别名使用，不应依赖其底层表示。

#### 常量引用

```cpp
const int& ref = 10;
cout << ref << endl;
```

普通引用不能直接绑定到字面量，但常量引用可以。编译器会创建临时对象，并让引用绑定到该对象；引用存在期间不能通过它修改数据。

常量引用常用于函数形参：

```cpp
void showValue(const int& value) {
    cout << value << endl;
    // value = 100;  // 错误：不能修改
}
```

> [!important] 选择参数类型
> 小型数值通常直接值传递；需要修改调用者对象时使用 `T&`；大型对象只读时使用 `const T&`。不要为了“看起来高级”而把所有参数都写成引用。

---

## 3. 函数提高

### 3.1 默认参数与占位参数

#### 默认参数

函数形参可以设置默认值。调用时未传入对应实参，就使用默认值。

```cpp
int add(int a, int b = 20, int c = 30) {
    return a + b + c;
}

cout << add(10) << endl;          // 60
cout << add(10, 40) << endl;      // 80
cout << add(10, 40, 50) << endl;  // 100
```

规则：

- 某个位置出现默认参数后，其右侧参数也必须有默认值。
- 函数声明和定义只能有一处提供默认值，通常放在头文件中的声明处。
- 调用时传入的实参会覆盖默认值。

```cpp
int add(int a, int b = 20);  // 声明处提供默认值

int add(int a, int b) {      // 定义处不再重复
    return a + b;
}
```

#### 占位参数

形参可以只有类型而没有名称：

```cpp
void printValue(int value, int) {
    cout << value << endl;
}

printValue(10, 20);
```

占位参数调用时仍须传值，也可以设置默认值。它常见于兼容旧接口或特定运算符重载；普通业务函数中应避免无意义参数。

### 3.2 函数重载

同一作用域中，函数名相同但参数列表不同，可以构成函数重载。

```cpp
void print(int value) {
    cout << "int: " << value << endl;
}

void print(double value) {
    cout << "double: " << value << endl;
}

void print(int value, int times) {
    for (int i = 0; i < times; ++i) {
        cout << value << endl;
    }
}
```

可用于区分重载的因素：

- 参数数量不同。
- 参数类型不同。
- 参数顺序不同。
- 成员函数的 `const` 限定不同。

不能只靠返回值类型区分：

```cpp
// int getValue();
// double getValue();  // 错误：调用处无法仅凭返回值选择
```

#### 引用重载

```cpp
void func(int& value) {
    cout << "普通引用" << endl;
}

void func(const int& value) {
    cout << "常量引用" << endl;
}
```

普通变量优先匹配 `int&`；常量和临时值只能匹配 `const int&`。

#### 默认参数导致的歧义

```cpp
void func(int a);
void func(int a, int b = 10);

// func(10);  // 错误：两个重载都能匹配
```

> [!warning] 重载的目标
> 重载用于表达“同一种操作作用于不同参数”。如果函数行为完全不同，仅仅复用同一个名字会降低可读性。

---

## 4. 类和对象

面向对象的三大特性是 ==封装、继承、多态==。类描述一类对象共同拥有的属性和行为，对象是类的具体实例。

### 4.1 封装

#### 属性和行为作为整体

```cpp
#include <iostream>
#include <string>
using namespace std;

class Student {
public:
    string name;
    int id;

    void showInfo() const {
        cout << "姓名：" << name << "，学号：" << id << endl;
    }
};

int main() {
    Student student;
    student.name = "张三";
    student.id = 1001;
    student.showInfo();
    return 0;
}
```

封装的意义：

1. 将属性和操作属性的行为放在一个整体中。
2. 通过访问权限控制哪些细节可以被外部使用。

#### 访问权限

| 权限 | 类内 | 子类 | 类外 |
| --- | --- | --- | --- |
| `public` | 可以 | 可以 | 可以 |
| `protected` | 可以 | 可以 | 不可以 |
| `private` | 可以 | 不可以直接访问 | 不可以 |

`class` 默认成员权限为 `private`，`struct` 默认成员权限为 `public`；除此之外，两者都可以定义成员函数、构造函数和继承关系。

#### 成员属性私有化

```cpp
class Person {
public:
    void setName(const string& name) {
        m_Name = name;
    }

    const string& getName() const {
        return m_Name;
    }

    void setAge(int age) {
        if (age >= 0 && age <= 150) {
            m_Age = age;
        }
    }

    int getAge() const {
        return m_Age;
    }

private:
    string m_Name;
    int m_Age = 0;
};
```

私有属性可以控制读写权限，并在赋值前验证数据，维护对象始终处于有效状态。

#### 案例：立方体类

要求计算立方体面积和体积，并判断两个立方体是否相同。

```cpp
#include <iostream>
using namespace std;

class Cube {
public:
    void setLength(double length) { m_Length = length; }
    void setWidth(double width) { m_Width = width; }
    void setHeight(double height) { m_Height = height; }

    double getLength() const { return m_Length; }
    double getWidth() const { return m_Width; }
    double getHeight() const { return m_Height; }

    double area() const {
        return 2 * (m_Length * m_Width
                  + m_Length * m_Height
                  + m_Width * m_Height);
    }

    double volume() const {
        return m_Length * m_Width * m_Height;
    }

    bool isSame(const Cube& other) const {
        return m_Length == other.m_Length
            && m_Width == other.m_Width
            && m_Height == other.m_Height;
    }

private:
    double m_Length = 0;
    double m_Width = 0;
    double m_Height = 0;
};

int main() {
    Cube first;
    first.setLength(10);
    first.setWidth(10);
    first.setHeight(10);

    Cube second;
    second.setLength(10);
    second.setWidth(10);
    second.setHeight(10);

    cout << first.area() << endl;
    cout << first.volume() << endl;
    cout << boolalpha << first.isSame(second) << endl;
    return 0;
}
```

#### 案例：点和圆的关系

这个案例用于练习类的拆分、对象作为成员以及成员函数设计。

```cpp
#include <iostream>
using namespace std;

class Point {
public:
    Point(double x = 0, double y = 0) : m_X(x), m_Y(y) {}
    double getX() const { return m_X; }
    double getY() const { return m_Y; }

private:
    double m_X;
    double m_Y;
};

class Circle {
public:
    Circle(const Point& center, double radius)
        : m_Center(center), m_Radius(radius) {}

    bool contains(const Point& point) const {
        double dx = point.getX() - m_Center.getX();
        double dy = point.getY() - m_Center.getY();
        double distanceSquared = dx * dx + dy * dy;
        double radiusSquared = m_Radius * m_Radius;
        return distanceSquared <= radiusSquared;
    }

private:
    Point m_Center;
    double m_Radius;
};

int main() {
    Circle circle(Point(10, 0), 10);
    Point point(10, 10);
    cout << boolalpha << circle.contains(point) << endl;
    return 0;
}
```

实际项目中通常把每个类的声明放入头文件，实现放入对应的源文件，以减少耦合并便于复用。

### 4.2 对象的初始化和清理

#### 构造函数和析构函数

构造函数在创建对象时调用，用于初始化；析构函数在对象销毁前调用，用于清理资源。

```cpp
class Person {
public:
    Person() {
        cout << "构造函数" << endl;
    }

    ~Person() {
        cout << "析构函数" << endl;
    }
};
```

特点：

- 名称与类名相同，构造函数没有返回值，可以重载。
- 析构函数写作 `~类名()`，没有返回值和参数，不能重载。
- 没有显式定义时，编译器通常会生成默认版本。

#### 构造函数的分类与调用

按参数分为无参构造和有参构造；按作用分为普通构造和拷贝构造。

```cpp
class Person {
public:
    Person() : m_Age(0) {}
    explicit Person(int age) : m_Age(age) {}
    Person(const Person& other) : m_Age(other.m_Age) {}

private:
    int m_Age;
};

int main() {
    Person first;          // 默认构造
    Person second(18);     // 直接初始化
    Person third{20};      // 列表初始化
    Person fourth(second); // 拷贝构造
    return 0;
}
```

> [!warning] 不要写成 `Person p();`
> 这会被解析为函数声明，而不是创建默认构造对象。应写 `Person p;` 或 `Person p{};`。

> [!tip] 现代 C++ 补充
> 单参数构造函数若不希望发生隐式类型转换，通常加 `explicit`。列表初始化 `{}` 能避免部分窄化转换，适合优先使用。

#### 拷贝构造函数的调用时机

拷贝构造常在以下场景发生：

1. 使用已有对象初始化新对象。
2. 对象按值传递给函数。
3. 函数按值返回对象。

```cpp
void consume(Person value) {
    // value 是形参对象
}

Person createPerson() {
    Person value(18);
    return value;
}
```

现代编译器可能进行返回值优化或拷贝消除，因此实际观察到的拷贝次数可能少于概念模型。

#### 构造函数调用规则

课程中的常用结论：

- 用户没有定义构造函数时，编译器会提供默认构造函数和拷贝构造函数。
- 用户定义有参构造函数后，编译器通常不再隐式提供无参构造函数。
- 用户定义拷贝构造函数后，也不能再依赖编译器自动提供普通默认构造。

更准确地说，编译器是否隐式声明、是否把函数定义为删除，取决于类的其他特殊成员和成员类型；遇到复杂类时应直接使用 `= default` 或 `= delete` 表达意图。

#### 深拷贝与浅拷贝

如果类拥有堆内存，编译器生成的逐成员复制只会复制指针地址，两个对象将指向同一块内存，这就是浅拷贝。

```cpp
#include <algorithm>
#include <cstddef>

class IntBuffer {
public:
    explicit IntBuffer(std::size_t size)
        : m_Size(size), m_Data(new int[size]{}) {}

    IntBuffer(const IntBuffer& other)
        : m_Size(other.m_Size), m_Data(new int[other.m_Size]) {
        std::copy(other.m_Data, other.m_Data + m_Size, m_Data);
    }

    IntBuffer& operator=(const IntBuffer& other) {
        if (this == &other) {
            return *this;
        }

        int* newData = new int[other.m_Size];
        std::copy(other.m_Data, other.m_Data + other.m_Size, newData);

        delete[] m_Data;
        m_Data = newData;
        m_Size = other.m_Size;
        return *this;
    }

    ~IntBuffer() {
        delete[] m_Data;
    }

private:
    std::size_t m_Size;
    int* m_Data;
};
```

深拷贝为新对象重新申请资源，避免多个对象重复释放同一地址。

> [!important] 三法则与零法则
> 类直接管理资源时，如果需要自定义析构函数，通常也要考虑拷贝构造和拷贝赋值，这称为“三法则”。现代 C++ 还要考虑移动构造和移动赋值，即“五法则”。更推荐把资源交给 `std::vector`、`std::string`、智能指针等类型管理，使类遵循“零法则”。

#### 初始化列表

成员初始化列表在进入构造函数体之前直接初始化成员：

```cpp
class Person {
public:
    Person(string name, int age)
        : m_Name(std::move(name)), m_Age(age) {}

private:
    string m_Name;
    int m_Age;
};
```

`const` 成员、引用成员以及没有默认构造函数的成员对象必须在初始化列表中初始化。成员实际初始化顺序由它们在类中的**声明顺序**决定，而不是初始化列表书写顺序。

#### 类对象作为类成员

```cpp
class Phone {
public:
    explicit Phone(string name) : m_Name(std::move(name)) {}

private:
    string m_Name;
};

class Person {
public:
    Person(string name, string phoneName)
        : m_Name(std::move(name)), m_Phone(std::move(phoneName)) {}

private:
    string m_Name;
    Phone m_Phone;
};
```

构造顺序：先构造成员对象，再构造外层对象；析构顺序与构造顺序相反。

#### 静态成员

静态成员属于类，而不是某一个对象。

```cpp
class Player {
public:
    Player() { ++s_Count; }
    ~Player() { --s_Count; }

    static int count() {
        return s_Count;
    }

private:
    static int s_Count;
};

int Player::s_Count = 0;
```

- 静态成员变量由同一类的所有对象共享，传统写法需在类外定义。
- 静态成员函数没有 `this` 指针，只能直接访问静态成员。
- 静态成员同样受 `public`、`protected`、`private` 权限控制。

> [!tip] C++17 补充
> 简单静态数据成员可以写成 `inline static int s_Count = 0;`，无需再在类外单独定义。

### 4.3 对象模型与 this 指针

#### 成员变量和成员函数分开存储

非静态成员变量存储在每个对象内部；成员函数、静态成员变量和静态成员函数不计入每个对象的那一份非静态数据。

```cpp
class Empty {};

class Person {
public:
    int age;
    static int count;
    void show() const {}
};

cout << sizeof(Empty) << endl;
cout << sizeof(Person) << endl;
```

空类对象通常也占至少 1 字节，以保证不同对象具有不同地址。对象大小还可能包含对齐填充、虚函数相关指针等实现细节，不能简单等于成员字节数之和。

#### this 指针的用途

每个非静态成员函数都可使用 `this` 指针，它指向调用该函数的当前对象。

用途一：区分同名形参和成员。

```cpp
class Person {
public:
    explicit Person(int age) {
        this->age = age;
    }

private:
    int age;
};
```

更推荐直接使用初始化列表并让成员采用可辨识名称：

```cpp
class Person {
public:
    explicit Person(int age) : m_Age(age) {}

private:
    int m_Age;
};
```

用途二：返回当前对象，实现链式调用。

```cpp
class Counter {
public:
    Counter& add(int value) {
        m_Value += value;
        return *this;
    }

    int value() const {
        return m_Value;
    }

private:
    int m_Value = 0;
};

Counter counter;
counter.add(10).add(20);
```

必须返回 `Counter&`。如果按值返回，就会得到当前对象的副本，后续操作可能作用于副本。

#### 空指针访问成员函数

课程示例用于说明：一个不访问对象状态的普通成员函数，在某些环境下通过空指针调用可能“看起来能运行”。

```cpp
class Person {
public:
    void showClassName() const {
        cout << "Person" << endl;
    }

    void showAge() const {
        if (this == nullptr) {
            return;
        }
        cout << m_Age << endl;
    }

private:
    int m_Age = 0;
};
```

> [!danger] 不要在实际代码中这样调用
> 通过空对象指针调用非静态成员函数属于未定义行为，不能把 `if (this == nullptr)` 当作可靠保护。若行为不依赖对象，应改为静态成员函数或普通函数；调用成员函数前应确保对象指针有效。

#### const 修饰成员函数

```cpp
class Person {
public:
    int age() const {
        return m_Age;
    }

    void setAge(int age) {
        m_Age = age;
    }

private:
    int m_Age = 0;
};
```

成员函数末尾的 `const` 表示函数不会通过 `this` 修改普通成员。可理解为函数中的 `this` 具有“指向常量对象”的性质。

常对象只能调用常成员函数：

```cpp
const Person person;
cout << person.age() << endl;
// person.setAge(20);  // 错误
```

使用 `mutable` 修饰的成员即使在常成员函数中也可以修改，常用于缓存或统计等不改变对象逻辑状态的数据。

```cpp
class Document {
public:
    void read() const {
        ++m_ReadCount;
    }

private:
    mutable int m_ReadCount = 0;
};
```

> [!important] const 正确性
> 不修改对象状态的成员函数应尽量标为 `const`。这样既能调用常对象，也能让接口明确表达只读承诺。

### 4.4 友元

友元允许一个函数或类访问另一个类的私有成员。友元会突破封装边界，应只授予确实需要的最小范围。

#### 全局函数做友元

```cpp
#include <iostream>
#include <string>
using namespace std;

class Building {
    friend void visit(const Building& building);

public:
    Building() : m_SittingRoom("客厅"), m_BedRoom("卧室") {}

private:
    string m_SittingRoom;
    string m_BedRoom;
};

void visit(const Building& building) {
    cout << building.m_SittingRoom << endl;
    cout << building.m_BedRoom << endl;
}
```

#### 友元类

```cpp
class Building;

class GoodFriend {
public:
    void visit(const Building& building) const;
};

class Building {
    friend class GoodFriend;

public:
    Building() : m_SittingRoom("客厅"), m_BedRoom("卧室") {}

private:
    string m_SittingRoom;
    string m_BedRoom;
};

void GoodFriend::visit(const Building& building) const {
    cout << building.m_SittingRoom << endl;
    cout << building.m_BedRoom << endl;
}
```

友元关系不能被继承，也不具有传递性：A 是 B 的友元、B 是 C 的友元，并不代表 A 是 C 的友元。

#### 成员函数做友元

可以只把另一个类中的特定成员函数声明为友元，比授予整个类更精确。此时要注意类的声明和定义顺序：

```cpp
class Building;

class GoodFriend {
public:
    void visitPrivate(const Building& building) const;
    void visitPublic(const Building& building) const;
};

class Building {
    friend void GoodFriend::visitPrivate(const Building&) const;

public:
    string sittingRoom = "客厅";

private:
    string bedRoom = "卧室";
};
```

> [!tip] 设计建议
> 运算符重载、测试辅助和紧密协作的底层类型适合使用友元。普通业务逻辑优先通过清晰的公共接口协作，避免大量友元让私有实现失去意义。

### 4.5 运算符重载

运算符重载让自定义类型能够使用接近内置类型的表达式。重载不能改变运算符的优先级、结合性和操作数数量，也不能创造新的运算符。

#### 加号运算符

```cpp
class Point {
public:
    Point(int x = 0, int y = 0) : m_X(x), m_Y(y) {}

    Point operator+(const Point& other) const {
        return Point(m_X + other.m_X, m_Y + other.m_Y);
    }

    int x() const { return m_X; }
    int y() const { return m_Y; }

private:
    int m_X;
    int m_Y;
};
```

`a + b` 可被编译器解释为 `a.operator+(b)`。也可以写成全局函数：

```cpp
Point operator+(const Point& left, int value) {
    return Point(left.x() + value, left.y() + value);
}
```

#### 左移运算符

为了支持 `cout << object`，通常把 `operator<<` 写成全局函数；第一个参数必须是输出流。

```cpp
#include <iostream>
using namespace std;

class Person {
    friend ostream& operator<<(ostream& out, const Person& person);

public:
    Person(string name, int age)
        : m_Name(std::move(name)), m_Age(age) {}

private:
    string m_Name;
    int m_Age;
};

ostream& operator<<(ostream& out, const Person& person) {
    out << "姓名：" << person.m_Name << "，年龄：" << person.m_Age;
    return out;
}
```

返回 `ostream&` 才能支持链式输出：

```cpp
cout << person << endl;
```

#### 递增运算符

前置递增返回修改后的当前对象；后置递增通过一个无名 `int` 占位参数与前置版本区分，并返回修改前的副本。

```cpp
class Counter {
public:
    explicit Counter(int value = 0) : m_Value(value) {}

    Counter& operator++() {
        ++m_Value;
        return *this;
    }

    Counter operator++(int) {
        Counter old(*this);
        ++m_Value;
        return old;
    }

    int value() const { return m_Value; }

private:
    int m_Value;
};
```

| 写法 | 重载形式 | 通常返回 |
| --- | --- | --- |
| `++object` | `operator++()` | 当前对象引用 |
| `object++` | `operator++(int)` | 旧值副本 |

#### 赋值运算符

编译器生成的赋值运算符执行逐成员赋值。如果类直接管理堆资源，需要处理自赋值和深拷贝。

```cpp
class Person {
public:
    explicit Person(int age) : m_Age(new int(age)) {}

    Person(const Person& other)
        : m_Age(new int(*other.m_Age)) {}

    Person& operator=(const Person& other) {
        if (this != &other) {
            int* newAge = new int(*other.m_Age);
            delete m_Age;
            m_Age = newAge;
        }
        return *this;
    }

    ~Person() {
        delete m_Age;
    }

private:
    int* m_Age;
};
```

赋值运算符返回当前对象引用，以支持 `a = b = c;`。

> [!tip] 更稳妥的资源成员
> 本例为了讲解深拷贝而直接管理 `int*`。实际代码把年龄直接保存为 `int` 即可；对于动态集合，优先使用 `std::vector` 或智能指针，让成员类型完成正确拷贝和释放。

#### 关系运算符

```cpp
class Person {
public:
    Person(string name, int age)
        : m_Name(std::move(name)), m_Age(age) {}

    bool operator==(const Person& other) const {
        return m_Name == other.m_Name && m_Age == other.m_Age;
    }

    bool operator!=(const Person& other) const {
        return !(*this == other);
    }

private:
    string m_Name;
    int m_Age;
};
```

比较的含义应符合类型的自然语义。例如学生是否相同，是比较学号、姓名还是所有字段，需要在类型设计时明确。

#### 函数调用运算符

重载 `operator()` 后，对象可以像函数一样调用，这类对象称为函数对象或仿函数。

```cpp
class Add {
public:
    int operator()(int a, int b) const {
        return a + b;
    }
};

Add add;
cout << add(10, 20) << endl;
```

函数对象可以保存状态，也能作为算法的策略参数。现代 C++ 中 Lambda 表达式经常承担类似角色。

> [!warning] 不要滥用运算符重载
> 重载后的行为应与运算符通常含义一致。不要让 `+` 修改左操作数，或让 `==` 执行耗时且意外的外部操作。

### 4.6 继承

继承用于表达类型之间的“是一个”关系，并复用基类中已有的属性和行为。

#### 基本语法

```cpp
class BasePage {
public:
    void header() const {
        cout << "公共头部" << endl;
    }

    void footer() const {
        cout << "公共底部" << endl;
    }
};

class JavaPage : public BasePage {
public:
    void content() const {
        cout << "Java 学科内容" << endl;
    }
};
```

`BasePage` 称为基类或父类，`JavaPage` 称为派生类或子类。派生类可以增加自身特有成员。

#### 继承方式

```cpp
class DerivedPublic : public Base {};
class DerivedProtected : protected Base {};
class DerivedPrivate : private Base {};
```

| 基类成员权限 | public 继承后 | protected 继承后 | private 继承后 |
| --- | --- | --- | --- |
| `public` | `public` | `protected` | `private` |
| `protected` | `protected` | `protected` | `private` |
| `private` | 不可直接访问 | 不可直接访问 | 不可直接访问 |

基类的私有成员通常仍是派生类对象的一部分，但派生类不能直接访问，只能通过基类提供的 `protected` 或 `public` 接口使用。

> [!important] 常用选择
> 公开继承表达“派生类也是一种基类”，最常用。`protected` 和 `private` 继承更多用于实现复用；如果不需要类型替代关系，组合通常比私有继承更清晰。

#### 继承中的对象模型

```cpp
class Base {
public:
    int publicValue;

protected:
    int protectedValue;

private:
    int privateValue;
};

class Derived : public Base {
public:
    int ownValue;
};
```

查看 `sizeof(Derived)` 时，通常会发现基类私有数据也占对象空间。访问权限决定“能否直接使用”，不决定成员是否存在。

对象大小还会受对齐、空基类优化、虚函数机制等影响，不应把一次实验结果当作所有平台的固定布局。

#### 构造和析构顺序

创建派生类对象时：

1. 先调用基类构造函数。
2. 再按声明顺序构造成员对象。
3. 最后执行派生类构造函数体。

销毁时顺序完全相反。

```cpp
class Base {
public:
    Base() { cout << "Base 构造" << endl; }
    ~Base() { cout << "Base 析构" << endl; }
};

class Derived : public Base {
public:
    Derived() { cout << "Derived 构造" << endl; }
    ~Derived() { cout << "Derived 析构" << endl; }
};
```

如果基类没有默认构造函数，派生类必须在初始化列表中明确调用合适的基类构造函数：

```cpp
class Base {
public:
    explicit Base(int value) : m_Value(value) {}

private:
    int m_Value;
};

class Derived : public Base {
public:
    explicit Derived(int value) : Base(value) {}
};
```

#### 同名成员处理

派生类定义与基类同名的成员后，会隐藏基类中的同名成员。

```cpp
class Base {
public:
    int value = 10;
    void show() const { cout << "Base" << endl; }
    void show(int number) const { cout << number << endl; }
};

class Derived : public Base {
public:
    int value = 20;
    void show() const { cout << "Derived" << endl; }
};

Derived object;
cout << object.value << endl;        // 派生类成员
cout << object.Base::value << endl;  // 基类成员
object.show();
object.Base::show();
```

只要派生类声明了同名函数，基类中这个名称下的其他重载也会被隐藏。可以使用 `using Base::show;` 把基类重载引入派生类作用域。

#### 同名静态成员处理

静态成员可以通过对象或类名访问。出现同名时仍使用作用域限定：

```cpp
class Base {
public:
    static int value;
};

class Derived : public Base {
public:
    static int value;
};

int Base::value = 10;
int Derived::value = 20;

cout << Derived::value << endl;
cout << Derived::Base::value << endl;
```

#### 多继承

C++ 允许一个类继承多个基类：

```cpp
class BaseOne {
public:
    int first = 10;
};

class BaseTwo {
public:
    int second = 20;
};

class Derived : public BaseOne, public BaseTwo {};
```

如果多个基类包含同名成员，访问时需要使用作用域限定。多继承容易带来名称冲突和复杂对象关系，应在确有多个独立接口需要组合时使用。

#### 菱形继承与虚继承

菱形继承中，两个中间类继承同一个祖先，最下层类再同时继承两个中间类：

```cpp
class Animal {
public:
    int age = 0;
};

class Sheep : virtual public Animal {};
class Camel : virtual public Animal {};
class Alpaca : public Sheep, public Camel {};
```

若 `Sheep` 和 `Camel` 使用普通继承，`Alpaca` 内会包含两份 `Animal` 子对象，访问 `age` 时产生歧义和数据重复。使用==虚继承==后，最下层对象共享一份虚基类子对象。

> [!note] 虚基类指针
> 常见编译器会在对象中加入与虚基类定位有关的数据。课程通过开发者命令查看对象布局来辅助理解，但具体布局属于编译器实现细节。

> [!tip] 设计建议
> 虚继承可以解决菱形数据重复，但也增加复杂度。优先判断关系是否真的需要多继承；很多业务场景可用组合或纯接口避免复杂状态继承。

### 4.7 多态

多态使同一个接口在不同对象上产生不同实现。C++ 多态可分为：

- **静态多态**：函数重载、运算符重载，编译期确定调用。
- **动态多态**：通过虚函数和基类指针/引用，在运行期确定调用。

#### 动态多态的基本语法

```cpp
#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() const {
        cout << "动物发出声音" << endl;
    }

    virtual ~Animal() = default;
};

class Cat : public Animal {
public:
    void speak() const override {
        cout << "小猫喵喵叫" << endl;
    }
};

class Dog : public Animal {
public:
    void speak() const override {
        cout << "小狗汪汪叫" << endl;
    }
};

void makeSpeak(const Animal& animal) {
    animal.speak();
}

int main() {
    Cat cat;
    Dog dog;
    makeSpeak(cat);
    makeSpeak(dog);
    return 0;
}
```

动态多态的常见条件：

1. 存在继承关系。
2. 基类声明虚函数。
3. 派生类重写虚函数。
4. 通过基类指针或引用指向派生类对象并调用虚函数。

> [!important] 使用 `override`
> 课程代码可能省略 `override`。现代 C++ 中应在派生类重写函数后加 `override`，让编译器检查函数签名，避免因为 `const`、参数类型等细微差异导致“本以为重写，实际是新函数”。

#### 多态原理

带有虚函数的类通常会让对象含有一个虚函数表指针，指向该类的虚函数表。通过基类指针或引用调用虚函数时，程序在运行期从实际对象对应的表中找到最终函数。

概念过程：

1. 基类声明 `virtual` 函数。
2. 派生类重写后拥有与自身实现对应的虚函数表项。
3. 基类指针指向派生类对象。
4. 调用时根据实际对象选择派生类实现。

虚函数表和指针是主流编译器的常见实现方式，但标准保证的是**动态分派行为**，不固定具体内存布局。

#### 案例一：计算器类

不使用多态时，计算器可能通过大量条件判断选择运算。新增运算需要修改原函数，不利于扩展。

使用抽象运算接口：

```cpp
#include <iostream>
#include <memory>
using namespace std;

class AbstractCalculator {
public:
    AbstractCalculator(double first, double second)
        : m_First(first), m_Second(second) {}

    virtual double result() const = 0;
    virtual ~AbstractCalculator() = default;

protected:
    double m_First;
    double m_Second;
};

class AddCalculator : public AbstractCalculator {
public:
    using AbstractCalculator::AbstractCalculator;

    double result() const override {
        return m_First + m_Second;
    }
};

class SubtractCalculator : public AbstractCalculator {
public:
    using AbstractCalculator::AbstractCalculator;

    double result() const override {
        return m_First - m_Second;
    }
};

int main() {
    unique_ptr<AbstractCalculator> calculator =
        make_unique<AddCalculator>(10, 20);

    cout << calculator->result() << endl;
    return 0;
}
```

新增乘法时只需增加一个派生类，不必修改既有加减法类型。这体现“对扩展开放，对修改关闭”的思想。

#### 纯虚函数和抽象类

当基类无法提供有意义的通用实现时，可把函数声明为纯虚函数：

```cpp
class Base {
public:
    virtual void action() = 0;
    virtual ~Base() = default;
};
```

包含纯虚函数的类称为抽象类：

- 抽象类不能直接实例化。
- 派生类必须实现继承到的纯虚函数，否则仍是抽象类。
- 抽象类适合规定接口，让不同派生类提供具体行为。

#### 案例二：制作饮品

制作饮品的流程相同，但每一步的具体实现不同。基类定义固定流程，派生类实现步骤，这属于模板方法思想。

```cpp
#include <iostream>
using namespace std;

class Beverage {
public:
    virtual void boil() const = 0;
    virtual void brew() const = 0;
    virtual void pourInCup() const = 0;
    virtual void addExtras() const = 0;

    void make() const {
        boil();
        brew();
        pourInCup();
        addExtras();
    }

    virtual ~Beverage() = default;
};

class Coffee : public Beverage {
public:
    void boil() const override {
        cout << "煮矿泉水" << endl;
    }

    void brew() const override {
        cout << "冲泡咖啡" << endl;
    }

    void pourInCup() const override {
        cout << "倒入咖啡杯" << endl;
    }

    void addExtras() const override {
        cout << "加入糖和牛奶" << endl;
    }
};

class Tea : public Beverage {
public:
    void boil() const override {
        cout << "煮矿泉水" << endl;
    }

    void brew() const override {
        cout << "冲泡茶叶" << endl;
    }

    void pourInCup() const override {
        cout << "倒入茶杯" << endl;
    }

    void addExtras() const override {
        cout << "加入柠檬" << endl;
    }
};

void prepare(const Beverage& beverage) {
    beverage.make();
}
```

`make()` 保存稳定流程，虚函数提供变化点。

#### 虚析构和纯虚析构

使用基类指针管理派生类对象时，基类析构函数必须是虚函数：

```cpp
class Animal {
public:
    virtual void speak() const = 0;
    virtual ~Animal() = default;
};

class Cat : public Animal {
public:
    Cat() : m_Name(new string("小猫")) {}

    void speak() const override {
        cout << *m_Name << endl;
    }

    ~Cat() override {
        delete m_Name;
    }

private:
    string* m_Name;
};

Animal* animal = new Cat;
delete animal;  // 正确调用 Cat 和 Animal 的析构函数
```

如果基类析构不是虚函数，通过基类指针 `delete` 派生对象会产生未定义行为，派生类资源可能无法正确释放。

纯虚析构也必须有定义：

```cpp
class Base {
public:
    virtual ~Base() = 0;
};

Base::~Base() {}
```

> [!important] 多态基类规则
> 只要一个类准备被多态使用，通常就应提供虚析构函数。若不允许通过基类删除，则需要用受保护的非虚析构等更明确的高级设计，入门阶段优先使用 `virtual ~Base() = default;`。

#### 案例三：电脑组装

把 CPU、显卡和内存抽象为独立接口，不同厂商提供实现；电脑类只依赖接口。

```cpp
#include <iostream>
#include <memory>
#include <utility>
using namespace std;

class CPU {
public:
    virtual void calculate() const = 0;
    virtual ~CPU() = default;
};

class VideoCard {
public:
    virtual void display() const = 0;
    virtual ~VideoCard() = default;
};

class Memory {
public:
    virtual void storage() const = 0;
    virtual ~Memory() = default;
};

class IntelCPU : public CPU {
public:
    void calculate() const override {
        cout << "Intel CPU 开始计算" << endl;
    }
};

class IntelVideoCard : public VideoCard {
public:
    void display() const override {
        cout << "Intel 显卡开始显示" << endl;
    }
};

class LenovoMemory : public Memory {
public:
    void storage() const override {
        cout << "Lenovo 内存开始存储" << endl;
    }
};

class Computer {
public:
    Computer(unique_ptr<CPU> cpu,
             unique_ptr<VideoCard> videoCard,
             unique_ptr<Memory> memory)
        : m_CPU(std::move(cpu)),
          m_VideoCard(std::move(videoCard)),
          m_Memory(std::move(memory)) {}

    void work() const {
        m_CPU->calculate();
        m_VideoCard->display();
        m_Memory->storage();
    }

private:
    unique_ptr<CPU> m_CPU;
    unique_ptr<VideoCard> m_VideoCard;
    unique_ptr<Memory> m_Memory;
};

int main() {
    Computer computer(
        make_unique<IntelCPU>(),
        make_unique<IntelVideoCard>(),
        make_unique<LenovoMemory>()
    );

    computer.work();
    return 0;
}
```

课程原例使用裸指针，并在 `Computer` 析构函数中逐个 `delete`。上例改用 `unique_ptr` 表达组件由电脑独占所有，自动完成释放。

这个案例体现：

- **面向接口编程**：`Computer` 不依赖具体厂商。
- **组合优于硬编码**：不同组件可自由搭配。
- **多态替换**：任何实现对应接口的组件都能装入电脑。
- **RAII**：资源跟随对象生命周期自动释放。

---

## 5. 文件操作

程序运行时的数据通常存放在内存中，程序结束后会消失。文件操作可以把数据持久化到磁盘。

C++ 文件流主要位于 `<fstream>`：

| 类型 | 用途 |
| --- | --- |
| `ofstream` | 写文件 |
| `ifstream` | 读文件 |
| `fstream` | 同时读写 |

常用打开方式：

| 标志 | 含义 |
| --- | --- |
| `ios::in` | 读取 |
| `ios::out` | 写入 |
| `ios::app` | 在文件末尾追加 |
| `ios::ate` | 打开后定位到文件末尾 |
| `ios::trunc` | 文件存在时清空 |
| `ios::binary` | 二进制模式 |

多个标志可以使用 `|` 组合，例如 `ios::out | ios::binary`。

### 5.1 文本文件

#### 写文本文件

步骤：

1. 包含 `<fstream>`。
2. 创建 `ofstream` 对象。
3. 打开并检查文件。
4. 使用 `<<` 写入。
5. 关闭文件；对象离开作用域时也会自动关闭。

```cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
    ofstream output("person.txt");

    if (!output.is_open()) {
        cerr << "文件打开失败" << endl;
        return 1;
    }

    output << "姓名：张三" << '\n';
    output << "年龄：18" << '\n';

    if (!output) {
        cerr << "文件写入失败" << endl;
        return 1;
    }

    output.close();
    return 0;
}
```

默认使用 `ofstream("file.txt")` 通常会覆盖已有文件。需要追加时：

```cpp
ofstream output("log.txt", ios::app);
```

> [!tip] 换行选择
> 写文件时 `'\n'` 只负责换行，`endl` 还会强制刷新缓冲区。一般日志或批量写入优先使用 `'\n'`，确实需要立即刷新时再使用 `endl`。

#### 读文本文件

方式一：使用 `>>` 按空白分隔读取。

```cpp
ifstream input("person.txt");
string word;

while (input >> word) {
    cout << word << endl;
}
```

方式二：使用 `getline` 按行读取，能保留一行中的空格。

```cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
    ifstream input("person.txt");

    if (!input.is_open()) {
        cerr << "文件打开失败" << endl;
        return 1;
    }

    string line;
    while (getline(input, line)) {
        cout << line << endl;
    }

    if (!input.eof()) {
        cerr << "读取过程中发生错误" << endl;
        return 1;
    }

    return 0;
}
```

方式三：使用 `get` 逐字符读取。

```cpp
char ch;
while (input.get(ch)) {
    cout << ch;
}
```

> [!warning] 不要写 `while (!input.eof())`
> `eof()` 只有在一次读取尝试失败后才会置位。应把读取操作本身放在循环条件中，例如 `while (getline(input, line))`，避免重复处理最后一次旧数据。

### 5.2 二进制文件

二进制模式按字节读写，不会把数据格式化成人类可读文本。

#### 写二进制文件

课程示例把简单结构直接写入文件：

```cpp
#include <cstring>
#include <fstream>
#include <iostream>
using namespace std;

struct PersonRecord {
    char name[64];
    int age;
};

int main() {
    PersonRecord person{};
    std::strncpy(person.name, "张三", sizeof(person.name) - 1);
    person.age = 18;

    ofstream output("person.dat", ios::out | ios::binary);
    if (!output) {
        cerr << "文件打开失败" << endl;
        return 1;
    }

    output.write(
        reinterpret_cast<const char*>(&person),
        sizeof(person)
    );

    if (!output) {
        cerr << "二进制写入失败" << endl;
        return 1;
    }

    return 0;
}
```

`write` 接收字节地址和字节数量，因此需要把对象地址转换为字符指针。

#### 读二进制文件

```cpp
#include <fstream>
#include <iostream>
using namespace std;

struct PersonRecord {
    char name[64];
    int age;
};

int main() {
    ifstream input("person.dat", ios::in | ios::binary);
    if (!input) {
        cerr << "文件打开失败" << endl;
        return 1;
    }

    PersonRecord person{};
    input.read(
        reinterpret_cast<char*>(&person),
        sizeof(person)
    );

    if (!input) {
        cerr << "二进制读取失败或数据不完整" << endl;
        return 1;
    }

    cout << "姓名：" << person.name
         << "，年龄：" << person.age << endl;
    return 0;
}
```

> [!danger] 不要直接保存复杂对象的内存
> 只有满足简单布局且字段本身不含动态资源的记录，才适合用课程中的 `reinterpret_cast` 方法演示。`std::string`、`std::vector`、虚函数对象和含指针成员的类，其内存中包含地址或实现状态，直接写入后无法可靠恢复。

> [!warning] 二进制格式的可移植性
> 结构体可能有填充字节，整数大小和字节序也可能不同。直接写内存得到的文件通常只适合相同程序、编译器和平台的短期使用。正式文件格式应明确字段宽度、字节序、版本和字符串编码，并逐字段序列化。

> [!tip] 文件流也是 RAII
> 文件流对象离开作用域时会自动关闭文件。仍可在需要立即提交数据、检测关闭错误或提前释放文件句柄时显式调用 `close()`。

---

## 6. 总结与复习清单

### 6.1 五个模块的知识关系

1. **内存分区模型**：理解对象存储位置、生命周期和动态内存。
2. **引用**：提供别名语义，支持高效传参和自然的接口设计。
3. **函数提高**：通过默认参数和重载设计更灵活的函数接口。
4. **类和对象**：使用封装维护有效状态，使用构造和析构管理生命周期，使用继承和多态组织可扩展程序。
5. **文件操作**：把内存中的数据持久化，并处理打开、读写和格式错误。

这五部分共同指向一个核心问题：==谁拥有资源，资源何时有效，接口如何安全地使用资源==。

### 6.2 必须掌握

- 能说明代码区、全局区、栈区和堆区的用途与生命周期差异。
- 正确配对 `new/delete`、`new[]/delete[]`，理解为什么现代代码优先使用 RAII。
- 能选择值传递、普通引用和常量引用，并判断返回引用是否安全。
- 理解默认参数规则和函数重载的匹配条件。
- 能定义封装良好的类，正确使用构造、析构、拷贝构造和拷贝赋值。
- 理解深拷贝解决的问题，掌握三法则、五法则和零法则的关系。
- 能解释 `this`、常成员函数、静态成员和友元的用途。
- 能实现符合自然语义的常见运算符重载。
- 掌握公开继承、构造析构顺序、同名成员处理和菱形继承。
- 能使用虚函数、纯虚函数和抽象类实现动态多态。
- 多态基类应提供虚析构函数。
- 能检查文件打开和读写状态，正确编写文本与简单二进制文件操作。

### 6.3 高频易错点

| 易错点 | 后果 | 正确做法 |
| --- | --- | --- |
| 返回局部变量的地址或引用 | 悬空指针/引用 | 返回值，或引用生命周期足够长的对象 |
| `new[]` 后使用 `delete` | 未定义行为 | 使用 `delete[]` |
| 资源类使用默认浅拷贝 | 重复释放、数据互相影响 | 深拷贝或使用资源管理类型 |
| 初始化列表顺序与声明顺序不同 | 实际顺序和预期不符 | 按成员声明顺序书写 |
| 派生类重写函数遗漏签名差异 | 没有真正重写 | 使用 `override` |
| 通过非虚析构基类删除派生对象 | 未定义行为、资源泄漏 | 基类析构声明为 `virtual` |
| 对象按值传给多态接口 | 对象切片 | 使用基类指针或引用 |
| `while (!file.eof())` 读取 | 最后一条数据重复或无效 | 把读取表达式作为循环条件 |
| 直接二进制保存 `string` 对象 | 文件只保存内部地址等状态 | 逐字段序列化真实内容 |
| 用实验地址/对象大小推导固定布局 | 跨平台结论错误 | 关注标准保证，布局仅作观察 |

### 6.4 第 1～64 讲覆盖检查表

> [!info] 分 P 说明
> 课程第 30、31 讲合并在同一分 P“30&31 类和对象-静态成员”中，因此第 1～64 讲对应合集 P84～P146，共 63 个视频分 P。

| 讲次 | 视频主题 | 笔记位置 |
| --- | --- | --- |
| 1 | 内存四区：代码区 | [[#1.1 程序运行前：代码区与全局区]] |
| 2 | 内存四区：全局区 | [[#1.1 程序运行前：代码区与全局区]] |
| 3 | 内存四区：栈区 | [[#1.2 程序运行后：栈区与堆区]] |
| 4 | 内存四区：堆区 | [[#1.2 程序运行后：栈区与堆区]] |
| 5 | `new` 运算符 | [[#1.3 new 与 delete]] |
| 6 | 引用基本语法 | [[#2.1 引用的基本语法与注意事项]] |
| 7 | 引用注意事项 | [[#2.1 引用的基本语法与注意事项]] |
| 8 | 引用做函数参数 | [[#2.2 引用作为函数参数]] |
| 9 | 引用做函数返回值 | [[#2.3 引用作为函数返回值]] |
| 10 | 引用的本质 | [[#2.4 引用的本质与常量引用]] |
| 11 | 常量引用 | [[#2.4 引用的本质与常量引用]] |
| 12 | 函数默认参数 | [[#3.1 默认参数与占位参数]] |
| 13 | 函数占位参数 | [[#3.1 默认参数与占位参数]] |
| 14 | 函数重载基本语法 | [[#3.2 函数重载]] |
| 15 | 函数重载注意事项 | [[#3.2 函数重载]] |
| 16 | 封装：属性和行为作为整体 | [[#4.1 封装]] |
| 17 | 案例：设计学生类 | [[#4.1 封装]] |
| 18 | 封装：访问权限 | [[#4.1 封装]] |
| 19 | `class` 与 `struct` 区别 | [[#4.1 封装]] |
| 20 | 成员属性设置为私有 | [[#4.1 封装]] |
| 21 | 案例：立方体类 | [[#4.1 封装]] |
| 22 | 案例：点和圆的关系 | [[#4.1 封装]] |
| 23 | 构造函数和析构函数 | [[#4.2 对象的初始化和清理]] |
| 24 | 构造函数分类及调用 | [[#4.2 对象的初始化和清理]] |
| 25 | 拷贝构造函数调用时机 | [[#4.2 对象的初始化和清理]] |
| 26 | 构造函数调用规则 | [[#4.2 对象的初始化和清理]] |
| 27 | 深拷贝与浅拷贝 | [[#4.2 对象的初始化和清理]] |
| 28 | 初始化列表 | [[#4.2 对象的初始化和清理]] |
| 29 | 类对象作为类成员 | [[#4.2 对象的初始化和清理]] |
| 30 | 静态成员变量 | [[#4.2 对象的初始化和清理]] |
| 31 | 静态成员函数 | [[#4.2 对象的初始化和清理]] |
| 32 | 成员变量和成员函数分开存储 | [[#4.3 对象模型与 this 指针]] |
| 33 | `this` 指针用途 | [[#4.3 对象模型与 this 指针]] |
| 34 | 空指针访问成员函数 | [[#4.3 对象模型与 this 指针]] |
| 35 | `const` 修饰成员函数 | [[#4.3 对象模型与 this 指针]] |
| 36 | 全局函数做友元 | [[#4.4 友元]] |
| 37 | 友元类 | [[#4.4 友元]] |
| 38 | 成员函数做友元 | [[#4.4 友元]] |
| 39 | 加号运算符重载 | [[#4.5 运算符重载]] |
| 40 | 左移运算符重载 | [[#4.5 运算符重载]] |
| 41 | 递增运算符重载 | [[#4.5 运算符重载]] |
| 42 | 赋值运算符重载 | [[#4.5 运算符重载]] |
| 43 | 关系运算符重载 | [[#4.5 运算符重载]] |
| 44 | 函数调用运算符重载 | [[#4.5 运算符重载]] |
| 45 | 继承基本语法 | [[#4.6 继承]] |
| 46 | 继承方式 | [[#4.6 继承]] |
| 47 | 继承中的对象模型 | [[#4.6 继承]] |
| 48 | 继承中的构造和析构顺序 | [[#4.6 继承]] |
| 49 | 继承中同名成员处理 | [[#4.6 继承]] |
| 50 | 继承中同名静态成员处理 | [[#4.6 继承]] |
| 51 | 多继承语法 | [[#4.6 继承]] |
| 52 | 菱形继承问题及解决 | [[#4.6 继承]] |
| 53 | 多态基本语法 | [[#4.7 多态]] |
| 54 | 多态原理剖析 | [[#4.7 多态]] |
| 55 | 案例：计算器类 | [[#4.7 多态]] |
| 56 | 纯虚函数和抽象类 | [[#4.7 多态]] |
| 57 | 案例：制作饮品 | [[#4.7 多态]] |
| 58 | 虚析构和纯虚析构 | [[#4.7 多态]] |
| 59 | 案例：电脑组装需求分析 | [[#4.7 多态]] |
| 60 | 案例：电脑组装实现 | [[#4.7 多态]] |
| 61 | 文本文件：写文件 | [[#5.1 文本文件]] |
| 62 | 文本文件：读文件 | [[#5.1 文本文件]] |
| 63 | 二进制文件：写文件 | [[#5.2 二进制文件]] |
| 64 | 二进制文件：读文件 | [[#5.2 二进制文件]] |

### 6.5 建议学习顺序

1. 先理解内存与引用，能画出变量和对象的大致生命周期。
2. 独立完成立方体与点圆关系案例，练习封装和类的拆分。
3. 用一个拥有动态数组的类练习构造、析构、拷贝与赋值。
4. 手写常见运算符重载，并说明各自应该返回值还是引用。
5. 画出继承、虚继承和动态多态的对象关系。
6. 独立实现计算器或饮品案例，再用智能指针改写电脑组装案例。
7. 最后完成文本和二进制读写，并主动测试文件不存在、数据不完整等失败情况。

> [!summary] 一句话总结
> C++ 核心编程不只是“会写类”，而是学会通过类型和生命周期表达所有权，通过封装维护状态，通过多态隔离变化，并让资源在任何执行路径上都能正确释放。
