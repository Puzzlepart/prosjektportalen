import moment from "moment";
import { IPanelProps } from "office-ui-fabric-react/lib/Panel";

export interface ITaskOverviewDateIntervalPanelProps extends IPanelProps {
    defaultVisibleTimeStart: moment.Moment;
    defaultVisibleTimeEnd: moment.Moment;
    onChange: (visibleTimeStart: moment.Moment, visibleTimeEnd: moment.Moment) => void;
}
