import * as Vue from 'vue';

export const isVue2 = false;
export const isVue3 = true;
export const Vue2 = undefined;

export function install() {}

export function set<T extends Record<string | number, any> | any[]>(target: T, key: any, val: any) {
  if (Array.isArray(target)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  (target as Record<string | number, any>)[key] = val;
  return val;
}

export function del<T extends Record<string | number, any> | any[]>(target: T, key: any) {
  if (Array.isArray(target)) {
    target.splice(key, 1);
    return;
  }
  delete (target as Record<string | number, any>)[key];
}

export const defineComponent = Vue.defineComponent;
export const h = Vue.h;

export { Vue };
export * from 'vue';
