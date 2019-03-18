//#region Imports
import __ from "../../../Resources";
import { sp, Site } from "@pnp/sp";
import { GenerateColumns } from "./BenefitsOverviewDataColumns";
import DataSource, { IDataSourceSearchCustom } from "../../DataSource";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { Benefit } from "./Benefit";
import { BenefitMeasurement } from "./BenefitMeasurement";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";
//#endregion

/**
 * Fetches fields for a web, list or content type
 *
 * @param {any} spObject List or content type
 */
async function fetchFieldsAsMap(spObject: any) {
    try {
        const filterStr = `substringof('Gt', InternalName) eq true`;
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
    // const gainsList = sp.web.lists.getByTitle(__.getResource("Lists_BenefitsAnalysis_Title"));
    // const measuresList = sp.web.lists.getByTitle(__.getResource("Lists_BenefitsFollowup_Title"));
    // try {
    //     const fieldsMap = await fetchFieldsAsMap(gainsList);
    //     let selectFields = ["ID", "Title", "GtChangeLookup/Title", "GtGainsResponsible/Title", ...Object.keys(fieldsMap)].join(",");
    //     let [gains, measures] = await Promise.all([
    //         gainsList
    //             .items
    //             .select(selectFields)
    //             .expand("GtChangeLookup", "GtGainsResponsible")
    //             .orderBy("Modified", false)
    //             .get(),
    //         measuresList
    //             .items
    //             .select("GtGainLookupId", "GtMeasurementValue", "GtMeasurementDate")
    //             .orderBy("GtMeasurementDate", false)
    //             .get(),
    //     ]);
    //     gains = gains.map(m => new BenefitEntry().init(DataSource.List, m));
    //     measures = measures.map(m => new MeasurementEntry().init(DataSource.List, m));
    //     const data: IBenefitsOverviewData = ({
    //         items: GenerateData(gains, measures),
    //         columns: GenerateColumns(fieldsMap, DataSource.List),
    //     });
    //     return data;
    // } catch (err) {
    //     throw err;
    // }
    return null;
}

/**
 * Fetches data using search
 *
 * @param {string} dataSourceName Data source name
 * @param {IDataSourceSearchCustom} customSearchSettings Custom search settings
 */
async function retrieveDataSearch(dataSourceName?: string, customSearchSettings?: IDataSourceSearchCustom): Promise<IBenefitsOverviewData> {
    const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
    const [dataSource] = await dataSourcesList.items.filter(`Title eq '${dataSourceName}'`).get();
    if (dataSource) {
        let searchSettings: { [key: string]: any } = {
            Querytext: "*",
            QueryTemplate: dataSource.GtDpSearchQuery,
            RowLimit: 500,
            SelectProperties: [
                "Path",
                "Title",
                "ListItemId",
                "SiteTitle",
                "SiteId",
                "ContentTypeID",
                "GtDesiredValueOWSNMBR",
                "GtMeasureIndicatorOWSTEXT",
                "GtMeasurementUnitOWSCHCS",
                "GtStartValueOWSNMBR",
                "GtMeasurementValueOWSNMBR",
                "GtMeasurementCommentOWSMTXT",
                "GtMeasurementDateOWSDATE",
                "GtGainsResponsibleOWSUSER",
                "GtGainsTurnoverOWSMTXT",
                "GtGainsTypeOWSCHCS",
                "GtPrereqProfitAchievementOWSMTXT",
                "GtRealizationTimeOWSDATE",
                "GtGainLookupId",
                "GtMeasureIndicatorLookupId",
                "GtGainsResponsible",
            ],
            TrimDuplicates: false,
        };

        if (customSearchSettings) {
            searchSettings = { ...searchSettings, ...customSearchSettings };
        }

        try {
            const [fieldsMap, searchResults]: [any, any] = await Promise.all([
                fetchFieldsAsMap(sp.site.rootWeb),
                sp.search(searchSettings),
            ]);

            const results = searchResults.PrimarySearchResults as IBenefitsSearchResult[];

            const benefits = results
                .filter(res => res.ContentTypeID.indexOf("0x0100B384774BA4EBB842A5E402EBF4707367") === 0)
                .map(res => new Benefit(res));

            const measurements = results
                .filter(res => res.ContentTypeID.indexOf("0x01007A831AC68204F04AAA022CFF06C7BAA2") === 0)
                .map(res => new BenefitMeasurement(res))
                .sort((a, b) => b.date.getTime() - a.date.getTime());

            const indicators = results
                .filter(res => res.ContentTypeID.indexOf("0x0100FF4E12223AF44F519AF40C441D05DED0") === 0)
                .map(res => {
                    let _indicator = new BenefitMeasurementIndicator(res)
                        .setMeasurements(measurements)
                        .setBenefit(benefits);
                    return _indicator;
                })
                .filter(i => i.benefit);

            const data: IBenefitsOverviewData = ({ items: indicators, columns: GenerateColumns(fieldsMap, DataSource.Search) });
            return data;
        } catch (err) {
            throw err;
        }
    } else {
        return { items: [], columns: [] };
    }
}



export { IBenefitsOverviewData };
