import SectionModel from "./Section/SectionModel";
export default interface ProjectStatusData {
    project?: any;
    sections?: SectionModel[];
    fields?: any[];
    exportType?: string;
}
