declare namespace NaiveUI {
  type TableColumnCheck = {
    key: string;
    title: string | (() => any);
    checked: boolean;
    visible?: boolean;
    disabled?: boolean;
  };
}
