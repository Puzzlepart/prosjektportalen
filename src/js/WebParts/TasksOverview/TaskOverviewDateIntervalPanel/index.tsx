import __ from "../../../Resources";
import * as React from "react";
import * as moment from "moment";
import { Panel } from "office-ui-fabric-react/lib/Panel";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { DatePicker, IDatePickerProps, DayOfWeek, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import { ITaskOverviewDateIntervalPanelProps } from "./ITaskOverviewDateIntervalPanelProps";
import { ITaskOverviewDateIntervalPanelState } from "./ITaskOverviewDateIntervalPanelState";
import { formatDate } from "../../../Util";

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
        formatDate: date => formatDate(date, "LL"),
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
                isLightDismiss={true}
                isBlocking={false}
                onDismiss={this.props.onDismiss}
                headerText={this.props.headerText} >
                <div>
                    <Toggle
                        label={__.getResource("TasksOverview_IsDynamicLabel")}
                        defaultChecked={this.state.isDynamicInterval}
                        onChanged={isDynamicInterval => this.setState({ isDynamicInterval })} />
                    <p className="ms-font-xs">{__.getResource("TasksOverview_IsDynamicDescription")}</p>
                </div>
                <div style={{ marginTop: 15 }}>
                    <DatePicker
                        {...this.datePickerProps}
                        onSelectDate={date => this.setState({ visibleTimeStart: moment(date) })}
                        placeholder={__.getResource("TasksOverview_VisibleTimeStartLabel")}
                        ariaLabel={__.getResource("TasksOverview_VisibleTimeStartLabel")}
                        disabled={this.state.isDynamicInterval}
                        value={this.props.defaultVisibleTimeStart.toDate()} />
                </div>
                <div style={{ marginTop: 15 }}>
                    <DatePicker
                        {...this.datePickerProps}
                        onSelectDate={date => this.setState({ visibleTimeEnd: moment(date) })}
                        placeholder={__.getResource("TasksOverview_VisibleTimeEndLabel")}
                        ariaLabel={__.getResource("TasksOverview_VisibleTimeEndLabel")}
                        disabled={this.state.isDynamicInterval}
                        value={this.props.defaultVisibleTimeEnd.toDate()} />
                </div>
                <div style={{ marginTop: 15 }}>
                    <PrimaryButton
                        text={__.getResource("TasksOverview_OnSetIntervalButtonText")}
                        onClick={this.onSetInterval} />
                </div>
            </Panel>
        );
    }

    @autobind
    private onSetInterval() {
        let visibleTimeStart = null;
        let visibleTimeEnd = null;
        if (!this.state.isDynamicInterval) {
            visibleTimeStart = this.state.visibleTimeStart;
            visibleTimeEnd = this.state.visibleTimeEnd;
        }
        this.props.onChange(visibleTimeStart, visibleTimeEnd);
    }
}
