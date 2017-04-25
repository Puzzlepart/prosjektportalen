import { sp } from "sp-pnp-js";
import { IColumn } from "office-ui-fabric-react";
import * as Util from "Util";
import { Columns, GetColumnByKey, GenerateColumns } from "./Columns";
import { DataSource } from "../DataSource";

export interface IGainsOverviewData {
    items?: any[];
    columns?: IColumn[];
};

export interface ISpField {
    InternalName: string;
    Title: string;
}

export interface IMeasurement {
    Value: number;
    Percentage: number;
    SPWebUrl: string;
}

/**
 * Get measurements for the specified gain entry
 *
 * @param measures Measures
 * @param gain Gain
 * @param shouldIncrease Should the value increase
 * @param dataSource Data source
 */
const GetMeasurements = (measures: any[], gain: any, valueShouldIncrease: boolean, dataSource: DataSource): IMeasurement[] => {
    const idFieldName = (dataSource === DataSource.Search) ? "ListItemID" : "ID",
        valueFieldName = (dataSource === DataSource.Search) ? "GtMeasurementValueOWSNMBR" : "GtMeasurementValue",
        desiredValueFieldName = GetColumnByKey("GtDesiredValue", dataSource).fieldName;
    return measures
        .filter(m => {
            let gainId = parseInt(gain[idFieldName], 10),
                gainLookupId = parseInt(m.RefinableString58, 10);
            switch (dataSource) {
                case DataSource.List: return (gainLookupId === gainId);
                case DataSource.Search: return (gainLookupId === gainId) && (gain.SPWebUrl === m.SPWebUrl);
            }
        })
        .map(measure => {
            let value = parseInt(measure[valueFieldName], 10),
                desiredValue = parseInt(gain[desiredValueFieldName], 10),
                percentage = valueShouldIncrease ? Util.percentage(value, desiredValue, false) : Util.percentage(desiredValue, value, false);
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
 * @param gains Gains
 * @param measures Measure
 * @param dataSource Data source
 */
const GenerateData = (gains: any[], measures: any[], dataSource: DataSource): any[] => {
    return gains.map(data => {
        let valueShouldIncrease = (data[GetColumnByKey("GtDesiredValue", dataSource).fieldName] > data[GetColumnByKey("GtStartValue", dataSource).fieldName]);
        let relevantMeasures = GetMeasurements(measures, data, valueShouldIncrease, dataSource);
        let measureStats = {
            LatestPercentage: 0,
            LatestValue: 0,
            PreviousPercentage: 0,
            PreviousValue: 0,
            ValueShouldIncrese: valueShouldIncrease,
        };
        if (relevantMeasures.length > 0) {
            let [latest, previous] = relevantMeasures;
            let { Percentage: a1, Value: b1 } = latest;
            measureStats.LatestPercentage = a1;
            measureStats.LatestValue = b1;
            if (previous) {
                let { Percentage: a2, Value: b2 } = previous;
                measureStats.PreviousPercentage = a2;
                measureStats.PreviousValue = b2;
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
        Value: { StrVal: __("ResultSourceName_Gains"), QueryPropertyValueTypeIndex: 1 },
    },
    {
        Name: "SourceLevel",
        Value: { StrVal: __("ResultSourceLevel_Gains"), QueryPropertyValueTypeIndex: 1 },
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


const gainsList = sp.web.lists.getByTitle(__("Lists_GainsAnalysis_Title"));
const measuresList = sp.web.lists.getByTitle(__("Lists_GainsFollowup_Title"));

/**
 * Fetches data based on selected data source
 *
 * @param dataSource Data source (list/search)
 */
export const retrieveFromSource = (dataSource: DataSource): Promise<IGainsOverviewData> => new Promise<IGainsOverviewData>((resolve, reject) => {
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
                        .select("RefinableString58", "GtMeasurementValue", "GtMeasurementDate")
                        .orderBy("GtMeasurementDate", false)
                        .get(),
                ]).then(([gains, measures]) => {
                    let data: IGainsOverviewData = ({
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
            ]).then(([gainsFields, { PrimarySearchResults }]) => {
                let gains = PrimarySearchResults
                    .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinst_ContentTypeId")) !== -1);
                let measures = PrimarySearchResults
                    .filter(s => s.ContentTypeID.indexOf(__("ContentTypes_Gevinstoppfolging_ContentTypeId")) !== -1)
                    .sort(({ GtMeasurementDateOWSDATE: a }, { GtMeasurementDateOWSDATE: b }) => (new Date(a).getTime() > new Date(b).getTime()) ? -1 : 1);
                let data: IGainsOverviewData = ({
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
