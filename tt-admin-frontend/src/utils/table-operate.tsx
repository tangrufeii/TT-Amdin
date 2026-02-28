import { h, isRef } from 'vue';
import type { Ref } from 'vue';
import { NButton, NDropdown, NPopconfirm } from 'naive-ui';

type OperateButtonType = 'default' | 'tertiary' | 'primary' | 'info' | 'success' | 'warning' | 'error';

type MobileValue = boolean | Ref<boolean>;

export interface TableOperateAction {
  key: string;
  label: string;
  type?: OperateButtonType;
  show?: boolean;
  disabled?: boolean;
  loading?: boolean;
  confirmText?: string;
  onClick: () => void | Promise<void>;
}

interface RenderOperateOptions {
  actions: TableOperateAction[];
  isMobile: MobileValue;
  moreLabel?: string;
  containerClass?: string;
  confirmTitle?: string;
  confirmPositiveText?: string;
  confirmNegativeText?: string;
}

function resolveMobile(value: MobileValue) {
  return isRef(value) ? value.value : value;
}

function runAction(action: TableOperateAction) {
  if (action.disabled) return;
  void action.onClick();
}

function runMobileAction(action: TableOperateAction, options: RenderOperateOptions) {
  if (action.disabled) return;
  if (!action.confirmText) {
    runAction(action);
    return;
  }
  const title = options.confirmTitle || 'Confirm';
  const positiveText = options.confirmPositiveText || 'OK';
  const negativeText = options.confirmNegativeText || 'Cancel';
  if (window.$dialog) {
    window.$dialog.warning({
      title,
      content: action.confirmText,
      positiveText,
      negativeText,
      onPositiveClick: () => runAction(action)
    });
    return;
  }
  runAction(action);
}

function renderDesktopAction(action: TableOperateAction) {
  if (!action.confirmText) {
    return h(
      NButton,
      {
        size: 'small',
        quaternary: true,
        type: action.type || 'primary',
        loading: action.loading,
        disabled: action.disabled,
        onClick: () => runAction(action)
      },
      () => action.label
    );
  }

  return h(
    NPopconfirm,
    {
      onPositiveClick: () => runAction(action)
    },
    {
      default: () => action.confirmText,
      trigger: () =>
        h(
          NButton,
          {
            size: 'small',
            quaternary: true,
            type: action.type || 'primary',
            loading: action.loading,
            disabled: action.disabled
          },
          () => action.label
        )
    }
  );
}

export function renderOperateColumn(options: RenderOperateOptions) {
  const visibleActions = options.actions.filter(action => action.show !== false);
  if (!visibleActions.length) return '-';

  const mobile = resolveMobile(options.isMobile);
  if (mobile) {
    const actionMap = new Map(visibleActions.map(action => [action.key, action]));
    const dropdownOptions = visibleActions.map(action => ({
      label: action.label,
      key: action.key,
      disabled: action.disabled
    }));

    return h(
      NDropdown,
      {
        trigger: 'click',
        options: dropdownOptions,
        onSelect: (key: string | number) => {
          const action = actionMap.get(String(key));
          if (!action) return;
          runMobileAction(action, options);
        }
      },
      {
        default: () =>
          h(
            NButton,
            {
              size: 'small',
              quaternary: true
            },
            () => options.moreLabel || '...'
          )
      }
    );
  }

  return h(
    'div',
    {
      class: options.containerClass || 'flex-center flex-wrap gap-8px'
    },
    visibleActions.map(action => renderDesktopAction(action))
  );
}

export function resolveOperateWidth(isMobile: MobileValue, desktopWidth: number, mobileWidth: number = 64) {
  return resolveMobile(isMobile) ? mobileWidth : desktopWidth;
}
