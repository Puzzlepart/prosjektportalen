import __ from "../../../Resources";
import * as React from "react";
import moment from "moment";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { DatePicker, IDatePickerProps, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITaskOverviewDateIntervalPanelProps } from "./ITaskOverviewDateIntervalPanelProps";
import { ITaskOverviewDateIntervalPanelState } from "./ITaskOverviewDateIntervalPanelState";
import { dateFormat } from "../../../Util";

const DayPickerStrings: IDatePickerStrings = {
    months: __.getResource("DayPickerStrings_Months").split(","),
    shortMonths: __.getResource("DayPickerStrings_ShortMonths").split(","),
    days: __.getResource("DayPickerStrings_Days").split(","),
    shortDays: __.getResource("DayPickerStrings_ShortDays").split(","),
    goToToday: __.getResource("DayPickerStrings_GoToToday"),
    prevMonthAriaLabel: __.getResource("DayPickerStrings_PrevMonthAriaLabel"),
    nextMonthAriaLabel: __.getResource("DayPickerStrings_NextMonthAriaLabel"),
    prevYearAriaLabel: __.getResource("DayPickerStrings_PrevYearAriaLabel"),
    nextYearAriaLabel: __.getResource("DayPickerStrings_NextYearAriaLabel"),
};

export default class TaskOverviewDateIntervalPanel extends React.Component<ITaskOverviewDateIntervalPanelProps, ITaskOverviewDateIntervalPanelState> {
    private datePickerProps: IDatePickerProps = {
        firstDayOfWeek: DayOfWeek.Monday,
        strings: DayPickerStrings,
        formatDate: date => dateFormat(date, "LL"),
    };

    constructor(props: ITaskOverviewDateIntervalPanelProps) {
        super(props);
        this.state = { isDynamicInterval: true };
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
                    <Toggle
                        label="Dynamisk intervall"
                        defaultChecked={this.state.isDynamicInterval}
                        onChanged={isDynamicInterval => this.setState({ isDynamicInterval })} />
                    <p className="ms-font-xs">Om intervallet settes til <i>dynamisk</i>, vil intervallet settes ut ifra oppgavene i visningen.</p>
                </div>
                <div style={{ marginTop: 15 }}>
                    <DatePicker
                        {...this.datePickerProps}
                        ref="visibleTimeStart"
                        placeholder="Fra"
                        ariaLabel="Fra"
                        disabled={this.state.isDynamicInterval}
                        value={this.props.defaultVisibleTimeStart.toDate()} />
                </div>
                <div style={{ marginTop: 15 }}>
                    <DatePicker
                        {...this.datePickerProps}
                        ref="defaultVisibleTimeEnd"
                        placeholder="Til"
                        ariaLabel="Til"
                        disabled={this.state.isDynamicInterval}
                        value={this.props.defaultVisibleTimeEnd.toDate()} />
                </div>
                <div style={{ marginTop: 15 }}>
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
        this.props.onChange(this.state.isDynamicInterval, visibleTimeStart, visibleTimeEnd);
    }
}
