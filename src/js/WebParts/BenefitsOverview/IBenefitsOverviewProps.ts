import RESOURCE_MANAGER from "../../@localization";
import ISearchResultSource from "../ISearchResultSource";
import DataSource, { IDataSourceSearchCustom } from "../DataSource";
import IGroupByOption from "./IGroupByOption";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface IBenefitsOverviewProps extends IBaseWebPartProps {
    dataSource?: DataSource;
    customSearchSettings?: IDataSourceSearchCustom;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    resultSource?: ISearchResultSource;
}

export const BenefitsOverviewDefaultProps: Partial<IBenefitsOverviewProps> = {
    groupByOptions: [],
    searchProperty: "Title",
    dataSource: DataSource.List,
    showCommandBar: false,
    showSearchBox: false,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
    resultSource: { Name: RESOURCE_MANAGER.getResource("ResultSourceName_Benefits"), Level: RESOURCE_MANAGER.getResource("ResultSourceLevel_Benefits") },
};
