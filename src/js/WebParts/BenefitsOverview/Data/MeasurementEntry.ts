import * as Util from "../../../Util";
import DataSource from "../../DataSource";

export default class MeasurementEntry {
    public LookupId: number;
    public MeasurementDate: string;
    public MeasurementValue: number;
    public Percentage?: number;
    public WebUrl?: string;

    /**
     * Constructor
     */
    constructor() {
        /**
         * Empty constructor
         */
    }

    /**
     * Init
     *
     * @param {DataSource} dataSource Data source
     * @param {any} data Data
     */
    public init(dataSource: DataSource, data: any): MeasurementEntry {
        switch (dataSource) {
            case DataSource.List: {
                this.LookupId = data.GtGainLookupId;
                this.MeasurementDate = data.GtMeasurementDate;
                this.MeasurementValue = data.GtMeasurementValue;
            }
                break;
            case DataSource.Search: {
                if (data.RefinableString58) {
                    this.LookupId = parseInt(data.RefinableString58, 10);
                }
                this.MeasurementDate = data.GtMeasurementDateOWSDATE;
                if (data.GtMeasurementValueOWSNMBR) {
                    this.MeasurementValue = parseInt(data.GtMeasurementValueOWSNMBR, 10);
                }
                this.WebUrl = data.SPWebUrl;
            }
                break;
        }
        if (this.MeasurementDate) {
            this.MeasurementDate = Util.dateFormat(this.MeasurementDate);
        }
        return this;
    }
}
