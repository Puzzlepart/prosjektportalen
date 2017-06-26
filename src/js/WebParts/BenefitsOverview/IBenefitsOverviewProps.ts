import DataSource from "../DataSource";
import IGroupByOption from "./IGroupByOption";

interface IBenefitsOverviewProps {
    dataSource?: DataSource;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;    
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
}

export const BenefitsOverviewDefaultProps: Partial<IBenefitsOverviewProps> = {
    groupByOptions: [],
    searchProperty: "Title",
    dataSource: DataSource.List,
    showCommandBar: true,
    modalHeaderClassName: "ms-font-xxl",
    projectInfoFilterField: "GtPcPortfolioPage",
};

export default IBenefitsOverviewProps;
