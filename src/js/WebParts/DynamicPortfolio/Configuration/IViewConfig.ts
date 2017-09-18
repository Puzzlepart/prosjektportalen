export default interface IViewConfig {
    id: number;
    name: string;
    queryTemplate: string;
    iconName: any;
    default: boolean;
    fields?: any[];
    refiners?: any[];
}
