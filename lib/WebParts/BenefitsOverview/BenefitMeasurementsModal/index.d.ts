import * as React from "react";
import { IModalProps } from "office-ui-fabric-react/lib/Modal";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { BenefitMeasurementIndicator } from "../BenefitsOverviewData/BenefitMeasurementIndicator";
export interface IBenefitMeasurementsModalProps extends IModalProps {
    indicator: BenefitMeasurementIndicator;
    columns?: IColumn[];
}
export default class BenefitMeasurementsModal extends React.PureComponent<IBenefitMeasurementsModalProps, {}> {
    static defaultProps: Partial<IBenefitMeasurementsModalProps>;
    render(): React.ReactElement<IBenefitMeasurementsModalProps>;
    private onRenderItemColumn;
}
