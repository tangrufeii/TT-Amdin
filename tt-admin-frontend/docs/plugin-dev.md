# 插件开发说明

## 目标
- 保持插件 UI 与宿主风格一致，减少重复适配成本。
- 统一请求、表头、表单、权限与路由规范，避免插件之间“长得不一样”。

## 目录与命名
- 目录建议：`ui/src/modules/<module>/index.ts` + `ui/src/modules/<module>/view/*.vue`。
- 目录使用 `kebab-case`，组件使用 `PascalCase`，组合式函数使用 `useX` 开头。
- 模块名、路由名、插件 ID 保持唯一，避免与宿主冲突。

## 运行与构建
- 开发模式：通过 `/plugin-dev/<pluginId>` 从主前端加载插件源码。
- 生产模式：通过 `/api/plugin-static/<pluginId>/modules/<module>/index.js` 加载插件产物。
- UI 构建产物输出到 `modules` 目录，由宿主统一加载。

## 统一请求（必须）
插件内请求统一使用 `@tt/plugin-sdk`，避免各自封装造成行为不一致。

```ts
import { requestData } from '@tt/plugin-sdk';

type Config = { id: string; name: string };

const data = await requestData<Config>({
  url: '/plugin/ai-chat/config',
  method: 'GET',
  params: { id: '123' }
});
```

- `request`：返回 `{ data, error }`，适合手动处理错误。
- `requestData`：失败时直接抛错，成功返回 `data`。
- 宿主存在 `window.__TT_PLUGIN_API__` 时会走宿主请求；否则使用内置 alova。

## 插件 API 分层（推荐）
每个插件将请求集中到 `api.ts`，视图层只调用方法，避免散落各处。

```ts
// api.ts
import { requestData } from '@tt/plugin-sdk';

export interface DemoRecord {
  /** 主键 ID */
  id?: number;
  /** 名称 */
  name: string;
}

export async function fetchDemoList() {
  return await requestData<DemoRecord[]>({ url: '/plugin/demo/list' });
}
```

```ts
// view.vue
import { fetchDemoList } from './api';
```

## 基础 API 地址
`getPluginBaseURL()` 规则：
- 如宿主注入 `window.__TT_PLUGIN_API_BASE__`，直接使用。
- 否则读取 `VITE_SERVICE_BASE_URL` 或 `VITE_API_BASE`。
- 开发环境且 `VITE_HTTP_PROXY=Y` 时使用 `/proxy-default`。

## 统一表头（列表页）
列表页统一使用 `TableHeaderOperation`，按钮样式与用户管理对齐。

```vue
<TableHeaderOperation
  :loading="loading"
  :checked-row-keys="checkedRowKeys"
  @add="handleAdd"
  @delete="handleBatchDelete"
  @refresh="reload"
/>
```

## 统一表单（对齐用户管理）
## 统一表单容器（PluginFormCard）
列表检索表单与配置表单统一使用 `PluginFormCard`，后续调整表单样式只需修改该组件。

```vue
<PluginFormCard :title="t('plugin.demo.title')" :model="searchParams" :label-width="80">
  <n-grid cols="24" x-gap="16" y-gap="8" responsive="screen">
    <!-- 表单项 -->
  </n-grid>
  <template #actions>
    <n-space justify="end">
      <n-button type="primary" @click="submit">保存</n-button>
      <n-button @click="reset">重置</n-button>
    </n-space>
  </template>
</PluginFormCard>
```

推荐使用抽屉表单 + 统一页脚按钮，与宿主一致。

```vue
<NDrawer :show="visible" width="420" placement="right" @update:show="updateVisible">
  <NDrawerContent :title="isEdit ? '编辑' : '新增'" :closable="true">
    <NForm ref="formRef" :model="model" :rules="rules" label-placement="left" :label-width="100">
      <!-- 表单项 -->
    </NForm>
    <template #footer>
      <NSpace justify="end">
        <NButton @click="close">取消</NButton>
        <NButton type="primary" @click="submit">确认</NButton>
      </NSpace>
    </template>
  </NDrawerContent>
</NDrawer>
```

## 权限与 hasAuth
按钮级权限统一通过 `useAuth` 判断。

```ts
import { useAuth } from '@/hooks/business/auth';

const { hasAuth } = useAuth();
const canEdit = computed(() => hasAuth('plugin:ai-chat:update'));
```

建议权限命名格式：`plugin:<pluginId>:<action>`，例如 `plugin:ai-chat:add`。

## 系统字典访问（统一）
插件统一通过 `@tt/plugin-sdk` 访问系统字典，无需插件自行拼装：

```ts
import { fetchSystemDictOptions } from '@tt/plugin-sdk';

const options = await fetchSystemDictOptions('sys_status');
// options: [{ label, value }]
```

## i18n
插件内维护 `i18n` 文件，宿主启动后动态加载，避免与宿主 i18n 冲突。

## Markdown 展示
统一使用 `md-editor-v3` 的 `MdPreview` 做展示，避免重复引入不同渲染器。

## 为什么采用主前端统一开发模式（PerfreeBlog 同款）
- 只保留一个 Vite 与一个 Vue 运行时，避免多实例导致的 HMR/渲染异常。
- 彻底规避跨域与 MIME 类型问题，开发联调更稳定。
- 表头/表单/按钮样式可与宿主完全一致，避免插件风格漂移。
- 代价是插件不再单独启动 dev server，开发时需要先启动主前端。

## 类型提示与编辑器报错
- 插件 UI 请执行 `pnpm install`，确保依赖与类型完整。
- 若出现图标/NaiveUI 类型报错，请确认 `src/typings` 内已包含基础声明。

## 小结
保持目录与风格一致、请求统一、权限命名统一，可以显著降低维护成本。


## 公共 UI 包（@tt/plugin-ui）
插件统一使用 `@tt/plugin-ui` 复用表头、列配置与表单容器，避免每个插件重复维护。

```ts
import { PluginFormCard, TableHeaderOperation } from '@tt/plugin-ui';
```

## 如何新增公共组件或公共包
### 新增公共组件
1. 在 `tt-admin-frontend/packages/plugin-ui/src/components` 下新增组件文件。
2. 在 `tt-admin-frontend/packages/plugin-ui/src/index.ts` 导出该组件。
3. 插件中通过 `@tt/plugin-ui` 引入即可使用。

### 新增公共包
1. 在 `tt-admin-frontend/packages/<your-package>` 创建包目录并写入 `package.json`。
2. 在插件 `package.json` 增加依赖：
   ```json
   "@tt/<your-package>": "file:../../../../tt-admin-frontend/packages/<your-package>"
   ```
3. 如果需要代码生成支持，更新模板：
   `tt-admin-backend/tt-admin-plugins/tt-admin-codegen/src/main/resources/codegen/templates/ui/package.json.ftl`。
4. 执行 `pnpm install` 让依赖生效。
