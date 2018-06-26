//#region Imports
import RESOURCE_MANAGER from "../../../Resources";
import pnp, { Site } from "sp-pnp-js";
import * as Util from "../../../Util";
import { GenerateColumns } from "./BenefitsOverviewDataColumns";
import DataSource, { IDataSourceSearchCustom } from "../../DataSource";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import MeasurementEntry from "./MeasurementEntry";
import BenefitEntry from "./BenefitEntry";
//#endregion

/**
 * Get measurements for the specified benefit entry
 *
 * @param {MeasurementEntry[]} measures Measures
 * @param {BenefitEntry} benefit Benefit
 */
const GetBenefitMeasurements = (measures: MeasurementEntry[], benefit: BenefitEntry): MeasurementEntry[] => {
    return measures
        .filter(measure => (benefit.ID === measure.LookupId && benefit.WebUrl === measure.WebUrl))
        .map(measure => {
            measure.Percentage = Util.percentage(benefit.StartValue, measure.MeasurementValue, benefit.DesiredValue, false);
            return measure;
        });
};

/**
 * Generate benefit entries based on base data and relevant measures
 *
 * @param {BenefitEntry[]} benefits Benefits
 * @param {Measurement[]} measures Measure
 */
function GenerateData(benefits: BenefitEntry[], measures: MeasurementEntry[]): any[] {
    return benefits.map(bf => {
        const relevantMeasures = GetBenefitMeasurements(measures, bf);
        return bf.setMeasurementStats(relevantMeasures);
    });
}

/**
 * Fetches fields for a web, list or content type
 *
 * @param {any} spObject List or content type
 * @param {string} spFieldPrefix Field prefix
 */
async function fetchFieldsAsMap(spObject: any, spFieldPrefix = "Gt") {
    try {
        const filterStr = `substringof('${spFieldPrefix}', InternalName) eq true`;
        const spFields: any[] = await spObject.fields.filter(filterStr).get();
        const spFieldsMap = spFields.reduce((obj, { InternalName, Title }) => {
            obj[InternalName] = Title;
            return obj;
        }, {});
        return spFieldsMap;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches data based on selected data source (List or Search)
 *
 * @param {DataSource} dataSource Data source (list/search)
 * @param {IDataSourceSearchCustom} customSearchSettings Custom search settings
 * @param {string} dataSourceName Data source name
 */
export async function retrieveFromSource(dataSource: DataSource, customSearchSettings?: IDataSourceSearchCustom, dataSourceName?: string): Promise<IBenefitsOverviewData> {
    try {
        switch (dataSource) {
            case DataSource.List: {
                const data = await retrieveDataList();
                return data;
            }
            case DataSource.Search: {
                const data = await retrieveDataSearch(dataSourceName);
                return data;
            }
            case DataSource.SearchCustom: {
                const data = await retrieveDataSearch(dataSourceName, customSearchSettings);
                return data;
            }
            default: {
                return null;
            }
        }
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches data from list(s)
 */
async function retrieveDataList(): Promise<IBenefitsOverviewData> {
    const gainsList = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_BenefitsAnalysis_Title"));
    const measuresList = pnp.sp.web.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_BenefitsFollowup_Title"));
    try {
        const fieldsMap = await fetchFieldsAsMap(gainsList);
        let selectFields = ["ID", "Title", "GtChangeLookup/Title", "GtGainsResponsible/Title", ...Object.keys(fieldsMap)].join(",");
        let [gains, measures] = await Promise.all([
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
        ]);
        gains = gains.map(m => new BenefitEntry().init(DataSource.List, m));
        measures = measures.map(m => new MeasurementEntry().init(DataSource.List, m));
        const data: IBenefitsOverviewData = ({
            items: GenerateData(gains, measures),
            columns: GenerateColumns(fieldsMap, DataSource.List),
        });
        return data;
    } catch (err) {
        throw err;
    }
}

/**
 * Fetches data using search
 *
 * @param {string} dataSourceName Data source name
 * @param {IDataSourceSearchCustom} customSearchSettings Custom search settings
 */
async function retrieveDataSearch(dataSourceName?: string, customSearchSettings?: IDataSourceSearchCustom): Promise<IBenefitsOverviewData> {
    const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(RESOURCE_MANAGER.getResource("Lists_DataSources_Title"));
    const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
    if (dataSource) {
        const contentType = pnp.sp.site.rootWeb.contentTypes.getById(RESOURCE_MANAGER.getResource("ContentTypes_Gevinst_ContentTypeId"));

        let searchSettings: { [key: string]: any } = {
            Querytext: "*",
            QueryTemplate: dataSource.GtDpSearchQuery,
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
        };

        if (customSearchSettings) {
            searchSettings = { ...searchSettings, ...customSearchSettings };
        }

        try {
            const [fieldsMap, { PrimarySearchResults }]: [any, any] = await Promise.all([
                fetchFieldsAsMap(contentType),
                pnp.sp.search(searchSettings),
            ]);
            const gains = PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(RESOURCE_MANAGER.getResource("ContentTypes_Gevinst_ContentTypeId")) !== -1)
                .map(m => new BenefitEntry().init(DataSource.Search, m));
            const measures = PrimarySearchResults
                .filter(s => s.ContentTypeID.indexOf(RESOURCE_MANAGER.getResource("ContentTypes_Gevinstoppfolging_ContentTypeId")) !== -1)
                .sort(({ GtMeasurementDateOWSDATE: a }, { GtMeasurementDateOWSDATE: b }) => (new Date(a).getTime() > new Date(b).getTime()) ? -1 : 1)
                .map(m => new MeasurementEntry().init(DataSource.Search, m));
            const data: IBenefitsOverviewData = ({
                items: GenerateData(gains, measures),
                columns: GenerateColumns(fieldsMap, DataSource.Search),
            });
            return data;
        } catch (err) {
            throw err;
        }
    } else {
        return { items: [], columns: [] };
    }
}



export {
    IBenefitsOverviewData,
    MeasurementEntry,
    BenefitEntry,
};
