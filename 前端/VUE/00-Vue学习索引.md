# VUE学习索引

主线为尚硅谷 Vue3＋TypeScript 71 集课程。现有 Vue2/基础演示继续保留作对照，新增 TS、Pinia、路由进阶与响应式边界专题。目录按真实分集核对，但正文不是字幕逐句整理。

> **读法**：先讲是什么与为什么，再看完整执行过程，随后比较差异与错误写法，最后独立完成练习。代码块用于阅读；可运行工程见“示例”。

---

<span style="background-color:rgb(255, 249, 227)">一：学习路线</span>

### 基础与旧项目对照

- [[前端/VUE/01-创建应用与响应式入门|01-创建应用与响应式入门]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/02-插值表达式与属性绑定|02-插值表达式与属性绑定]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/03-事件绑定与修饰符|03-事件绑定与修饰符]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/04-v-model与表单绑定|04-v-model与表单绑定]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/05-条件渲染v-if与v-show|05-条件渲染v-if与v-show]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/06-列表渲染与稳定key|06-列表渲染与稳定key]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/07-computed计算属性|07-computed计算属性]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/08-watch与副作用清理|08-watch与副作用清理]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/09-class与style动态样式|09-class与style动态样式]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/10-生命周期与nextTick|10-生命周期与nextTick]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/11-组件props与自定义事件|11-组件props与自定义事件]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/12-slot插槽与作用域插槽|12-slot插槽与作用域插槽]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/13-ref-reactive与组合式API|13-ref-reactive与组合式API]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/14-Vue2与OptionsAPI完整示例|14-Vue2与OptionsAPI完整示例]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/15-Vue2响应式限制与set|15-Vue2响应式限制与set]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/16-VueRouter路由基础|16-VueRouter路由基础]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/17-共享状态与provide-inject|17-共享状态与provide-inject]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/18-异步请求与界面状态|18-异步请求与界面状态]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/19-SFC与Vite项目结构|19-SFC与Vite项目结构]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/20-动态组件KeepAlive与Transition|20-动态组件KeepAlive与Transition]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/21-自定义指令与插件|21-自定义指令与插件]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/22-综合练习待办清单|22-综合练习待办清单]]：原有讲解、可运行 HTML 与新增机制辨析
- [[前端/VUE/23-Vue2到Vue3语法对照|23-Vue2到Vue3语法对照]]：原有讲解、可运行 HTML 与新增机制辨析

### Vue3＋TS 课程主线补全

- [[前端/VUE/24-Vue3与TS工程及script-setup|24-Vue3与TS工程及script-setup]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/25-watch五类源与watchEffect|25-watch五类源与watchEffect]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/26-组件通信七种方式与TS契约|26-组件通信七种方式与TS契约]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/27-Pinia状态action与storeToRefs|27-Pinia状态action与storeToRefs]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/28-浅层只读原始对象与customRef|28-浅层只读原始对象与customRef]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/29-Teleport-Suspense与Vue3迁移|29-Teleport-Suspense与Vue3迁移]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/30-Router4参数嵌套与部署|30-Router4参数嵌套与部署]]：结合明确课程主题、类型契约和工程案例深入学习
- [[前端/VUE/31-Vue3-TS综合任务板|31-Vue3-TS综合任务板]]：结合明确课程主题、类型契约和工程案例深入学习

---

<span style="background-color:rgb(255, 249, 227)">二：课程与本地运行</span>

- [[前端/VUE/00-课程目录与来源说明|完整分集目录、原标题与来源边界]]
- 示例代码的环境、安装和运行命令见本目录“示例/README.md”。依赖锁文件用于复现，不表示推荐长期固定在旧版本。

---

<span style="background-color:rgb(255, 249, 227)">三：学会的标准</span>

能追踪响应式引用链，区分 computed 与 watch；能在组件通信、路由和 Pinia 之间分配职责；能把类型明确的组件、异步状态与可验证的界面串起来。