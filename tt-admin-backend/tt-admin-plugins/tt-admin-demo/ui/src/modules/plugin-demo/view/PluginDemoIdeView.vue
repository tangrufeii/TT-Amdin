<template>
  <div class="ide-root">
    <n-layout has-sider class="ide-layout">
      <n-layout-sider bordered class="ide-sider" :width="260">
        <div class="ide-sider-header">
          <div class="ide-sider-title">{{ t('plugin.demo.ide') }}</div>
          <n-input v-model:value="filterPattern" size="small" :placeholder="t('plugin.demo.ideSearch')" />
        </div>
        <n-tree
          block-line
          animated
          :indent="16"
          :pattern="filterPattern"
          :data="treeData"
          :selected-keys="selectedKeys"
          :expanded-keys="expandedKeys"
          :on-load="handleLoad"
          @update:selected-keys="handleSelect"
          @update:expanded-keys="val => (expandedKeys = val)"
          :node-props="nodeProps"
          :render-prefix="renderPrefix"
        />
      </n-layout-sider>
      <n-layout-content class="ide-content">
        <div class="ide-toolbar">
          <n-space align="center">
            <n-button size="small" type="primary" @click="runFile">{{ t('plugin.demo.ideRun') }}</n-button>
            <n-button size="small" @click="saveFile">{{ t('plugin.demo.ideSave') }}</n-button>
          </n-space>
        </div>
        <div class="ide-tabs" @wheel.prevent="handleTabWheel">
          <div class="ide-tabs-track" ref="tabTrackRef">
            <div
              v-for="file in openFiles"
              :key="file.path"
              class="ide-tab-item"
              :class="{ active: file.path === activeFile }"
              @click="switchFile(file.path)"
              @mousedown.middle.prevent="closeTab(file.path)"
              @contextmenu.prevent="showTabMenu($event, file.path)"
            >
              <span class="ide-tab-title">{{ file.name }}</span>
              <span class="ide-tab-close" @click.stop="closeTab(file.path)">
                <Icon icon="mdi:close" />
              </span>
            </div>
          </div>
        </div>
        <div class="ide-editor">
          <div class="ide-editor-basic">
            <n-input
              v-model:value="fileContent"
              type="textarea"
              class="ide-textarea"
              :autosize="{ minRows: 18 }"
              :placeholder="t('plugin.demo.ideEditorPlaceholder')"
            />
          </div>
        </div>
      </n-layout-content>
    </n-layout>
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="contextMenu.x"
      :y="contextMenu.y"
      :options="contextMenu.options"
      :show="contextMenu.show"
      @clickoutside="hideContextMenu"
      @select="handleMenuSelect"
    />
    <n-dropdown
      placement="bottom-start"
      trigger="manual"
      :x="tabMenu.x"
      :y="tabMenu.y"
      :options="tabMenu.options"
      :show="tabMenu.show"
      @clickoutside="hideTabMenu"
      @select="handleTabMenuSelect"
    />
  </div>
</template>

<script setup lang="ts">
import { h, nextTick, onMounted, reactive, ref } from 'vue';
import { Icon } from '@iconify/vue';
import {
  NButton,
  NDropdown,
  NInput,
  NLayout,
  NLayoutContent,
  NLayoutSider,
  NSpace,
  NTree
} from 'naive-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

type FileItem = {
  path: string;
  name: string;
  language: string;
  content: string;
  directory?: boolean;
};

type TreeNode = {
  key: string;
  label: string;
  isLeaf?: boolean;
  children?: TreeNode[];
  path: string;
  directory?: boolean;
};

const fileIndex = new Map<string, FileItem>();
const nodeIndex = new Map<string, TreeNode>();

const activeFile = ref('');
const selectedKeys = ref<string[]>([]);
let expandedKeys = ref<string[]>(['__root__']);
const filterPattern = ref('');
const openFiles = ref<FileItem[]>([]);
const tabTrackRef = ref<HTMLElement | null>(null);
const loading = ref(false);
const fileContent = ref('');

const treeData = ref<TreeNode[]>([
  {
    key: '__root__',
    label: 'ui',
    path: '',
    directory: true,
    children: []
  }
]);

const contextMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  node: null as TreeNode | null,
  options: [] as { label: string; key: string }[]
});

const tabMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  path: '',
  options: [] as { label: string; key: string }[]
});

const fileIconMap: Record<string, string> = {
  ts: 'mdi:language-typescript',
  tsx: 'mdi:language-typescript',
  js: 'mdi:language-javascript',
  jsx: 'mdi:language-javascript',
  vue: 'mdi:vuejs',
  json: 'mdi:code-json',
  css: 'mdi:language-css3',
  scss: 'mdi:sass',
  less: 'mdi:language-less',
  html: 'mdi:language-html5',
  md: 'mdi:language-markdown',
  yaml: 'mdi:file-code-outline',
  yml: 'mdi:file-code-outline',
  sql: 'mdi:database',
  default: 'mdi:file-outline'
};

function setOpenFile(file: FileItem) {
  const existing = openFiles.value.find(item => item.path === file.path);
  if (!existing) {
    openFiles.value.push(file);
  }
}

function buildNode(item: FileItem): TreeNode {
  const key = item.path;
  const node: TreeNode = {
    key,
    label: item.name,
    path: item.path,
    directory: item.directory,
    isLeaf: !item.directory
  };
  nodeIndex.set(key, node);
  return node;
}

function getFileIcon(name?: string) {
  const ext = (name || '').split('.').pop()?.toLowerCase() || '';
  return fileIconMap[ext] || fileIconMap.default;
}

function renderPrefix(node: TreeNode) {
  if (node.key === '__root__') {
    return h(Icon, { icon: 'mdi:layers-outline', class: 'ide-tree-icon ide-tree-icon-root' });
  }
  if (node.directory) {
    const icon = expandedKeys.value.includes(node.key) ? 'mdi:folder-open' : 'mdi:folder';
    return h(Icon, { icon, class: 'ide-tree-icon ide-tree-icon-folder' });
  }
  return h(Icon, { icon: getFileIcon(node.label), class: 'ide-tree-icon ide-tree-icon-file' });
}

async function handleLoad(node: TreeNode) {
  if (!node.directory) return;
  if (node.children && node.children.length) return;
  const result = await requestApi(`/api/demo/editor/files?path=${encodeURIComponent(node.path)}`, 'GET');
  const list = Array.isArray(result) ? result : [];
  const children = list.map((item: any) => {
    const file = toFileItem(item);
    fileIndex.set(file.path, file);
    return buildNode(file);
  });
  node.children = children;
  if (!nodeIndex.has(node.key)) {
    nodeIndex.set(node.key, node);
  }
}

function nodeProps(node: TreeNode) {
  return {
    onContextmenu: (event: MouseEvent) => {
      event.preventDefault();
      showContextMenu(event, node);
    }
  };
}

function showContextMenu(event: MouseEvent, node: TreeNode) {
  contextMenu.node = node;
  contextMenu.x = event.clientX;
  contextMenu.y = event.clientY;
  const options = [] as { label: string; key: string }[];
  if (node.directory) {
    options.push({ label: t('plugin.demo.ideNewFile'), key: 'newFile' });
    options.push({ label: t('plugin.demo.ideNewDir'), key: 'newDir' });
  }
  if (node.key !== '__root__') {
    options.push({ label: t('plugin.demo.ideRename'), key: 'rename' });
    options.push({ label: t('plugin.demo.ideDelete'), key: 'delete' });
  }
  contextMenu.options = options;
  contextMenu.show = true;
}

function hideContextMenu() {
  contextMenu.show = false;
  contextMenu.node = null;
}

function showTabMenu(event: MouseEvent, path: string) {
  tabMenu.path = path;
  tabMenu.x = event.clientX;
  tabMenu.y = event.clientY;
  tabMenu.options = [
    { label: t('plugin.demo.ideTabClose'), key: 'close' },
    { label: t('plugin.demo.ideTabCloseOthers'), key: 'closeOthers' },
    { label: t('plugin.demo.ideTabCloseRight'), key: 'closeRight' }
  ];
  tabMenu.show = true;
}

function hideTabMenu() {
  tabMenu.show = false;
  tabMenu.path = '';
}

