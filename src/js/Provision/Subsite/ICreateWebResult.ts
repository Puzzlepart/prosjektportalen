import { Web } from "sp-pnp-js";

export default interface ICreateWebResult {
    web: Web;
    url: string;
    redirectUrl: string;
}

