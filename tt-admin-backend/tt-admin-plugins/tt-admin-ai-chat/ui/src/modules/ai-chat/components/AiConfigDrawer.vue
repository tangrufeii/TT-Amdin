<template>
  <n-drawer v-model:show="visible" placement="right" :width="420" class="ai-config-drawer">
    <n-drawer-content title="模型设置" closable>
      <div v-if="!form.hasApiKey" class="ai-config-tip">
        API Key 仅本地保存并加密，未配置将无法对话。
      </div>

      <n-form label-placement="top" size="small">
        <n-form-item label="Provider">
          <n-select
            v-model:value="form.provider"
            :options="providerOptions"
            @update:value="handleProviderChange"
          />
        </n-form-item>

        <n-form-item label="Base URL">
          <n-input v-model:value="form.baseUrl" placeholder="https://api.openai.com" />
        </n-form-item>

        <n-form-item label="API Key">
          <n-input v-model:value="form.apiKey" type="password" placeholder="sk-..." />
          <div v-if="form.hasApiKey" class="ai-form-hint">已保存旧 Key，留空则保持</div>
        </n-form-item>

        <n-form-item v-if="form.provider === 'azure'" label="Azure Deployment">
          <n-input v-model:value="form.azureDeployment" placeholder="gpt-35-turbo" />
        </n-form-item>

        <n-form-item v-if="form.provider === 'azure'" label="Azure API Version">
          <n-input v-model:value="form.azureApiVersion" placeholder="2024-05-01-preview" />
        </n-form-item>

        <n-form-item label="Model">
          <n-input v-model:value="form.model" placeholder="gpt-3.5-turbo" />
        </n-form-item>

        <n-form-item label="Temperature">
          <n-input-number
            v-model:value="form.temperature"
            :min="0"
            :max="2"
            :step="0.1"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="Max Tokens">
          <n-input-number
            v-model:value="form.maxTokens"
            :min="0"
            style="width: 100%"
          />
        </n-form-item>

        <n-form-item label="System Prompt">
          <n-input
            v-model:value="form.systemPrompt"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="设置 AI 的角色和行为..."
          />
        </n-form-item>
      </n-form>

      <template #footer>
        <n-space justify="end">
          <n-button secondary @click="handleCancel">取消</n-button>
          <n-button type="primary" :loading="saving" @click="handleSave">保存</n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import {
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSpace,
  NButton
} from 'naive-ui';
import type { ConfigForm } from '../api';

const props = defineProps<{
  show: boolean;
  config: ConfigForm;
}>();

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'save', config: ConfigForm): void;
}>();

const visible = ref(props.show);
const saving = ref(false);

const form = reactive<ConfigForm>({
  provider: 'openai',
  baseUrl: 'https://api.openai.com',
  apiKey: '',
  hasApiKey: false,
  model: 'gpt-3.5-turbo',
  temperature: 0.7,
  maxTokens: undefined,
  systemPrompt: '',
  azureDeployment: '',
  azureApiVersion: ''
});

const providerOptions = [
  { label: 'OpenAI 兼容', value: 'openai' },
  { label: 'DeepSeek (OpenAI 兼容)', value: 'deepseek' },
  { label: 'Azure OpenAI', value: 'azure' }
];

const providerDefaults: Record<string, { baseUrl: string; model: string }> = {
  openai: { baseUrl: 'https://api.openai.com', model: 'gpt-3.5-turbo' },
  deepseek: { baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
  azure: { baseUrl: '', model: '' }
};

watch(() => props.show, (val) => {
  visible.value = val;
  if (val) {
    syncConfig();
  }
});

watch(visible, (val) => {
  emit('update:show', val);
});

watch(() => props.config, () => {
  syncConfig();
}, { deep: true });

function syncConfig() {
  form.provider = props.config.provider || 'openai';
  form.baseUrl = props.config.baseUrl || 'https://api.openai.com';
  form.apiKey = '';
  form.hasApiKey = props.config.hasApiKey;
  form.model = props.config.model || 'gpt-3.5-turbo';
  form.temperature = props.config.temperature ?? 0.7;
  form.maxTokens = props.config.maxTokens;
  form.systemPrompt = props.config.systemPrompt || '';
  form.azureDeployment = props.config.azureDeployment || '';
  form.azureApiVersion = props.config.azureApiVersion || '';
}

function handleProviderChange(value: string) {
  const defaults = providerDefaults[value];
  if (defaults) {
    form.baseUrl = defaults.baseUrl;
    form.model = defaults.model;
  }
}

function handleCancel() {
  visible.value = false;
}

async function handleSave() {
  saving.value = true;
  try {
    emit('save', { ...form });
    visible.value = false;
  } finally {
    saving.value = false;
  }
}
</script>
