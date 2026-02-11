const LAYOUT_PREFIX = 'layout.';
const VIEW_PREFIX = 'view.';
const SPLIT = '$';

export function getLayoutAndPage(component?: string | null) {
  if (!component) {
    return { layout: '', page: '' };
  }

  if (!component.includes(SPLIT) && component.startsWith(VIEW_PREFIX)) {
    return {
      layout: '',
      page: component.replace(VIEW_PREFIX, '')
    };
  }

  const [layoutPart, viewPart] = component.split(SPLIT);

  const normalizedLayout = layoutPart?.replace(LAYOUT_PREFIX, '') || '';
  const normalizedPage = viewPart?.replace(VIEW_PREFIX, '') || '';

  if (normalizedLayout.startsWith(VIEW_PREFIX) || normalizedLayout.startsWith('view.')) {
    return {
      layout: '',
      page: normalizedPage || normalizedLayout.replace(VIEW_PREFIX, '')
    };
  }

  return {
    layout: normalizedLayout,
    page: normalizedPage
  };
}

export function transformLayoutAndPageToComponent(layout: string, page: string) {
  const hasLayout = Boolean(layout);
  const hasPage = Boolean(page);
  if (hasLayout && hasPage) {
    return `${LAYOUT_PREFIX}${layout}${SPLIT}${VIEW_PREFIX}${page}`;
  }
  if (hasLayout) {
    return `${LAYOUT_PREFIX}${layout}`;
  }
  if (hasPage) {
    return `${VIEW_PREFIX}${page}`;
  }
  return '';
}

export function getRoutePathByRouteName(routeName: string) {
  return routeName ? `/${routeName.replace(/_/g, '/')}` : '';
}

export function getPathParamFromRoutePath(routePath: string) {
  const [path, param = ''] = routePath.split('/:');
  return {
    path,
    param
  };
}

export function getRoutePathWithParam(routePath: string, param: string) {
  if (param.trim()) {
    return `${routePath}/:${param}`;
  }
  return routePath;
}
