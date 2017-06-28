import AudienceTargeting from "../../AudienceTargeting";
import IModalLinkIconProps from "./IModalLinkIconProps";
import IModalLinkOptions from "./IModalLinkOptions";

interface IModalLinkProps {
    label?: string;
    showLabel?: boolean;
    url: string;
    options?: IModalLinkOptions;
    reloadOnSubmit?: boolean;
    reloadOnCancel?: boolean;
    width?: number;
    height?: number;
    icon?: IModalLinkIconProps;
    className?: string;
    id?: string;
    style?: React.CSSProperties;
    hidden?: boolean;
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
