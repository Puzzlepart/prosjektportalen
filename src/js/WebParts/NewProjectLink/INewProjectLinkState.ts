import { IAudienceTargetedComponentState } from "../@Components/AudienceTargetedComponent";
import ListConfig from "../../Provision/Data/Config/ListConfig";

export default interface INewProjectLinkState extends IAudienceTargetedComponentState {
    showDialog?: boolean;
    percentComplete?: number;
    listDataConfig: { [key: string]: ListConfig };
}
