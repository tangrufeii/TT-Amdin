<template>
  <div class="webide-page" :class="{ 'webide-theme-dark': isDark }">
    <n-card :bordered="false" size="small" class="webide-card">
      <div class="webide-toolbar">
        <div class="webide-toolbar-left">
          <div class="webide-title">{{ t('plugin.webide.title') }}</div>
          <div class="webide-subtitle">{{ t('plugin.webide.description') }}</div>
        </div>
        <div class="webide-toolbar-right">
          <n-select
            v-model:value="pluginId"
            :options="pluginOptions"
            size="small"
            class="webide-plugin-select"
            :placeholder="t('plugin.webide.selectPlugin')"
            @update:value="handlePluginChange"
          />
          <n-button size="small" :disabled="!currentFile || saving" @click="saveCurrent">
            {{ t('plugin.webide.save') }}
          </n-button>
        </div>
      </div>
    </n-card>

    <n-card :bordered="false" class="webide-card webide-body" content-class="webide-body-content">
      <div class="webide-layout">
        <div class="webide-tree">
          <div class="webide-tree-header">
            <span>{{ t('plugin.webide.fileTree') }}</span>
            <n-button size="tiny" quaternary @click="refreshTree">{{ t('plugin.webide.refresh') }}</n-button>
          </div>
          <n-spin :show="loadingTree">
            <n-tree
              :data="treeData"
              block-line
              key-field="key"
              label-field="label"
              :expanded-keys="expandedKeys"
              :selected-keys="selectedKeys"
              :show-irrelevant-nodes="false"
              class="webide-tree-body"
              :render-prefix="renderPrefix"
              :render-label="renderLabel"
              :node-props="nodeProps"
              @update:selected-keys="handleSelect"
              @update:expanded-keys="handleExpand"
            />
          </n-spin>
        </div>
        <div class="webide-editor">
          <div class="webide-editor-header">
            <div class="webide-editor-title">
              {{ currentFile || t('plugin.webide.emptyFile') }}
            </div>
            <div v-if="isDirty" class="webide-dirty">{{ t('plugin.webide.unsaved') }}</div>
          </div>
          <div ref="editorContainer" class="webide-editor-body"></div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { h, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import { NButton, NCard, NSelect, NSpin, NTree } from 'naive-ui';
import { useI18n } from 'vue-i18n';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/min/vs/editor/editor.main.css';
import { Icon } from '@iconify/vue';

type PluginInfo = {
  id: string;
  name: string;
  uiPath: string;
};

type WebIdeFileNode = {
  path: string;
  name: string;
  directory: boolean;
};

type TreeNode = {
  key: string;
  label: string;
  isLeaf: boolean;
  children?: TreeNode[];
};

const { t } = useI18n();
const pluginId = ref('');
const pluginOptions = ref<{ label: string; value: string }[]>([]);
const treeData = ref<TreeNode[]>([]);
const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
const loadingTree = ref(false);
const saving = ref(false);
const currentFile = ref('');
const isDirty = ref(false);
const isDark = ref(false);
const editorContainer = ref<HTMLElement | null>(null);
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null);
const currentModel = shallowRef<monaco.editor.ITextModel | null>(null);
let modelDisposable: monaco.IDisposable | null = null;
let themeObserver: MutationObserver | null = null;
const runtimeApiBase = window.location.port === '9527' ? '/proxy-default/api' : '/api';
const apiBase = (import.meta.env.VITE_WEBIDE_API_BASE as string) || runtimeApiBase;

