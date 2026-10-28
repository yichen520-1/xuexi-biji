# TypeScript 可运行示例

环境：Node 20.19+ 或满足当前工具要求的较新版本；本轮在 Node 24 上验证。编译器固定 TypeScript 5.9.3，不代表最新版本。

```sh
npm ci
npm run check
npm test
npm start
```

src/chapters 收录笔记中的完整纯 TS 片段，参与类型检查；src/index.ts 只运行任务解析与不可变更新示例。DOM 相关片段只检查类型，不在 Node 中执行浏览器 API。Vue/TSX 片段分别在框架工程学习。

首次无锁文件的维护者可用 npm install 建立依赖；仓库已带 package-lock.json 时用 npm ci。dist 是生成目录，不提交。
