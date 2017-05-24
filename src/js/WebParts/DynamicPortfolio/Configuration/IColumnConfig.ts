interface IColumnConfig {
    name: string;
    key: string;
    fieldName: string;
    readOnly: boolean;
    render: "Date" | "Note" | "Currency" | "Status" | "Default";
    minWidth?: number;
    maxWidth?: number;
    isResizable?: boolean;
    groupBy?: boolean;
}

export default IColumnConfig;