async function handleMenuSelect(action: string) {
  const node = contextMenu.node;
  hideContextMenu();
  if (!node) return;
  if (action === 'newFile') {
    const name = window.prompt(t('plugin.demo.ideNewFilePrompt'));
    if (!name) return;
    await requestApi('/api/demo/editor/file/create', 'POST', { path: node.path, name });
    await refreshNode(node);
    return;
  }
  if (action === 'newDir') {
    const name = window.prompt(t('plugin.demo.ideNewDirPrompt'));
    if (!name) return;
    await requestApi('/api/demo/editor/dir/create', 'POST', { path: node.path, name });
    await refreshNode(node);
    return;
  }
  if (action === 'rename') {
    const name = window.prompt(t('plugin.demo.ideRenamePrompt'), node.label);
    if (!name || name === node.label) return;
    await requestApi('/api/demo/editor/rename', 'POST', { path: node.path, name });
    const parent = getParentNode(node.path);
    await refreshNode(parent);
    return;
  }
  if (action === 'delete') {
    const ok = window.confirm(t('plugin.demo.ideDeleteConfirm'));
    if (!ok) return;
    await requestApi('/api/demo/editor/delete', 'POST', { path: node.path });
    const parent = getParentNode(node.path);
    await refreshNode(parent);
  }
}

function getParentNode(path: string) {
  if (!path) return nodeIndex.get('__root__')!;
  const idx = path.lastIndexOf('/');
  const parentPath = idx > 0 ? path.slice(0, idx) : '';
  return nodeIndex.get(parentPath || '__root__') || nodeIndex.get('__root__')!;
}

async function refreshNode(node: TreeNode) {
  node.children = [];
  await handleLoad(node);
}

function handleSelect(keys: string[]) {
  const fileKey = keys[0];
  if (!fileKey) return;
  const file = fileIndex.get(fileKey);
  if (!file || file.directory) return;
  switchFile(fileKey);
}

function switchFile(path: string) {
  activeFile.value = path;
  selectedKeys.value = [path];
  const file = fileIndex.get(path);
  if (!file) return;
  loadFile(file).then(() => {
    nextTick(() => {
      fileContent.value = file.content || '';
      setOpenFile(file);
    });
  });
}

function closeTab(path: string) {
  const index = openFiles.value.findIndex(item => item.path === path);
  if (index === -1) return;
  openFiles.value.splice(index, 1);
  if (activeFile.value !== path) return;
  const next = openFiles.value[index] || openFiles.value[index - 1];
  if (next) {
    switchFile(next.path);
  } else {
    activeFile.value = '';
    selectedKeys.value = [];
    fileContent.value = '';
  }
}

function handleTabMenuSelect(action: string) {
  const path = tabMenu.path;
  hideTabMenu();
  if (!path) return;
  const index = openFiles.value.findIndex(item => item.path === path);
  if (index === -1) return;
  if (action === 'close') {
    closeTab(path);
    return;
  }
  if (action === 'closeOthers') {
    openFiles.value = openFiles.value.filter(item => item.path === path);
    activeFile.value = path;
    return;
  }
  if (action === 'closeRight') {
    openFiles.value = openFiles.value.slice(0, index + 1);
    if (!openFiles.value.find(item => item.path === activeFile.value)) {
      activeFile.value = path;
    }
  }
}

function handleTabWheel(event: WheelEvent) {
  const track = tabTrackRef.value;
  if (!track) return;
  if (track.scrollWidth <= track.clientWidth) return;
  track.scrollLeft += event.deltaY;
}

function runFile() {
  window.$message?.info(t('plugin.demo.ideRunHint'));
}

async function saveFile() {
  const file = fileIndex.get(activeFile.value);
  if (!file) return;
  const content = fileContent.value;
  try {
    await requestApi('/api/demo/editor/file', 'POST', { path: file.path, content });
    file.content = content;
    window.$message?.success(t('plugin.demo.ideSaveHint'));
  } catch (error) {
    console.error(error);
    window.$message?.error(t('plugin.demo.ideSaveFailed'));
  }
}

function resolveLanguage(path: string) {
  const ext = path.split('.').pop()?.toLowerCase() || '';
  switch (ext) {
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'json':
      return 'json';
    case 'css':
      return 'css';
    case 'scss':
      return 'scss';
    case 'less':
      return 'less';
    case 'html':
      return 'html';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'md':
      return 'markdown';
    case 'sql':
      return 'sql';
    case 'vue':
      return 'vue';
    default:
      return 'plaintext';
  }
}

