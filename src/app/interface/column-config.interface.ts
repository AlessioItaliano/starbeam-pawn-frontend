export interface IColumnConfig {
  columnDef: string;
  header: string;
  cell: (element: any) => string;
  pipe?: (value: any) => string;
}
