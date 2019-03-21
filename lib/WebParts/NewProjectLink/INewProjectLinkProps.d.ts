import { ISecuredWebPartProps } from "../@SecuredWebPart";
export default interface INewProjectLinkProps extends ISecuredWebPartProps {
    linkText?: string;
    iconProps?: {
        iconName: string;
    };
    dlgHeaderText?: string;
    dlgSubHeaderText?: string;
    creationModalTitle?: string;
}
export declare const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps>;
