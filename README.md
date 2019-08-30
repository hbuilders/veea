# 关于 Veea

- Veea 是 Vue+ElementUI+Electron+Admin 的单词缩写
- 本项目基于 vue-element-admin 优化修改

## Build Setup

```bash
# 克隆项目
git clone https://github.com/720t/veea.git

# 进入项目目录
cd veea

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org
yarn add --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
yarn dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage
yarn build:stage

# 构建生产环境
npm run build:prod
yarn build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview
yarn preview

# 预览发布环境效果 + 静态资源分析
npm run preview --report
yarn preview --report

# 代码格式检查
npm run lint
yarn lint

# 代码格式检查并自动修复
npm run lint:fix
yarn lint:fix

# 启用桌面版开发环境
npm run electron:serve
yarn electron:serve

# 打包生成桌面版
npm run electron:build
yarn electron:build
```
