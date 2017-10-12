export default interface IDynamicPortfolioViewConfig {
    id: number;
    name: string;
    queryTemplate: string;
    iconName: any;
    default: boolean;
    fields?: any[];
    refiners?: any[];
}
