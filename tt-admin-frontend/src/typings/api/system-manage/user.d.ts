declare namespace Api {
  namespace SystemManage {
    type UserStatus = '0' | '1';

    interface UserSearchParams extends Api.Common.PaginationParams {
      userName?: string;
      phone?: string;
      status?: UserStatus | null;
    }

    interface User {
      id: number;
      userName: string;
      nickName?: string;
      realName?: string;
      phone?: string;
      email?: string;
      status?: UserStatus;
      createTime?: string;
      roleIds?: number[];
      roleNames?: string[];
    }

    type UserList = Api.Common.PaginatingQueryRecord<User>;

    interface UserEdit {
      id?: number;
      userName: string;
      password?: string;
      nickName?: string;
      realName?: string;
      phone?: string;
      email?: string;
      status?: UserStatus;
      roleIds?: number[];
    }
  }
}
