import { ISecuredWebPartState } from "../@SecuredWebPart";
import ListConfig from "../../Provision/Data/Config/ListConfig";

export default interface INewProjectLinkState extends ISecuredWebPartState {
    showDialog?: boolean;
    percentComplete?: number;
    listDataConfig: { [key: string]: ListConfig };
}
