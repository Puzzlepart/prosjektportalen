import { IBaseWebPartProps } from "../@BaseWebPart";
import AudienceTargeting from "../AudienceTargeting";

export default interface INewProjectLinkProps extends IBaseWebPartProps {
    linkClassName?: string;
    iconProps?: {
        iconName: string,
        style: React.CSSProperties,
    };
    audienceTargeting?: AudienceTargeting;
}

export const NewProjectLinkDefaultProps: Partial<INewProjectLinkProps> = {
    linkClassName: "ms-font-l",
    iconProps: {
        iconName: "CirclePlus",
        style: {
            verticalAlign: "bottom",
            marginRight: 5,
        },
    },
    audienceTargeting: AudienceTargeting.Owners,
};
