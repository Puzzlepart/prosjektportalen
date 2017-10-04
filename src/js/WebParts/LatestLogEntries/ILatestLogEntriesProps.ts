import { IBaseWebPartProps } from "../@BaseWebPart";
import AudienceTargeting from "../AudienceTargeting";

export default interface ILatestLogEntriesProps extends IBaseWebPartProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    audienceTargeting?: AudienceTargeting;
}

export const LatestLogEntriesDefaultProps: Partial<ILatestLogEntriesProps> = {
    itemsCount: 10,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    audienceTargeting: AudienceTargeting.Owners,
};
