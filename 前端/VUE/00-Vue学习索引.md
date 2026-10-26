# Vue 学习索引

本套笔记从模板语法到组件、路由和综合练习，分别注明 Vue 2 与 Vue 3。建议先掌握 HTML/CSS/JavaScript，再按编号操作。

> 视频参考范围：用户指定的 BV1oz421q7BB 第117集至最后。B站页面和接口在本次访问返回412，未获得逐集目录或字幕；这不是逐集转录或已确认覆盖全部视频内容的笔记。补充分集目录后才能建立准确映射。

## 如何学习

1. 先读原理，打开每篇的配套 HTML 文件。
2. 按预期结果操作，再逐段读代码。不要只复制。
3. 完成练习后展开答案，尝试说明每个状态如何改变。
4. 查看注意事项，再进入下一篇。遇到旧课代码时先核对版本。

## 学习顺序

- [[前端/VUE/01-创建应用与响应式入门|创建应用与响应式入门]]
- [[前端/VUE/02-插值表达式与属性绑定|插值表达式与属性绑定]]
- [[前端/VUE/03-事件绑定与修饰符|事件绑定与修饰符]]
- [[前端/VUE/04-v-model与表单绑定|v-model 与表单绑定]]
- [[前端/VUE/05-条件渲染v-if与v-show|条件渲染 v-if 与 v-show]]
- [[前端/VUE/06-列表渲染与稳定key|列表渲染与稳定 key]]
- [[前端/VUE/07-computed计算属性|computed 计算属性]]
- [[前端/VUE/08-watch与副作用清理|watch 与副作用清理]]
- [[前端/VUE/09-class与style动态样式|class 与 style 动态样式]]
- [[前端/VUE/10-生命周期与nextTick|生命周期与 nextTick]]
- [[前端/VUE/11-组件props与自定义事件|组件 props 与自定义事件]]
- [[前端/VUE/12-slot插槽与作用域插槽|slot 插槽与作用域插槽]]
- [[前端/VUE/13-ref-reactive与组合式API|ref、reactive 与组合式 API]]
- [[前端/VUE/14-Vue2与OptionsAPI完整示例|Vue 2 与 Options API 完整示例]]（Vue 2 专题）
- [[前端/VUE/15-Vue2响应式限制与set|Vue 2 响应式限制与 $set]]（Vue 2 专题）
- [[前端/VUE/16-VueRouter路由基础|Vue Router 路由基础]]
- [[前端/VUE/17-共享状态与provide-inject|共享状态与 provide/inject]]
- [[前端/VUE/18-异步请求与界面状态|异步请求与界面状态]]
- [[前端/VUE/19-SFC与Vite项目结构|SFC 与 Vite 项目结构]]
- [[前端/VUE/20-动态组件KeepAlive与Transition|动态组件、KeepAlive 与 Transition]]
- [[前端/VUE/21-自定义指令与插件|自定义指令与插件]]
- [[前端/VUE/22-综合练习待办清单|综合练习：待办清单]]
- [[前端/VUE/23-Vue2到Vue3语法对照|Vue 2 到 Vue 3 语法对照]]

## 运行与版本说明

配套文件位于 VUE/示例，直接用浏览器打开 HTML。Vue 3.5.13、Vue 2.7.16、Vue Router 4.5.0 运行库保存于 vendor，保留上游许可证注释。选择固定版本是为了复现，并非声称这些是最新版本。Vue 2 已结束官方维护，仅用于读懂旧课程。

SFC 专题中的 .vue 代码需要 Vite 等编译环境；该篇配套 HTML 是等价运行演示。路由示例使用 hash 模式。本地存储在 file URL 下的行为取决于浏览器，稳定测试应使用同一 HTTP 来源。

## 前置知识

[[前端/html/HTML-知识索引]] · [[前端/css/CSS知识索引]] · [[前端/js/JavaScript知识索引]]

## 自检目标

能独立实现一个带增删、筛选、输入校验和存储降级的待办清单；能解释 props 与事件、computed 与 watch、ref 与 reactive、Vue 2 与 Vue 3 初始化的区别。
