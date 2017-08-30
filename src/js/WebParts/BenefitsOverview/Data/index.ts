import {
    sp,
    Logger,
    LogLevel,
} from "sp-pnp-js";
import * as Util from "../../../Util";
import {
    Columns,
    GetColumnByKey,
    GenerateColumns,
} from "../Columns";
import DataSource from "../../DataSource";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import IMeasurement from "./IMeasurement";
import ISpField from "./ISpField";

/**
 * Get measurements for the specified benefit entry
 *
 * @param measures Measures
 * @param benefit Benefit
 * @param shouldIncrease Should the value increase
 * @param dataSource Data source
 */
const GetBenefitMeasurements = (measures: any[], benefit, valueShouldIncrease: boolean, dataSource: DataSource): IMeasurement[] => {
    const isSearch = (dataSource === DataSource.Search);
    const idFieldName = isSearch ? "ListItemID" : "ID",
        valueFieldName = isSearch ? "GtMeasurementValueOWSNMBR" : "GtMeasurementValue",
        lookupFieldName = isSearch ? "RefinableString58" : "GtGainLookupId",
        desiredValueFieldName = GetColumnByKey("GtDesiredValue", dataSource).fieldName,
        startValueFieldName = GetColumnByKey("GtStartValue", dataSource).fieldName,
        desiredValue = parseInt(benefit[desiredValueFieldName], 10),
        startValue = parseInt(benefit[startValueFieldName], 10);
    return measures
        .filter(m => {
            let benefitId = parseInt(benefit[idFieldName], 10),
                benefitLookupId = parseInt(m[lookupFieldName], 10);
            switch (dataSource) {
                case DataSource.List: return (benefitLookupId === benefitId);
                case DataSource.Search: return (benefitLookupId === benefitId) && (benefit.SPWebUrl === m.SPWebUrl);
            }
        })
        .map(measure => {
            let value = parseInt(measure[valueFieldName], 10),
                percentage = Util.percentage(startValue, value, desiredValue, false);
            return ({
                Value: value,
                Percentage: percentage,
                SPWebUrl: measure.SPWebUrl,
            });
        });
};

/**
 * Generate data
 *
 * @param benefits Benefits
 * @param measures Measure
 * @param dataSource Data source
 */
const GenerateData = (benefits: any[], measures: any[], dataSource: DataSource): any[] => {
    return benefits.map(data => {
        const startValue = parseInt(data[GetColumnByKey("GtStartValue", dataSource).fieldName], 10);
        const desiredValue = parseInt(data[GetColumnByKey("GtDesiredValue", dataSource).fieldName], 10);
        const valueShouldIncrease = (desiredValue > startValue);
        const relevantMeasures = GetBenefitMeasurements(measures, data, valueShouldIncrease, dataSource);
        let measureStats = {
            LatestPercentage: null,
            LatestValue: null,
            PreviousPercentage: null,
            PreviousValue: null,
            ValueShouldIncrease: valueShouldIncrease,
        };
        if (relevantMeasures.length > 0) {
            try {
                let [latest, previous] = relevantMeasures;
                let { Percentage: a1, Value: b1 } = latest;
                measureStats.LatestPercentage = a1;
                measureStats.LatestValue = b1;
                if (previous) {
                    let { Percentage: a2, Value: b2 } = previous;
                    measureStats.PreviousPercentage = a2;
                    measureStats.PreviousValue = b2;
                }
            } catch (e) {
                Logger.log({ message: `Unable to calculcate measures.`, level: LogLevel.Warning, data: relevantMeasures });
            }
        }
        return Object.assign(data, measureStats);
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
        ...Columns(DataSource.Search).filter(col => col.searchPostfix).map(col => col.fieldName),
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
 * @param obj List or content type
 * @param fieldPrefix Field prefix
 */
const fetchFields = (obj: any, fieldPrefix = "Gt") => new Promise<ISpField[]>((resolve, reject) => {
    obj
        .fields
        .filter(`substringof('${fieldPrefix}', InternalName) eq true`)
        .get()
        .then(resolve)
        .catch(reject);
});


const gainsList = sp.web.lists.getByTitle(__("Lists_BenefitsAnalysis_Title"));
const measuresList = sp.web.lists.getByTitle(__("Lists_BenefitsFollowup_Title"));

/**
 * Fetches data based on selected data source
 *
 * @param dataSource Data source (list/search)
 */
export const retrieveFromSource = (dataSource: DataSource): Promise<IBenefitsOverviewData> => new Promise<IBenefitsOverviewData>((resolve, reject) => {
    switch (dataSource) {
        case DataSource.List: {
            fetchFields(gainsList).then(gainsFields => {
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
                    let data: IBenefitsOverviewData = ({
                        items: GenerateData(gains, measures, dataSource),
                        columns: GenerateColumns(gainsFields, dataSource),
                    });
                    resolve(data);
                }).catch(reject);
            }).catch(reject);
        }
            break;
        case DataSource.Search: {
            Promise.all([
                fetchFields(sp.web.contentTypes.getById(__("ContentTypes_Gevinst_ContentTypeId"))),
                sp.search({
                    ...SearchSettings,
                }),
            ]).then(([gainsFields, response]: [ISpField[], any]) => {
                let gains = response.PrimarySearchResults
                    .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinst_ContentTypeId")) !== -1);
                let measures = response.PrimarySearchResults
                    .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinstoppfolging_ContentTypeId")) !== -1)
                    .sort(({ GtMeasurementDateOWSDATE: a }, { GtMeasurementDateOWSDATE: b }) => (new Date(a).getTime() > new Date(b).getTime()) ? -1 : 1);
                let data: IBenefitsOverviewData = ({
                    items: GenerateData(gains, measures, dataSource),
                    columns: GenerateColumns(gainsFields, dataSource),
                });
                resolve(data);
            }).catch(reject);
        }
            break;
        default: {
            resolve(null);
        }
    }
});


export {
    IBenefitsOverviewData,
    IMeasurement,
};
