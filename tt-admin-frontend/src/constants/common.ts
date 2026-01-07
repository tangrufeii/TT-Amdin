import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  Y: 'common.yesOrNo.yes',
  N: 'common.yesOrNo.no'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);

export const themeColorOptions: Array<CommonType.Option<NaiveUI.ThemeColor>> = [
  { value: 'default', label: 'default' },
  { value: 'primary', label: 'primary' },
  { value: 'info', label: 'info' },
  { value: 'success', label: 'success' },
  { value: 'warning', label: 'warning' },
  { value: 'error', label: 'error' }
];
