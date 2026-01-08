declare namespace Api {
  namespace SystemManage {
    type DictType = '1' | '2';

    interface DictItem {
      value: string;
      zhCn: string;
      enUs?: string;
      sort?: number;
      type?: string;
    }

    interface Dict {
      code: string;
      name: string;
      type: string;
      items: DictItem[];
    }

    type DictOptions = {
      value: string;
      label: string;
      enLabel?: string;
      type?: NaiveUI.ThemeColor;
    };

    type DictManage = Api.Common.CommonRecord<{
      name: string;
      code: string;
      type: DictType;
      sort: number;
      description: string;
      status: string;
      remark?: string | null;
    }>;

    type DictPageList = {
      records: DictManage[];
      page: number;
      pageSize: number;
      total: number;
    };

    type DictTree = Pick<DictManage, 'id' | 'name' | 'code' | 'type' | 'description' | 'status'>;

    type DictSearchParams = CommonType.RecordNullable<
      Pick<DictManage, 'name' | 'code'> & { page: number; pageSize: number }
    >;

    type DictEdit = Pick<DictManage, 'id' | 'name' | 'code' | 'type' | 'sort' | 'description' | 'status' | 'remark'>;

    type DictItemManage = Api.Common.CommonRecord<{
      dictId: number;
      dictCode: string;
      value: string;
      zhCn: string;
      enUs: string;
      type: string;
      sort: number;
      description: string;
      status: string;
      remark?: string | null;
    }>;

    type DictItemPageList = {
      records: DictItemManage[];
      page: number;
      pageSize: number;
      total: number;
    };

    type DictItemSearchParams = CommonType.RecordNullable<
      Pick<DictItemManage, 'dictId' | 'value' | 'zhCn' | 'enUs' | 'description'> & { page: number; pageSize: number }
    >;

    type DictItemEdit = Pick<DictItemManage, 'id' | 'value' | 'zhCn' | 'enUs' | 'type' | 'sort' | 'description' | 'status' | 'remark'>;
  }
}
