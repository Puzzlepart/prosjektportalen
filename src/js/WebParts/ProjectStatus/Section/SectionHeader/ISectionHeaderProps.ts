import SectionModel from "../SectionModel";

export default interface ISectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
    section: SectionModel;
    fallbackNavigateUrl?: string;
}

