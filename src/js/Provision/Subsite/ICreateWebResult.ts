import { Web } from "sp-pnp-js";

interface ICreateWebResult {
    web: Web;
    url: string;
    redirectUrl: string;
}

export default ICreateWebResult;
