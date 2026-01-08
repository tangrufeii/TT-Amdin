declare namespace Api {
  namespace SystemManage {
    interface PermissionSearchParams extends Api.Common.PaginationParams {
      menuId?: number | null;
      name?: string | null;
      resource?: string | null;
      status?: CommonType.EnableStatus | null;
    }

    interface Permission {
      id: number;
      menuId: number;
      name: string;
      code?: string | null;
      resource: string;
      sort?: number | null;
      description?: string | null;
      status?: CommonType.EnableStatus | null;
      createTime?: string;
      updateTime?: string;
    }

    type PermissionList = Api.Common.PaginatingQueryRecord<Permission>;

    interface PermissionEdit {
      id?: number;
      menuId: number;
      name: string;
      code?: string | null;
      resource: string;
      sort?: number | null;
      description?: string | null;
      status?: CommonType.EnableStatus | null;
    }

    interface MenuPermissionButton {
      id: number;
      name: string;
      resource?: string | null;
    }

    interface MenuPermission {
      menuId: number;
      menuName: string;
      i18nKey?: App.I18n.I18nKey | string | null;
      buttons: MenuPermissionButton[];
    }
  }
}
