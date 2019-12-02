import { sp, SearchQuery } from "@pnp/sp";

export default new class SearchService {
    /**
     * Search
     *
     * @param {SearchQuery} query Query
     */
    public async search<T>(query: SearchQuery): Promise<{ items: T, RawSearchResults: any }> {
        let _query = { ...query };
        let results: any[] = [];
        let response = await sp.search(_query);
        results.push(...response.PrimarySearchResults);
        while (response.TotalRows > results.length) {
            response = await sp.search({ ..._query, StartRow: results.length });
            results.push(...response.PrimarySearchResults);
        }
        return { items: (results as any) as T, RawSearchResults: response.RawSearchResults };
    }
};
