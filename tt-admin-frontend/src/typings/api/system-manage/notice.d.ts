declare namespace Api {
  namespace SystemManage {
    interface NoticeSearchParams extends Api.Common.PaginationParams {
      category?: string | null;
      title?: string | null;
      status?: CommonType.EnableStatus | null;
    }

    interface Notice {
      id: number;
      category: string;
      title: string;
      content: string;
      releaseTime?: string;
      remark?: string;
      status?: CommonType.EnableStatus;
      createUser?: string;
      createTime?: string;
    }

    type NoticeList = Api.Common.PaginatingQueryRecord<Notice>;

    interface NoticeEdit {
      id?: number;
      category: string;
      title: string;
      content: string;
      releaseTime: number;
      remark?: string;
      status?: CommonType.EnableStatus;
    }
  }
}
