import ListConfig from "../../Provision/Data/Config/ListConfig";
import Extension from "../../Provision/Extensions/Extension";

export default interface INewProjectFormConfig {
    showSettings?: boolean;
    listData?: ListConfig[];
    extensions?: Extension[];
}
