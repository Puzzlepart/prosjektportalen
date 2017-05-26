import IColumnConfig from "./IColumnConfig";
import IRefinerConfig from "./IRefinerConfig";
import IViewConfig from "./IViewConfig";

interface IConfiguration {
    columns: IColumnConfig[];
    refiners: IRefinerConfig[];
    views: IViewConfig[];
}

export default IConfiguration;
export {
    IColumnConfig,
    IRefinerConfig,
    IViewConfig,
};
