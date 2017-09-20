import IColumnConfig from "./IColumnConfig";
import IRefinerConfig from "./IRefinerConfig";
import IViewConfig from "./IViewConfig";

export default interface IConfiguration {
    columns: IColumnConfig[];
    refiners: IRefinerConfig[];
    views: IViewConfig[];
}

export {
    IColumnConfig,
    IRefinerConfig,
    IViewConfig,
};
