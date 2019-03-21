import * as React from "react";
import __ from "../../../Resources";
import { Modal, IModalProps } from "office-ui-fabric-react/lib/Modal";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { BenefitMeasurementIndicator } from "../BenefitsOverviewData/BenefitMeasurementIndicator";
import { BenefitMeasurement } from "../BenefitsOverviewData/BenefitMeasurement";
import * as objectGet from "object-get";

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
                data: { fieldNameDisplay: "valueDisplay" },
            },
            {
                key: "achievement",
                fieldName: "achievement",
                name: __.getResource("String_AchievementOfObjectives"),
                minWidth: 100,
                maxWidth: 100,
                data: {
                    onCustomRender: (item: BenefitMeasurementIndicator) => {
                        const colValue = objectGet(item, "achievementDisplay");
                        const trendIconProps = objectGet(item, "trendIconProps");
                        if (colValue) {
                            return (
                                <span>
                                    <span style={{ display: "inline-block", width: 20 }}>{trendIconProps && <Icon {...trendIconProps} />}</span>
                                    <span>{colValue}</span>
                                </span>
                            );
                        }
                        return null;
                    },
                },
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
        const onCustomRender = objectGet(column, "data.onCustomRender");
        const fieldNameDisplay: string = objectGet(column, "data.fieldNameDisplay");

        if (typeof onCustomRender === "function") {
            return onCustomRender(item, column);
        }
        return objectGet(item, fieldNameDisplay || column.fieldName);
    }
}
