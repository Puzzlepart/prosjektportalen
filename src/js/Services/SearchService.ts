import { sp, SearchQuery } from "@pnp/sp";

export default new class SearchService {
    public async search<T>(query: SearchQuery): Promise<T> {
        let _query = { ...query };
        let response = await sp.search(_query);
        console.log(response);
        return (response.PrimarySearchResults as any) as T;
    }
};
