/**
 * Query the REST Search API using @pnp/sp. Find all project content types in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 * @param {Array<string>} selectProperties Select properties
 */
export declare function queryProjects(dataSourceName: string, rowLimit?: number, selectProperties?: any[]): Promise<any[]>;
/**
 * Query the REST Search API using @pnp/sp. Find all webs in the specified data source
 *
 * @param {string} dataSourceName Data source name
 * @param {number} rowLimit Row limit
 */
export declare function queryProjectWebs(dataSourceName: string, rowLimit?: number): Promise<any[]>;
