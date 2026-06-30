/// <reference path="./naive-ui.d.ts" />
/// <reference path="./shims.d.ts" />

import type { Component } from 'vue';

export const TableHeaderOperation: Component;
export const TableColumnSetting: Component;
export const PluginFormCard: Component;
export const IconPlus: Component;
export const IconDelete: Component;
export const IconRefresh: Component;
export const IconSave: Component;
export const IconSetting: Component;
export const IconDrag: Component;
export const IconSearch: Component;

declare module '*.vue' {
  const component: Component;
  export default component;
}
