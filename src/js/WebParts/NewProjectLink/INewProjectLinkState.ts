import ListConfig from "../../Provision/Data/Config/ListConfig";
import { ISecurityComponentState } from "../@Components/SecurityComponent";

export default interface INewProjectLinkState extends ISecurityComponentState {
    showDialog?: boolean;
    percentComplete?: number;
    listDataConfig: { [key: string]: ListConfig };
}
