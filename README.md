# vue36-enterprise-admin

> 基于 **Vue 3.5 + Vite 8 + TypeScript + Ant Design Vue 4** 的企业级后台管理模板。
> 核心不是"堆组件"，而是**用 DDD 四层架构约束依赖方向，用 TDD 把领域层覆盖率拉满**。

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-blueviolet.svg)](https://vite.dev/)
[![oxlint](https://img.shields.io/badge/lint-oxlint-1f6feb.svg)](https://oxc.rs/)
[![Vitest](https://img.shields.io/badge/test-vitest-6e9f18.svg)](https://vitest.dev/)

---

## 为什么又是一个后台模板？

GitHub 上的 admin 模板绝大多数是"**页面集合**"：路由写死、逻辑堆在 `.vue` 里、改一个字段要翻五个文件、没有任何测试。

本模板试图回答一个不同的问题：**当业务复杂度上升时，UI 层如何不被业务逻辑拖垮？**

答案是两件事：

1. **DDD 四层架构**——表现层 / 应用层 / 领域层 / 基础设施层，依赖严格单向向下，领域层不认识任何框架。
2. **TDD 质量门禁**——领域层 100% 行覆盖，全局 ≥80%，用 `vitest` + `v8 coverage` 强制卡口。

---

## 特性亮点

| 亮点 | 说明 |
| --- | --- |
| **DDD 四层架构** | `presentation` → `application` → `domain` ← `infrastructure`，依赖倒置，领域层零框架依赖 |
| **领域建模完整** | `BaseEntity` / `BaseValueObject` / `Result` 基类 + 枚举与中文标签配对，实体自带 `equals` |
| **TDD 门禁** | 领域层 100% 覆盖目标，仓储实现用 `vi.mock('@infra/http')` 隔离测试 |
| **oxlint 极速 Lint** | 替代 ESLint，毫秒级；`--deny-warnings` 让警告也失败 |
| **仓储模式** | 接口定义在 `domain/`，实现落在 `infrastructure/repositories/`，换后端只改实现 |
| **权限指令** | `v-auth` 指令 + `utils/permission.ts`，按钮级权限控制 |
| **现代工具链** | Pinia 3、Vue Router 4、VueUse 12、Tailwind CSS 4、unplugin 自动导入 |

---

## 技术栈

| 分类 | 选型 | 版本 |
| --- | --- | --- |
| 框架 | Vue | ^3.5（3.6 已 GA，暂未升级，见「版本说明」） |
| 构建 | Vite | ^8.1 |
| 语言 | TypeScript | ^5.9（非 7.x，原因见「版本说明」） |
| UI | Ant Design Vue + @ant-design/icons-vue | ^4.2 / ^7 |
| 状态 | Pinia | ^3 |
| 路由 | Vue Router | ^4 |
| 请求 | Axios | ^1.7 |
| Lint | oxlint | ^1 |
| 测试 | Vitest + @vue/test-utils + jsdom | ^3 / ^2.4 / ^25 |

---

## 架构：四层与依赖方向

```
┌─────────────────────────────────────────────┐
│  presentation   页面 / 组件 / 路由 / 布局     │
│  views · components · layouts · router      │
└──────────────────┬──────────────────────────┘
                   ↓ 依赖
┌─────────────────────────────────────────────┐
│  application    用例编排（不含业务规则）      │
│  services · dto                             │
└──────────────────┬──────────────────────────┘
                   ↓ 依赖
┌─────────────────────────────────────────────┐
│  domain         领域模型（零框架依赖）        │
│  entities · value objects · repository 接口  │
└──────────────────▲──────────────────────────┘
                   │ 实现接口
┌──────────────────┴──────────────────────────┐
│  infrastructure  HTTP / 缓存 / 存储 / 日志    │
│  http · repositories · cache · storage      │
└─────────────────────────────────────────────┘
```

**依赖规则**：箭头只能向下。领域层**禁止** import 任何 `vue` / `axios` / UI 组件。

---

## 目录结构

```
src/
├── application/                 # 应用层：用例编排
│   ├── dto/user.dto.ts          #   数据传输对象
│   └── services/                #   应用服务
├── domain/                      # 领域层：业务核心（零框架依赖）
│   ├── shared/                  #   BaseEntity / BaseValueObject / Result
│   ├── user/                    #   用户聚合（entity + value object + 仓储接口）
│   ├── role/ dept/ menu/ dict/  #   角色 / 部门 / 菜单 / 字典
│   └── */__tests__/             #   领域层单测
├── infrastructure/              # 基础设施层
│   ├── http/                    #   Axios 封装
│   ├── repositories/            #   仓储实现（依赖倒置落地处）
│   ├── cache/ storage/ logger/  #   缓存 / 存储 / 日志
├── presentation/                # 表现层
│   ├── layouts/ views/          #   布局与页面
│   ├── components/              #   ProTable / PageContainer / ErrorFallback
│   ├── router/                  #   路由与守卫
│   ├── directives/              #   v-auth
│   └── styles/
├── stores/                      # Pinia stores
├── utils/                       # 通用工具
└── test/setup.ts                # 测试环境
```

---

## 快速开始

**环境要求**：Node.js >= 22（Vite 8 要求），包管理器推荐 pnpm 9+。

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 类型检查
pnpm typecheck

# Lint（含 --deny-warnings）
pnpm lint

# 运行测试
pnpm test

# 覆盖率报告
pnpm test:coverage

# 生产构建
pnpm build
```

---

## 测试策略与门禁

| 层次 | 覆盖目标 | 手段 |
| --- | --- | --- |
| `domain/` | **100% 行覆盖** | 纯函数式单测，无框架依赖，最快最稳 |
| `infrastructure/repositories/` | ≥80% | `vi.mock('@infra/http')` 隔离，只测映射与分支 |
| 全局 | ≥80% | `vitest run --coverage`（v8 provider） |

仓储实现测试范式：

```ts
vi.mock('@infra/http', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))
```

> **说明**：本模板先写测试再写实现（TDD）。领域层测试随实体一同提交，不事后补。

---

## 版本说明（重要）

`docs/` 中的原始规格文档按"最新预发布版本"编写，实际落地时按**可安装稳定版**做了如下调整，请以本 README 与 `package.json` 为准：

| 规格文档写法 | 实际落地 | 原因 |
| --- | --- | --- |
| `vue@^3.6` | `vue@^3.5` | 开发早期 3.6 尚未 GA，故先采用 3.5 稳定线；现 3.6 已于 2026-07-18 正式 GA，但 Vapor Mode 为 opt-in 不影响现有代码，出于生态/工具链回归稳定考虑暂未升级（详见下方「Vue 3.6 与 TypeScript 7 说明」） |
| `vue-router@^5` | `vue-router@^4` | Router 5 尚未稳定 |
| `typescript@^7` | `typescript@^5.9` | TS 7.0 为 Go 原生重写，无稳定 programmatic API，vue-tsc/Volar 模板类型检查暂不支持（vuejs/language-tools #5381），需等 7.1（计划 2026-11-10）；vue-tsc 3 的 peer 为 `typescript >=5.0.0`，故锁定 5.9 |
| `oxlint@^4` | `oxlint@^1` | oxlint 最新稳定为 1.x |
| `@oxlint/vite-plugin-vue` | **已移除** | 该包在 npm 上不存在，保留会导致配置加载崩溃 |

### Vue 3.6 与 TypeScript 7 说明

> 这两点常被误判为「项目落后 / 未跟进」，实际上均为**工具链兼容性**选择，与项目业务代码无关。

**① 为什么用 Vue 3.5 而不是 3.6**

- `vue@^3.6` 是 `docs/` 原始规格文档按「最新预发布版本」写的。本项目启动落地时 3.6 尚未 GA，故选用 3.5 稳定线。
- 截至 2026-07-18，**Vue 3.6 已在上海 Vue&ViteConf 2026 正式 GA**（尤雨溪宣布），核心特性为 **Vapor Mode**（跳过虚拟 DOM）+ alien-signals 响应式引擎。
- **当前不升级 3.6 的原因**：Vapor Mode 是 **opt-in**（默认不开启），升级不会破坏现有基于虚拟 DOM 的代码；是否升级取决于生态回归与回归测试成本，而非技术阻塞。项目后续可在回归充分后平滑升级到 3.6。

**② 为什么用 TypeScript 5.9 而不是 7.x**

- `typescript@^7` 同样是原始文档按「最新版本」写的。实际落地锁定 `^5.9`。
- **TypeScript 7.0 已于 2026-07-08 发布**，是 Go 原生重写（Project Corsa），主打 8–12x 提速。
- **关键阻塞**：TS 7.0 **没有提供稳定的 programmatic API**，而 `vue-tsc` / Volar 的 SFC 模板类型检查**强依赖**该 API（vuejs/language-tools issue #5381）。这意味着：
  - 一旦项目使用 TS 7.x，`vue-tsc` 的模板类型检查**完全不可用**；
  - `typescript-eslint`、`ts-jest` 等同链路工具也同样被阻塞。
- TS 7.1（计划 2026-11-10）才会补齐稳定 programmatic API，届时 `vue-tsc` 方可支持。
- 因此本项目**必须用 TS 6.x 系列（即 5.9）**。需注意 `vue-tsc 3` 的 peer 依赖声明为 `typescript >=5.0.0`，5.9 完全满足；使用 `npx vue-tsc` 会自动拉取最新版并附带 TS 7，会触发 `./lib/tsc` not exported 报错，故务必走 `./node_modules/.bin/vue-tsc`。

---

## 当前完成度与路线图

| 模块 | 状态 | 说明 |
| --- | --- | --- |
| 用户管理 | ✅ 完整 | 实体 + 值对象 + 仓储接口/实现 + 应用服务 + 列表页 |
| 角色管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 部门管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 菜单管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 字典管理 | ✅ 完整 | 字典类型 + 字典项双表 CRUD（仓储/服务/页面/动态路由白名单） |
| 动态路由 | ✅ 已实现 | 后端菜单驱动 `addRoute`，失败自动降级静态路由 |
| RBAC 按钮级权限 | ✅ 已建 | `v-auth` 指令 |

路线图：
- [x] 角色 / 部门 / 菜单 CRUD 全量落地
- [x] 后端菜单驱动的动态路由 + 权限守卫联动
- [x] 字典管理 CRUD（字典类型 + 字典项双表）
- [ ] E2E（Playwright）补充
- [ ] 文档站

---

## 许可证

[MIT](./LICENSE) © 2026 vue36-enterprise-admin contributors
