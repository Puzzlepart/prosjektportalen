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
                key: "value",
                fieldName: "value",
                name: __.getResource("SiteFields_GtMeasurementValue_DisplayName"),
                minWidth: 100,
                maxWidth: 100,
            },
            {
                key: "achievementStr",
                fieldName: "achievementStr",
                name: __.getResource("String_AchievementOfObjectives"),
                minWidth: 100,
                maxWidth: 100,
            },
            {
                key: "dateStr",
                fieldName: "dateStr",
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
                <div style={{ padding: 50 }}>
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
            case "achievementStr": {
                if (colValue) {
                    return (
                        <span>
                            <span>{colValue}</span>
                            {item.trendIconProps && <Icon {...item.trendIconProps} />}
                        </span>
                    );
                }
                return null;
            }
        }
        return colValue;
    }
}
