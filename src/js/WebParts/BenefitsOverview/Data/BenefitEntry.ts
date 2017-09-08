import DataSource from "../../DataSource";
import MeasurementEntry from "./MeasurementEntry";

export default class BenefitEntry {
    public ID: number;
    public Title: string;
    public Responsible: string;
    public MeasureIndicator: string;
    public MeasurementUnit: string;
    public StartValue: number;
    public DesiredValue: number;
    public Measurements: MeasurementEntry[];
    public ValueShouldIncrease: boolean;
    public PreviousValue: number;
    public PreviousPercentage: number;
    public LatestValue: number;
    public LatestPercentage: number;
    public SiteTitle?: string;
    public WebUrl?: string;
    public DisplayFormUrl?: string;

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
    public init(dataSource: DataSource, data: any): BenefitEntry {
        this.Title = data.Title;
        switch (dataSource) {
            case DataSource.List: {
                this.ID = data.ID;
                if (data.GtGainsResponsible) {
                    this.Responsible = data.GtGainsResponsible.Title;
                }
                this.MeasureIndicator = data.GtMeasureIndicator;
                this.MeasurementUnit = data.GtMeasurementUnit;
                this.StartValue = data.GtStartValue;
                this.DesiredValue = data.GtDesiredValue;
                this.DisplayFormUrl = `${_spPageContextInfo.webAbsoluteUrl}/${__("DefaultView_BenefitsAnalysis_Url")}?ID=${this.ID}`.replace("AllItems", "DispForm");
            }
                break;
            case DataSource.Search: {
                this.ID = parseInt(data.ListItemID, 10);
                this.Responsible = this.getOwsUserDisplayName(data.GtGainsResponsibleOWSUSER);
                this.MeasureIndicator = data.GtMeasureIndicatorOWSTEXT;
                this.MeasurementUnit = data.GtMeasurementUnitOWSCHCS;
                if (data.GtStartValueOWSNMBR) {
                    this.StartValue = parseInt(data.GtStartValueOWSNMBR, 10);
                }
                if (data.GtDesiredValueOWSNMBR) {
                    this.DesiredValue = parseInt(data.GtDesiredValueOWSNMBR, 10);
                }
                this.SiteTitle = data.SiteTitle;
                this.WebUrl = data.SPWebUrl;
                this.DisplayFormUrl = data.Path;
            }
                break;
        }
        this.ValueShouldIncrease = (this.DesiredValue > this.StartValue);
        return this;
    }

    /**
     * Initialize stats
     *
     * @param {MeasurementEntry[]} measurements Measurements
     */
    public initStats(measurements: MeasurementEntry[]): BenefitEntry {
        this.Measurements = measurements;
        if (measurements.length > 0) {
            let [latest, previous] = measurements;
            let { Percentage: a1, MeasurementValue: b1 } = latest;
            this.LatestPercentage = a1;
            this.LatestValue = b1;
            if (previous) {
                let { Percentage: a2, MeasurementValue: b2 } = previous;
                this.PreviousPercentage = a2;
                this.PreviousValue = b2;
            }
        }
        return this;
    }

    /**
     * Get OWSUSER display name
     *
     * @param {string} stringValue String value
     */
    public getOwsUserDisplayName(stringValue: string): string {
        if (stringValue) {
            const [, displayName] = stringValue.split(" | ");
            return displayName;
        }
        return "";
    }
}
