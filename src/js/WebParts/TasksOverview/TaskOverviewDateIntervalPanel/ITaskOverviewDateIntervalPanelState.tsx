import * as moment from "moment";

export interface ITaskOverviewDateIntervalPanelState {
    isDynamicInterval: boolean;
    visibleTimeStart?: moment.Moment;
    visibleTimeEnd?: moment.Moment;
}
