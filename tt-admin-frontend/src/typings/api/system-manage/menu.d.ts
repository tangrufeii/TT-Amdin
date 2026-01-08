declare namespace Api {
  namespace SystemManage {
    type MenuType = '1' | '2';
    type IconType = '1' | '2';

    interface MenuQuery {
      key: string;
      value: string;
    }

    interface Menu {
      id: number;
      parentId: number;
      type: MenuType;
      name: string;
      code?: string | null;
      i18nKey?: App.I18n.I18nKey | string | null;
      routeName: string;
      routePath: string;
      component?: string | null;
      icon?: string | null;
      iconType: IconType;
      status?: Common.EnableStatus | null;
      hide?: CommonType.YesOrNo;
      href?: string | null;
      iframeUrl?: string | null;
      keepAlive?: CommonType.YesOrNo;
      sort?: number | null;
      multiTab?: CommonType.YesOrNo;
      fixedIndexInTab?: number | null;
      query?: MenuQuery[] | null;
    }

    type MenuTreeData = Menu & {
      children?: MenuTreeData[];
    };

    type MenuDetail = Menu & {
      remark?: string | null;
    };

    type MenuEdit = Pick<
      Menu,
      | 'parentId'
      | 'type'
      | 'name'
      | 'code'
      | 'i18nKey'
      | 'routeName'
      | 'routePath'
      | 'component'
      | 'icon'
      | 'iconType'
      | 'status'
      | 'hide'
      | 'href'
      | 'iframeUrl'
      | 'keepAlive'
      | 'sort'
      | 'multiTab'
      | 'fixedIndexInTab'
      | 'query'
      | 'remark'
    > & {
      id?: number;
    };
  }
}
