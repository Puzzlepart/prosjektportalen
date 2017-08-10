import SectionModel from "./SectionModel";

export default interface ISectionProps {
    index: number;
    section: SectionModel;
    project: any;
    fields: any[];
}