const fileIconMap: Record<string, string> = {
  ts: 'vscode-icons:file-type-typescript',
  tsx: 'vscode-icons:file-type-typescript',
  js: 'vscode-icons:file-type-js',
  jsx: 'vscode-icons:file-type-js',
  vue: 'vscode-icons:file-type-vue',
  json: 'vscode-icons:file-type-json',
  md: 'vscode-icons:file-type-markdown',
  css: 'vscode-icons:file-type-css',
  scss: 'vscode-icons:file-type-scss',
  less: 'vscode-icons:file-type-less',
  html: 'vscode-icons:file-type-html',
  yml: 'vscode-icons:file-type-yaml',
  yaml: 'vscode-icons:file-type-yaml',
  xml: 'vscode-icons:file-type-xml',
  java: 'vscode-icons:file-type-java',
  sql: 'vscode-icons:file-type-sql',
  txt: 'vscode-icons:file-type-text'
};

const globalAny = self as unknown as { MonacoEnvironment?: monaco.Environment };
globalAny.MonacoEnvironment = {
  getWorker: (_moduleId, label) => {
    if (label === 'json') return new jsonWorker();
    if (label === 'css' || label === 'scss' || label === 'less') return new cssWorker();
    if (label === 'html' || label === 'handlebars' || label === 'razor') return new htmlWorker();
    if (label === 'typescript' || label === 'javascript') return new tsWorker();
    return new editorWorker();
  }
};

function notifySuccess(message: string) {
  const globalMessage = (window as any)?.$message;
  if (globalMessage?.success) {
    globalMessage.success(message);
    return;
  }
  console.info(message);
}

function notifyError(message: string) {
  const globalMessage = (window as any)?.$message;
  if (globalMessage?.error) {
    globalMessage.error(message);
    return;
  }
  console.error(message);
}

function resolveLanguage(path: string) {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  if (ext === 'ts' || ext === 'tsx') return 'typescript';
  if (ext === 'js' || ext === 'jsx') return 'javascript';
  if (ext === 'json') return 'json';
  if (ext === 'css' || ext === 'scss' || ext === 'less') return ext;
  if (ext === 'html' || ext === 'vue') return 'html';
  if (ext === 'md') return 'markdown';
  return 'plaintext';
}

function resolveFileIcon(path: string) {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  return fileIconMap[ext] || 'vscode-icons:file-type-text';
}

function renderPrefix({ option }: { option: TreeNode }) {
  if (!option.isLeaf) {
    const open = expandedKeys.value.includes(option.key);
    return h(Icon, {
      icon: open ? 'vscode-icons:default-folder-opened' : 'vscode-icons:default-folder',
      class: 'webide-tree-icon webide-tree-icon-folder'
    });
  }
  return h(Icon, { icon: resolveFileIcon(option.key), class: 'webide-tree-icon' });
}

function renderLabel({ option }: { option: TreeNode }) {
  return h('span', { class: 'webide-tree-label', title: option.label }, option.label);
}

function nodeProps({ option }: { option: TreeNode }) {
  return {
    class: option.isLeaf ? 'webide-tree-node' : 'webide-tree-node webide-tree-node-folder'
  };
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  });

  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();

  let json: any = null;
  if (text) {
    try {
      json = JSON.parse(text);
    } catch {
      throw new Error(`接口返回非JSON: ${response.status} ${response.statusText}`);
    }
  }

  if (!contentType.includes('application/json') || !json) {
    throw new Error(`接口返回非JSON: ${response.status} ${response.statusText}`);
  }

  if (!response.ok || json?.code !== 200) {
    throw new Error(json?.message || '请求失败');
  }
  return json.data as T;
}

async function fetchPlugins() {
  const data = await request<PluginInfo[]>(`${apiBase}/webide/editor/plugins`);
  pluginOptions.value = data.map(item => ({
    label: item.name || item.id,
    value: item.id
  }));
  if (!pluginId.value && pluginOptions.value.length > 0) {
    pluginId.value = pluginOptions.value[0].value;
  }
}

async function listChildren(path?: string) {
  const search = new URLSearchParams();
  if (pluginId.value) search.set('pluginId', pluginId.value);
  if (path) search.set('path', path);
  return request<WebIdeFileNode[]>(`${apiBase}/webide/editor/files?${search.toString()}`);
}

