import AudienceTargeting from "../../AudienceTargeting";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";

interface IModalLinkProps extends React.HTMLAttributes<HTMLElement> {
    label?: string;
    showLabel?: boolean;
    url: string;
    options?: IModalLinkOptions;
    reloadOnSubmit?: boolean;
    reloadOnCancel?: boolean;
    width?: number;
    height?: number;
    icon?: IModalLinkIconProps;
    id?: string;
    audienceTargeting?: AudienceTargeting;
}

export const ModalLinkDefaultProps: Partial<IModalLinkProps> = {
    showLabel: true,
    reloadOnSubmit: false,
    reloadOnCancel: false,
    className: "",
    audienceTargeting: AudienceTargeting.None,
};

export default IModalLinkProps;
