import { sp } from "sp-pnp-js";
import * as Util from "../../../Util";
import { GenerateColumns } from "../Columns";
import DataSource from "../../DataSource";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import MeasurementEntry from "./MeasurementEntry";
import BenefitEntry from "./BenefitEntry";
import ISpField from "./ISpField";

/**
 * Get measurements for the specified benefit entry
 *
 * @param {MeasurementEntry[]} measures Measures
 * @param {BenefitEntry} benefit Benefit
 */
const GetBenefitMeasurements = (measures: MeasurementEntry[], benefit: BenefitEntry): MeasurementEntry[] => {
    return measures
        .filter(measure => {
            return (benefit.ID === measure.LookupId && benefit.WebUrl === measure.WebUrl);
        })
        .map(measure => {
            measure.Percentage = Util.percentage(benefit.StartValue, measure.MeasurementValue, benefit.DesiredValue, true);
            return measure;
        });
};

/**
 * Generate benefit entries based on base data and relevant measures
 *
 * @param {BenefitEntry[]} benefits Benefits
 * @param {Measurement[]} measures Measure
 */
const GenerateData = (benefits: BenefitEntry[], measures: MeasurementEntry[]): any[] => {
    return benefits.map(bf => {
        const relevantMeasures = GetBenefitMeasurements(measures, bf);
        return bf.initStats(relevantMeasures);
    });
};

/**
 * Search settings used by pnp.sp.search
 * NB: Requires tenant level search settings
 */
const SearchSettings = {
    Querytext: "*",
    RowLimit: 500,
    SelectProperties: [
        "ListItemID",
        "Path",
        "SPWebUrl",
        "SiteTitle",
        "ContentTypeID",
        "Title",
        "GtMeasurementValueOWSNMBR",
        "GtMeasurementDateOWSDATE",
        "RefinableString58",
        "GtGainsResponsibleOWSUSER",
        "GtMeasureIndicatorOWSTEXT",
        "GtMeasurementUnitOWSCHCS",
        "GtStartValueOWSNMBR",
        "GtDesiredValueOWSNMBR",
    ],
    TrimDuplicates: false,
    Properties: [{
        Name: "SourceName",
        Value: { StrVal: __("ResultSourceName_Benefits"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: __("ResultSourceLevel_Benefits"), QueryPropertyValueTypeIndex: 1 },
    }],
};

/**
 * Fetches fields for a web, list or content type
 *
 * @param {any} obj List or content type
 * @param {string} fieldPrefix Field prefix
 */
const fetchFields = (obj: any, fieldPrefix = "Gt") => new Promise<ISpField[]>((resolve, reject) => {
    obj
        .fields
        .filter(`substringof('${fieldPrefix}', InternalName) eq true`)
        .get()
        .then(resolve)
        .catch(reject);
});

/**
 * Fetches data based on selected data source (List or Search)
 *
 * @param {DataSource} dataSource Data source (list/search)
 */
export const retrieveFromSource = (dataSource: DataSource) => new Promise<IBenefitsOverviewData>((resolve, reject) => {
    switch (dataSource) {
        case DataSource.List: {
            retrieveDataList()
                .then(resolve)
                .catch(reject);
        }
            break;
        case DataSource.Search: {
            retrieveDataSearch()
                .then(resolve)
                .catch(reject);
        }
            break;
        default: {
            resolve(null);
        }
    }
});

/**
 * Fetches data from list(s)
 */
const retrieveDataList = () => new Promise<IBenefitsOverviewData>((resolve, reject) => {
    const gainsList = sp.web.lists.getByTitle(__("Lists_BenefitsAnalysis_Title"));
    const measuresList = sp.web.lists.getByTitle(__("Lists_BenefitsFollowup_Title"));

    fetchFields(gainsList)
        .then(gainsFields => {
            let selectFields = ["ID", "Title", "GtChangeLookup/Title", "GtGainsResponsible/Title", ...gainsFields.map(f => f.InternalName)].join(",");
            Promise.all([
                gainsList
                    .items
                    .select(selectFields)
                    .expand("GtChangeLookup", "GtGainsResponsible")
                    .orderBy("Modified", false)
                    .get(),
                measuresList
                    .items
                    .select("GtGainLookupId", "GtMeasurementValue", "GtMeasurementDate")
                    .orderBy("GtMeasurementDate", false)
                    .get(),
            ]).then(([gains, measures]) => {
                gains = gains.map(m => new BenefitEntry().init(DataSource.List, m));
                measures = measures.map(m => new MeasurementEntry().init(DataSource.List, m));
                const data: IBenefitsOverviewData = ({
                    items: GenerateData(gains, measures),
                    columns: GenerateColumns(gainsFields, DataSource.List),
                });
                resolve(data);
            }).catch(reject);
        })
        .catch(reject);
});

/**
 * Fetches data using search
 */
const retrieveDataSearch = () => new Promise<IBenefitsOverviewData>((resolve, reject) => {
    Promise.all([
        fetchFields(sp.web.contentTypes.getById(__("ContentTypes_Gevinst_ContentTypeId"))),
        sp.search({
            ...SearchSettings,
        }),
    ])
        .then(([gainsFields, response]: [ISpField[], any]) => {
            const gains = response.PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinst_ContentTypeId")) !== -1)
                .map(m => new BenefitEntry().init(DataSource.Search, m));
            const measures = response.PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinstoppfolging_ContentTypeId")) !== -1)
                .sort(({ GtMeasurementDateOWSDATE: a }, { GtMeasurementDateOWSDATE: b }) => (new Date(a).getTime() > new Date(b).getTime()) ? -1 : 1)
                .map(m => new MeasurementEntry().init(DataSource.Search, m));
            const data: IBenefitsOverviewData = ({
                items: GenerateData(gains, measures),
                columns: GenerateColumns(gainsFields, DataSource.Search),
            });
            resolve(data);
        })
        .catch(reject);
});


export {
    IBenefitsOverviewData,
    MeasurementEntry,
    BenefitEntry,
};