function normalizeNodes(nodes: WebIdeFileNode[]): TreeNode[] {
  return nodes.map(item => ({
    key: item.path,
    label: item.name,
    isLeaf: !item.directory,
    children: item.directory ? [] : undefined
  }));
}

function replaceChildren(nodes: TreeNode[], key: string, children: TreeNode[]): TreeNode[] {
  return nodes.map(node => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children && node.children.length > 0) {
      return { ...node, children: replaceChildren(node.children, key, children) };
    }
    return node;
  });
}

async function refreshTree() {
  if (!pluginId.value) return;
  loadingTree.value = true;
  try {
    const data = await listChildren();
    treeData.value = normalizeNodes(data);
    expandedKeys.value = [];
    selectedKeys.value = [];
  } catch (error: any) {
    notifyError(error?.message || t('plugin.webide.loadFail'));
  } finally {
    loadingTree.value = false;
  }
}

async function loadChildren(path: string) {
  const data = await listChildren(path);
  treeData.value = replaceChildren(treeData.value, path, normalizeNodes(data));
}

async function handleSelect(keys: string[], _options: unknown, meta: any) {
  const node = meta?.node as TreeNode | undefined;
  if (!node || !node.isLeaf) return;
  if (isDirty.value && !window.confirm(t('plugin.webide.confirmLeave'))) {
    return;
  }
  selectedKeys.value = keys;
  await openFile(node.key);
}

async function handleExpand(keys: string[], _options: unknown, meta: any) {
  expandedKeys.value = keys;
  const node = meta?.node as TreeNode | undefined;
  if (!node || node.isLeaf) return;
  if (!node.children || node.children.length === 0) {
    await loadChildren(node.key);
  }
}

async function openFile(path: string) {
  if (!pluginId.value) return;
  const search = new URLSearchParams();
  search.set('pluginId', pluginId.value);
  search.set('path', path);
  const content = await request<string>(`${apiBase}/webide/editor/file?${search.toString()}`);
  currentFile.value = path;
  isDirty.value = false;
  if (modelDisposable) {
    modelDisposable.dispose();
    modelDisposable = null;
  }
  if (currentModel.value) {
    currentModel.value.dispose();
  }
  const model = monaco.editor.createModel(content ?? '', resolveLanguage(path));
  currentModel.value = model;
  editor.value?.setModel(model);
  modelDisposable = editor.value?.onDidChangeModelContent(() => {
    isDirty.value = true;
  }) || null;
}

