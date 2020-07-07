import * as moment from 'moment'

export interface ITaskOverviewDateIntervalPanelProps {
    isOpen: boolean;
    headerText: string;
    onDismiss: () => void;
    defaultVisibleTimeStart: moment.Moment;
    defaultVisibleTimeEnd: moment.Moment;
    onChange: (visibleTimeStart: moment.Moment, visibleTimeEnd: moment.Moment) => void;
}
