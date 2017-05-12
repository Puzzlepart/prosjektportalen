import {
    SelectionMode,
    ConstrainMode,
    DetailsListLayoutMode,
} from "office-ui-fabric-react";

interface IDynamicPortfolioProps {
    searchProperty?: string;
    showGroupBy?: boolean;
    modalContainerClassName?: string;
    modalHeaderClassName?: string;
    projectInfoFilterField?: string;
    constrainMode?: ConstrainMode;
    layoutMode?: DetailsListLayoutMode;
    selectionMode?: SelectionMode;
}

export default IDynamicPortfolioProps;
