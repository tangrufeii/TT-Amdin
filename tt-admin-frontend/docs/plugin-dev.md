# 插件开发说明

## 目标
- 让插件 UI 与宿主风格一致，减少重复适配成本。
- 统一请求、表头、表单、权限与路由规范，避免插件互相“长得不一样”。

## 目录与命名
- 目录建议：`ui/src/modules/<module>/index.ts` + `ui/src/modules/<module>/view/*.vue`。
- 目录使用 `kebab-case`，组件使用 `PascalCase`，组合式函数以 `useX` 开头。
- 模块名、路由名、插件 ID 保持唯一，避免与宿主冲突。

## 运行与构建
- 开发模式：通过 `/plugin-dev` 加载插件 UI。
- 生产模式：通过 `/api/plugin-static` 加载插件 UI。
- UI 构建产物应输出到 `modules` 目录，交由宿主插件加载。

## 统一请求（必须）
插件内请求统一走 `@tt/plugin-sdk`，避免各自封装造成行为不一致。

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

## 基础 API 地址
`getPluginBaseURL()` 规则：
- 如果宿主注入 `window.__TT_PLUGIN_API_BASE__`，直接使用。
- 否则读取 `VITE_SERVICE_BASE_URL` 或 `VITE_API_BASE`。
- 开发环境且 `VITE_HTTP_PROXY=Y` 时使用 `/proxy-default`。

## 统一表头（列表页）
列表页统一使用 `TableHeaderOperation`，按钮权限由 `add-auth / delete-auth / export-auth` 控制。

```vue
<template>
  <TableHeaderOperation
    :loading="loading"
    add-auth="plugin:ai-chat:add"
    delete-auth="plugin:ai-chat:delete"
    export-auth="plugin:ai-chat:export"
    @add="handleAdd"
    @batch-delete="handleBatchDelete"
    @refresh="reload"
  >
    <template #prefix>
      <NButton quaternary @click="openSettings">设置</NButton>
    </template>
  </TableHeaderOperation>
</template>
```

## 统一表单（对齐用户管理）
推荐使用抽屉表单 + 统一页脚按钮，与宿主一致。

```vue
<template>
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
</template>
```

## 权限与 hasAuth
按钮级权限统一通过 `useAuth` 判断：

```ts
import { useAuth } from '@/hooks/business/auth';

const { hasAuth } = useAuth();
const canEdit = computed(() => hasAuth('plugin:ai-chat:update'));
```

建议权限命名格式：`plugin:<pluginId>:<action>`，例如 `plugin:ai-chat:add`。

## i18n
插件内维护 `i18n` 文件，宿主启动后动态加载，避免与宿主 i18n 冲突。

## Markdown 展示
统一使用 `md-editor-v3` 的 `MdPreview` 做展示，避免各插件重复引入不同渲染器。

## 小结
保持目录与风格一致、请求统一、权限命名统一，能显著降低维护成本。
