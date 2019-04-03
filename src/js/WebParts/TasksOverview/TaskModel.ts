import * as moment from "moment";
import { ITaskSearchResult } from "./ITaskSearchResult";

export class TaskModel {
    public start_time: moment.Moment;
    public end_time: moment.Moment;

    /**
     * Creates a new TaskModel class
     */
    constructor(
        public id: number,
        public group: number,
        public title: string,
        start_time: string,
        end_time: string,
        public item: ITaskSearchResult,
    ) {
        this.start_time = start_time ? moment(new Date(start_time)) : null;
        this.end_time = end_time ? moment(new Date(end_time)) : null;
    }
}
