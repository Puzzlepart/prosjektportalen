import IColumnConfig from "./IColumnConfig";
import IRefinerConfig from "./IRefinerConfig";
import IViewConfig from "./IViewConfig";
import IStatusFieldsConfig from "../../../Model/Config/IStatusFieldsConfig";

export default interface IConfiguration {
    columns: IColumnConfig[];
    refiners: IRefinerConfig[];
    views: IViewConfig[];
    statusFields: IStatusFieldsConfig;
}

export {
    IColumnConfig,
    IRefinerConfig,
    IViewConfig,
    IStatusFieldsConfig,
};
