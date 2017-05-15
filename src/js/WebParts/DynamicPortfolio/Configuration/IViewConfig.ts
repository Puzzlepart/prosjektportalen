interface IViewConfig {
    id: number;
    name: string;
    queryTemplate: string;
    iconName: any;
    default: boolean;
    fields?: any[];
    refiners?: any[];
}

export default IViewConfig;