function toFileItem(item: any): FileItem {
  return {
    path: item.path,
    name: item.name,
    directory: item.directory,
    language: item.directory ? 'plaintext' : resolveLanguage(item.path),
    content: ''
  };
}

async function requestApi(url: string, method: string, body?: any) {
  const pluginRequest = (window as any).__TT_PLUGIN_API__?.request;
  if (pluginRequest) {
    const { data, error } = await pluginRequest<any>({ url, method, data: body });
    if (error) throw error;
    return data;
  }
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) {
    throw new Error(`request failed: ${response.status}`);
  }
  const payload = await response.json();
  return payload?.data ?? payload;
}

async function loadFile(file: FileItem) {
  if (file.content) {
    fileContent.value = file.content;
    return;
  }
  const content = await requestApi(`/api/demo/editor/file?path=${encodeURIComponent(file.path)}`, 'GET');
  file.content = content || '';
  if (file.path === activeFile.value) {
    fileContent.value = file.content || '';
  }
}

async function loadFiles() {
  if (loading.value) return;
  loading.value = true;
  try {
    const result = await requestApi('/api/demo/editor/files?path=', 'GET');
    const list = Array.isArray(result) ? result : [];
    const rootChildren = list.map((item: any) => {
      const file = toFileItem(item);
      fileIndex.set(file.path, file);
      return buildNode(file);
    });
    treeData.value[0].children = rootChildren;
    nodeIndex.set('__root__', treeData.value[0]);
    const firstFile = list.find((item: any) => !item.directory);
    if (firstFile) {
      const file = fileIndex.get(firstFile.path);
      if (file) {
        activeFile.value = file.path;
        selectedKeys.value = [file.path];
        await loadFile(file);
        setOpenFile(file);
      }
    }
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadFiles()
    .catch(error => {
      console.error('[plugin-demo] load files failed', error);
      window.$message?.error(t('plugin.demo.ideLoadFailed'));
    })
    .finally(() => {});
});
</script>

<style scoped>
.ide-root {
  height: 100%;
  min-height: 560px;
  display: flex;
  flex-direction: column;
}

.ide-layout {
  height: 100%;
  min-height: 0;
  flex: 1;
}

.ide-sider {
  padding: 0;
  overflow: hidden;
}

.ide-sider :deep(.n-layout-sider__content) {
  padding: 12px 10px 12px 12px;
  box-sizing: border-box;
  overflow: auto;
}

.ide-sider-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.ide-sider-title {
  font-size: 14px;
  font-weight: 600;
  padding-left: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ide-content {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
  padding: 12px 16px 16px;
  gap: 8px;
}

.ide-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ide-tabs {
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--n-border-color);
  border-radius: 6px;
  background: #fff;
}

.ide-tabs-track {
  display: flex;
  gap: 6px;
  padding: 6px 8px;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  flex: 1;
  scrollbar-width: none;
}

.ide-tabs-track::-webkit-scrollbar {
  display: none;
}

.ide-tab-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid transparent;
  background: #f5f6f8;
  color: #4b5563;
  font-size: 12px;
  cursor: pointer;
  max-width: 180px;
}

.ide-tab-item.active {
  background: #e6f4ff;
  border-color: #91caff;
  color: #1677ff;
}

.ide-tab-title {
  max-width: 140px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ide-tab-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  color: #9ca3af;
}

.ide-tab-close:hover {
  background: #e5e7eb;
  color: #374151;
}
.ide-editor {
  flex: 1;
  min-height: 360px;
  border: 1px solid var(--n-border-color);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.ide-editor-basic {
  flex: 1;
  min-height: 360px;
}

.ide-textarea {
  flex: 1;
  min-height: 360px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
}

.ide-tree-icon {
  font-size: 14px;
  margin-right: 6px;
}

.ide-tree-icon-root {
  color: #8e8e93;
}

.ide-tree-icon-folder {
  color: #f4b400;
}

.ide-tree-icon-file {
  color: #5b8ff9;
}
</style>
