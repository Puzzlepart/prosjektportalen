import ListConfig from "../../Provision/Data/Config/ListConfig";
import { IBaseWebPartState } from "../@BaseWebPart";

export default interface INewProjectLinkState extends IBaseWebPartState {
    showDialog?: boolean;
    percentComplete?: number;
    shouldRender?: boolean;
    listDataConfig: { [key: string]: ListConfig };
}