async function saveCurrent() {
  if (!pluginId.value || !currentFile.value || !editor.value) return;
  saving.value = true;
  try {
    const payload = {
      pluginId: pluginId.value,
      path: currentFile.value,
      content: editor.value.getValue()
    };
    await request(`${apiBase}/webide/editor/file`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    isDirty.value = false;
    notifySuccess(t('plugin.webide.saveSuccess'));
  } catch (error: any) {
    notifyError(error?.message || t('plugin.webide.saveFail'));
  } finally {
    saving.value = false;
  }
}

async function handlePluginChange() {
  if (isDirty.value && !window.confirm(t('plugin.webide.confirmLeave'))) {
    return;
  }
  currentFile.value = '';
  isDirty.value = false;
  if (currentModel.value) {
    currentModel.value.dispose();
    currentModel.value = null;
  }
  editor.value?.setModel(null);
  await refreshTree();
}

onMounted(async () => {
  const applyTheme = () => {
    const root = document.documentElement;
    const body = document.body;
    const attrTheme = root.getAttribute('data-theme') || body.getAttribute('data-theme');
    const hasDarkClass =
      root.classList.contains('dark') ||
      body.classList.contains('dark') ||
      root.classList.contains('theme-dark') ||
      body.classList.contains('theme-dark');
    isDark.value = attrTheme === 'dark' || hasDarkClass;
    monaco.editor.setTheme(isDark.value ? 'vs-dark' : 'vs');
  };
  if (editorContainer.value) {
    editor.value = monaco.editor.create(editorContainer.value, {
      theme: 'vs',
      language: 'plaintext',
      automaticLayout: true,
      fontSize: 13,
      minimap: { enabled: false },
      scrollBeyondLastLine: false
    });
  }
  applyTheme();
  themeObserver = new MutationObserver(applyTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class', 'data-theme'] });
  await fetchPlugins();
  await refreshTree();
});

onBeforeUnmount(() => {
  modelDisposable?.dispose();
  currentModel.value?.dispose();
  editor.value?.dispose();
  themeObserver?.disconnect();
});
</script>

<style scoped>
.webide-page {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 560px;
  background: var(--webide-bg);
}

.webide-card {
  border-radius: 8px;
}

.webide-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.webide-toolbar-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.webide-toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.webide-plugin-select {
  min-width: 220px;
}

.webide-title {
  font-size: 16px;
  font-weight: 600;
}

.webide-subtitle {
  color: #6b7280;
  font-size: 12px;
}

.webide-body {
  flex: 1;
}

.webide-body-content {
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.webide-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 8px;
  min-height: 520px;
  height: 100%;
}

.webide-tree {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--webide-border);
  padding: 10px 8px;
  gap: 8px;
  min-height: 0;
  background: var(--webide-panel);
}

.webide-tree-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: var(--webide-muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  padding: 4px 6px;
}

.webide-tree-body {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

:deep(.webide-tree-label) {
  display: inline-block;
  width: 100%;
  min-width: 0;
  font-size: 12px;
  color: var(--webide-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.webide-tree-icon) {
  font-size: 16px;
  display: inline-flex;
  color: var(--webide-icon);
}

:deep(.webide-tree-icon-folder) {
  color: var(--webide-folder);
}

.webide-editor {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.webide-editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid var(--webide-border);
  font-size: 12px;
  color: var(--webide-muted);
}

.webide-editor-title {
  font-weight: 600;
  color: var(--webide-text);
  font-size: 13px;
}

.webide-dirty {
  color: #f97316;
  font-weight: 600;
}

.webide-editor-body {
  flex: 1;
  min-height: 420px;
}

.webide-theme-dark {
  --webide-bg: #0f1115;
  --webide-panel: #141821;
  --webide-border: #1f2533;
  --webide-text: #e5e7eb;
  --webide-muted: #94a3b8;
  --webide-icon: #cbd5f5;
  --webide-folder: #fbbf24;
}

.webide-page:not(.webide-theme-dark) {
  --webide-bg: #f5f7fb;
  --webide-panel: #fafafa;
  --webide-border: #e5e7eb;
  --webide-text: #1f2937;
  --webide-muted: #6b7280;
  --webide-icon: #6b7280;
  --webide-folder: #c9a400;
}

:deep(.webide-tree-body .n-tree-node) {
  padding: 0 6px;
  height: 26px;
  border-radius: 4px;
}

:deep(.webide-tree-body .n-tree-node-content) {
  display: flex;
  align-items: center;
  min-width: 0;
  padding: 0;
  gap: 6px;
}

:deep(.webide-tree-body .n-tree-node-content__text) {
  flex: 1 1 auto;
  min-width: 0;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

:deep(.webide-tree-body .n-tree-node-content__text > *) {
  display: block;
  min-width: 0;
  width: 100%;
}

:deep(.webide-tree-body .n-tree-node:hover) {
  background: #f3f4f6;
}

:deep(.webide-tree-body .n-tree-node--selected) {
  background: #e5f0ff;
}

:deep(.webide-tree-body .n-tree-node--selected .webide-tree-label) {
  color: #1d4ed8;
}

:deep(.webide-tree-body .n-tree-node-switcher) {
  width: 18px;
}

:deep(.webide-tree-body .n-tree-node-content__prefix) {
  width: 18px;
  min-width: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
