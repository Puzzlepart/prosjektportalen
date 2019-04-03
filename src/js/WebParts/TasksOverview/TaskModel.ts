import * as moment from "moment";

export class TaskModel {
    public title: string;
    public start_time: moment.Moment;
    public end_time: moment.Moment;

    /**
     * Creates a new TaskModel class
     */
    constructor(title: string, start_time: string, end_time: string) {
        this.title = title;
        this.start_time = moment(new Date(start_time));
        this.end_time = moment(new Date(end_time));
    }
}
