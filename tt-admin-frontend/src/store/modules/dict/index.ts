import { ref } from 'vue';
import { defineStore } from 'pinia';
import { fetchGetAllDicts } from '@/service/api';
import { SetupStoreId } from '@/enum';

export const useDictStore = defineStore(SetupStoreId.Dict, () => {
  const dictItemMap = ref(new Map<string, Api.SystemManage.DictOptions[]>());
  const initialized = ref(false);

  async function init(force = false) {
    if (initialized.value && !force) return;

    const { data, error } = await fetchGetAllDicts();
    if (!error && data) {
      const map = new Map<string, Api.SystemManage.DictOptions[]>();
      data.forEach(dict => {
        const options = dict.items
          .slice()
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
          .map(item => ({
            value: item.value,
            label: item.zhCn,
            enLabel: item.enUs,
            type: item.type as NaiveUI.ThemeColor | undefined
          }));
        map.set(dict.code, options);
      });
      dictItemMap.value = map;
      initialized.value = true;
    }
  }

  function options(code: string) {
    return dictItemMap.value.get(code) || [];
  }

  function map(code: string) {
    return options(code).reduce((acc, item) => acc.set(item.value, item.label), new Map<string, string>());
  }

  function type(code: string) {
    return options(code).reduce((acc, item) => acc.set(item.value, item.type || 'default'), new Map<string, NaiveUI.ThemeColor>());
  }

  return {
    init,
    options,
    map,
    type
  };
});
