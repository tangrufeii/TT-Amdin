declare namespace Api {
  namespace SystemManage {
    type RoleStatus = '0' | '1';

    interface RoleSearchParams extends Api.Common.PaginationParams {
      roleName?: string;
      roleCode?: string;
      status?: RoleStatus | null;
    }

    interface Role {
      id: number;
      roleName: string;
      roleCode: string;
      sort?: number;
      status?: RoleStatus;
      description?: string;
      createTime?: string;
    }

    type RoleList = Api.Common.PaginatingQueryRecord<Role>;

    interface RoleEdit {
      id?: number;
      roleName: string;
      roleCode: string;
      sort?: number;
      status?: RoleStatus;
      description?: string;
    }

    interface RoleOption {
      id: number;
      name: string;
    }

    interface RoleMenu {
      roleId: number;
      menuIds: number[];
    }

    interface RolePermission {
      roleId: number;
      permissionIds: number[];
    }

    interface PermissionTree {
      key: string;
      label: string;
      checkboxDisabled?: boolean;
      children?: PermissionTree[];
    }
  }
}
