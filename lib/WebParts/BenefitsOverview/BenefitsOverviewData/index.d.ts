import IBenefitsOverviewData from "./IBenefitsOverviewData";
/**
 * Fetches data based on selected data source (List or Search)
 *
 * @param {string} queryTemplate Query template
 * @param {boolean} showSiteTitleColumn Show site title column
 * @param {string} dataSourceName Data source name
 */
export declare function fetchData(queryTemplate?: string, showSiteTitleColumn?: boolean, dataSourceName?: string): Promise<IBenefitsOverviewData>;
export { IBenefitsOverviewData };
