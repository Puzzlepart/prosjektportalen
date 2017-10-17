import IDynamicPortfolioColumnConfig from "./IDynamicPortfolioColumnConfig";
import IDynamicPortfolioRefinerConfig from "./IDynamicPortfolioRefinerConfig";
import IDynamicPortfolioViewConfig from "./IDynamicPortfolioViewConfig";
import IStatusFieldsConfig from "../../../Model/Config/IStatusFieldsConfig";

export default interface IDynamicPortfolioConfiguration {
    columns: IDynamicPortfolioColumnConfig[];
    refiners: IDynamicPortfolioRefinerConfig[];
    views: IDynamicPortfolioViewConfig[];
    statusFields: IStatusFieldsConfig;
}

export {
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioRefinerConfig,
    IDynamicPortfolioViewConfig,
    IStatusFieldsConfig,
};
