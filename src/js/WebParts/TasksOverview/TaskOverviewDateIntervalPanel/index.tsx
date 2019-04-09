import * as React from "react";
import * as moment from "moment";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { DatePicker, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { ITaskOverviewDateIntervalPanelProps } from "./ITaskOverviewDateIntervalPanelProps";
import { ITaskOverviewDateIntervalPanelState } from "./ITaskOverviewDateIntervalPanelState";

const DayPickerStrings: IDatePickerStrings = {
    months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
    days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
    shortDays: ["S", "M", "T", "W", "T", "F", "S"],
    goToToday: "GI dag",
    prevMonthAriaLabel: "Gå til forrige måned",
    nextMonthAriaLabel: "Gå til neste måned",
    prevYearAriaLabel: "Gå til forrige år",
    nextYearAriaLabel: "Gå til neste år",
};

export default class TaskOverviewDateIntervalPanel extends React.Component<ITaskOverviewDateIntervalPanelProps, ITaskOverviewDateIntervalPanelState> {
    constructor(props: ITaskOverviewDateIntervalPanelProps) {
        super(props);
        this.state = {};
    }

    public render(): React.ReactElement<ITaskOverviewDateIntervalPanelProps> {
        return (
            <Panel
                isOpen={this.props.isOpen}
                isHiddenOnDismiss={true}
                isLightDismiss={this.props.isLightDismiss}
                isBlocking={this.props.isBlocking}
                onDismiss={this.props.onDismiss}
                headerText={this.props.headerText}
                type={this.props.type}>
                <div>
                    <DatePicker
                        ref="visibleTimeStart"
                        firstDayOfWeek={DayOfWeek.Monday}
                        strings={DayPickerStrings}
                        placeholder="Fra"
                        ariaLabel="Fra"
                        value={this.props.defaultVisibleTimeStart.toDate()} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <DatePicker
                        ref="defaultVisibleTimeEnd"
                        firstDayOfWeek={DayOfWeek.Monday}
                        strings={DayPickerStrings}
                        placeholder="Til"
                        ariaLabel="Til"
                        value={this.props.defaultVisibleTimeEnd.toDate()} />
                </div>
                <div style={{ marginTop: 10 }}>
                    <PrimaryButton
                        text="Sett"
                        onClick={this.onSetInterval} />
                </div>
            </Panel>
        );
    }

    @autobind
    private onSetInterval() {
        const visibleTimeStart = moment((this.refs["visibleTimeStart"] as DatePicker).state.selectedDate);
        const visibleTimeEnd = moment((this.refs["defaultVisibleTimeEnd"] as DatePicker).state.selectedDate);
        this.props.onChange(visibleTimeStart, visibleTimeEnd);
    }
}
