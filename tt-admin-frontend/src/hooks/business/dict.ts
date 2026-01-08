import { computed, h } from 'vue';
import { NTag, NText } from 'naive-ui';
import { useDictStore } from '@/store/modules/dict';
import { useAppStore } from '@/store/modules/app';

export function useDict() {
  const dictStore = useDictStore();
  const appStore = useAppStore();

  const currentLang = computed(() => appStore.locale);

  function transformLabel(option: Api.SystemManage.DictOptions) {
    if (currentLang.value === 'en-US' && option.enLabel) {
      return option.enLabel;
    }
    return option.label;
  }

  function dictOptions(code: string) {
    return dictStore.options(code).map(option => ({
      ...option,
      label: transformLabel(option)
    }));
  }

  function dictLabel(code: string, value: string | null) {
    if (value === null) return '';
    const option = dictStore.options(code).find(item => item.value === value);
    return option ? transformLabel(option) : '';
  }

  function dcitType(code: string, value: string | null): NaiveUI.ThemeColor {
    if (value === null) return 'default';
    const option = dictStore.options(code).find(item => item.value === value);
    return option?.type || 'default';
  }

  function dictText(code: string, value: string | null) {
    if (value === null) return null;
    return h(NText, { type: dcitType(code, value) }, () => dictLabel(code, value));
  }

  function dictTag(code: string, value: string | null) {
    if (value === null) return null;
    return h(NTag, { type: dcitType(code, value), bordered: false }, () => dictLabel(code, value));
  }

  return {
    dictOptions,
    dictLabel,
    dcitType,
    dictText,
    dictTag
  };
}
