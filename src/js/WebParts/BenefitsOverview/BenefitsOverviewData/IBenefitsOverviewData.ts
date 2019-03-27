import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";

export default interface IBenefitsOverviewData {
    items?: BenefitMeasurementIndicator[];
    columns?: IColumn[];
}
