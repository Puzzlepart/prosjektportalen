import SectionModel from "../SectionModel";

export default interface ISummarySectionProps extends React.HTMLAttributes<HTMLElement> {
    webUrl?: string;
    title?: string;
    titleUrl?: string;
    propertiesLabel: string;
    project: any;
    sections: SectionModel[];
}
