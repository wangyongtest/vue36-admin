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
| 框架 | Vue | ^3.5 |
| 构建 | Vite | ^8.1 |
| 语言 | TypeScript | ^7 |
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

**环境要求**：Node.js >= 22（Vite 8 / TypeScript 7 要求），包管理器推荐 pnpm 9+。

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
| `vue@^3.6` | `vue@^3.5` | 3.6 当时仅 RC，无稳定版 |
| `vue-router@^5` | `vue-router@^4` | Router 5 尚未稳定 |
| `oxlint@^4` | `oxlint@^1` | oxlint 最新稳定为 1.x |
| `@oxlint/vite-plugin-vue` | **已移除** | 该包在 npm 上不存在，保留会导致配置加载崩溃 |

---

## 当前完成度与路线图

| 模块 | 状态 | 说明 |
| --- | --- | --- |
| 用户管理 | ✅ 完整 | 实体 + 值对象 + 仓储接口/实现 + 应用服务 + 列表页 |
| 角色管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 部门管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 菜单管理 | ✅ 完整 | 仓储接口/实现 + 应用服务 + 增删改查页面 |
| 字典管理 | 🟡 领域层已建 | 实体与单测就绪，CRUD 待落地 |
| 动态路由 | ✅ 已实现 | 后端菜单驱动 `addRoute`，失败自动降级静态路由 |
| RBAC 按钮级权限 | ✅ 已建 | `v-auth` 指令 |

路线图：
- [x] 角色 / 部门 / 菜单 CRUD 全量落地
- [x] 后端菜单驱动的动态路由 + 权限守卫联动
- [ ] 字典管理 CRUD
- [ ] E2E（Playwright）补充
- [ ] 文档站

---

## 许可证

[MIT](./LICENSE) © 2026 vue36-enterprise-admin contributors
