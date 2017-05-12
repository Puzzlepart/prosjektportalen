import DataSource from "../DataSource";
import IGroupByOption from "./IGroupByOption";

interface IGainsOverviewProps {
    dataSource?: DataSource;
    groupByOptions?: IGroupByOption[];
    showSearchBox?: boolean;
    showCommandBar?: boolean;
    searchProperty?: string;
}

export default IGainsOverviewProps;
