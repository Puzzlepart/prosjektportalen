import SectionModel from "../SectionModel";

export interface ISummarySectionHeaderProps {
    title?: string;
    titleUrl?: string;
}

export interface ISummarySectionProjectDataProps {
    webUrl?: string;
    propertiesLabel?: string;
    showActionLinks?: boolean;
}

export interface ISummarySectionStatusColumnsProps {
    sections: SectionModel[];
}

export default interface ISummarySectionProps extends React.HTMLAttributes<HTMLElement>, ISummarySectionHeaderProps, ISummarySectionProjectDataProps, ISummarySectionStatusColumnsProps { }
