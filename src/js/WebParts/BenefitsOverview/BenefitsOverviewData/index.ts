import RESOURCE_MANAGER from "localization";
import { sp } from "sp-pnp-js";
import * as Util from "../../../Util";
import { GenerateColumns } from "./BenefitsOverviewDataColumns";
import DataSource from "../../DataSource";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import MeasurementEntry from "./MeasurementEntry";
import BenefitEntry from "./BenefitEntry";

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
        Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceName_Benefits"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: RESOURCE_MANAGER.getResource("ResultSourceLevel_Benefits"), QueryPropertyValueTypeIndex: 1 },
    }],
};

/**
 * Fetches fields for a web, list or content type
 *
 * @param {any} spObject List or content type
 * @param {string} fieldPrefix Field prefix
 */
const fetchFieldsAsMap = (spObject: any, fieldPrefix = "Gt") => new Promise<{ [key: string]: string }>((resolve, reject) => {
    spObject
        .fields
        .filter(`substringof('${fieldPrefix}', InternalName) eq true`)
        .get()
        .then(fields => {
            let fieldNamesMap: { [key: string]: string } = {};
            fields.forEach(({ InternalName, Title }) => fieldNamesMap[InternalName] = Title);
            resolve(fieldNamesMap);
        })
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
    const gainsList = sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title"));
    const measuresList = sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title"));

    fetchFieldsAsMap(gainsList)
        .then(fieldsMap => {
            let selectFields = ["ID", "Title", "GtChangeLookup/Title", "GtGainsResponsible/Title", ...Object.keys(fieldsMap)].join(",");
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
                    columns: GenerateColumns(fieldsMap, DataSource.List),
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
        fetchFieldsAsMap(sp.web.contentTypes.getById(RESOURCE_MANAGER.getResource("ContentTypes_Gevinst_ContentTypeId"))),
        sp.search({
            ...SearchSettings,
        }),
    ])
        .then(([fieldsMap, response]: [any, any]) => {
            const gains = response.PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(RESOURCE_MANAGER.getResource("ContentTypes_Gevinst_ContentTypeId")) !== -1)
                .map(m => new BenefitEntry().init(DataSource.Search, m));
            const measures = response.PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(RESOURCE_MANAGER.getResource("ContentTypes_Gevinstoppfolging_ContentTypeId")) !== -1)
                .sort(({ GtMeasurementDateOWSDATE: a }, { GtMeasurementDateOWSDATE: b }) => (new Date(a).getTime() > new Date(b).getTime()) ? -1 : 1)
                .map(m => new MeasurementEntry().init(DataSource.Search, m));
            const data: IBenefitsOverviewData = ({
                items: GenerateData(gains, measures),
                columns: GenerateColumns(fieldsMap, DataSource.Search),
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
