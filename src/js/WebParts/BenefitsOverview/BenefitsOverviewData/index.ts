//#region Imports
import __ from "../../../Resources";
import { sp, SearchQuery, Site } from "@pnp/sp";
import { GenerateColumns } from "./BenefitsOverviewDataColumns";
import IBenefitsOverviewData from "./IBenefitsOverviewData";
import { IBenefitsSearchResult } from "./IBenefitsSearchResult";
import { Benefit } from "./Benefit";
import { BenefitMeasurement } from "./BenefitMeasurement";
import { BenefitMeasurementIndicator } from "./BenefitMeasurementIndicator";
//#endregion

/**
 * Fetches data based on selected data source (List or Search)
 *
 * @param {string} queryTemplate Query template
 * @param {boolean} showSiteTitleColumn Show site title column
 * @param {string} dataSourceName Data source name
 */
export async function fetchData(queryTemplate?: string, showSiteTitleColumn?: boolean, dataSourceName?: string): Promise<IBenefitsOverviewData> {
    try {
        let searchSettings: SearchQuery = {
            Querytext: "*",
            QueryTemplate: queryTemplate,
            RowLimit: 500,
            SelectProperties: [
                "Path",
                "Title",
                "ListItemId",
                "SiteTitle",
                "WebId",
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
        if (dataSourceName) {
            const dataSourcesList = new Site(_spPageContextInfo.siteAbsoluteUrl).rootWeb.lists.getByTitle(__.getResource("Lists_DataSources_Title"));
            const [dataSource] = await dataSourcesList.items.select("GtDpSearchQuery").filter(`Title eq '${dataSourceName}'`).get<{ GtDpSearchQuery: string }[]>();
            searchSettings.QueryTemplate = dataSource.GtDpSearchQuery;
        }
        try {
            const results = (await sp.search(searchSettings)).PrimarySearchResults as IBenefitsSearchResult[];
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
            const data: IBenefitsOverviewData = ({ items: indicators, columns: GenerateColumns(showSiteTitleColumn) });
            return data;
        } catch (err) {
            throw err;
        }
    } catch (err) {
        throw err;
    }
}



export { IBenefitsOverviewData };
