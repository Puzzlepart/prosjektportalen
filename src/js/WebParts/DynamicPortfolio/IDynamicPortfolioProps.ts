import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react/lib/DetailsList";

interface IDynamicPortfolioProps {
    searchProperty?: string;
    showGroupBy?: boolean;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
}

export default IDynamicPortfolioProps;
