import * as React from "react";
import __ from "../../../Resources";
import { Modal, IModalProps } from "office-ui-fabric-react/lib/Modal";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { BenefitMeasurementIndicator } from "../BenefitsOverviewData/BenefitMeasurementIndicator";
import { BenefitMeasurement } from "../BenefitsOverviewData/BenefitMeasurement";

export interface IBenefitMeasurementsModalProps extends IModalProps {
    indicator: BenefitMeasurementIndicator;
    columns?: IColumn[];
}

export default class BenefitMeasurementsModal extends React.PureComponent<IBenefitMeasurementsModalProps, {}> {
    public static defaultProps: Partial<IBenefitMeasurementsModalProps> = {
        columns: [
            {
                key: "valueDisplay",
                fieldName: "valueDisplay",
                name: __.getResource("SiteFields_GtMeasurementValue_DisplayName"),
                minWidth: 100,
                maxWidth: 100,
            },
            {
                key: "achievementDisplay",
                fieldName: "achievementDisplay",
                name: __.getResource("String_AchievementOfObjectives"),
                minWidth: 100,
                maxWidth: 100,
            },
            {
                key: "dateDisplay",
                fieldName: "dateDisplay",
                name: __.getResource("SiteFields_GtMeasurementDate_DisplayName"),
                minWidth: 150,
            },
        ],
    };

    public render(): React.ReactElement<IBenefitMeasurementsModalProps> {
        return (
            <Modal
                isOpen={true}
                isDarkOverlay={true}
                onDismiss={this.props.onDismiss}
                containerClassName={"pp-modal"}
                isBlocking={false}>
                <div style={{ padding: 50, maxHeight: 600 }}>
                    <h2 style={{ marginBottom: 20 }}>{this.props.indicator.title}</h2>
                    <DetailsList
                        items={this.props.indicator.measurements}
                        columns={this.props.columns}
                        onRenderItemColumn={this.onRenderItemColumn} />
                </div>
            </Modal>
        );
    }

    @autobind
    private onRenderItemColumn(item: BenefitMeasurement, _index: number, column: IColumn) {
        const colValue = item[column.fieldName];

        switch (column.key) {
            case "achievementDisplay": {
                if (colValue) {
                    return (
                        <span>
                            <span style={{ display: "inline-block", width: 20 }}>{item.trendIconProps && <Icon {...item.trendIconProps} />}</span>
                            <span>{colValue}</span>
                        </span>
                    );
                }
                return null;
            }
        }
        return colValue;
    }
}
