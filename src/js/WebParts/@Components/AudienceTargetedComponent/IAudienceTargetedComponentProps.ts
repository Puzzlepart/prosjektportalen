import AudienceTargeting from "../../AudienceTargeting";

interface IAudienceTargetedComponentProps {
    audienceTargeting?: AudienceTargeting;
}

export const AudienceTargetedComponentDefaultProps: Partial<IAudienceTargetedComponentProps> = {
    audienceTargeting: AudienceTargeting.None,
};

export default IAudienceTargetedComponentProps;
