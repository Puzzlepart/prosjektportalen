import * as uuid_v1 from "uuid/v1";
import { IBaseWebPartProps } from "../@BaseWebPart";

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    itemsCount?: number;
    itemsOrderBy?: { orderBy: string, ascending: boolean };
    reloadInterval?: number;
    listClassName?: string;
    containerId?: string;
    deleteEnabled?: boolean;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    itemsCount: 5,
    itemsOrderBy: {
        orderBy: "Created",
        ascending: false,
    },
    reloadInterval: -1,
    listClassName: "pp-simpleList spacing-m",
    containerId: uuid_v1(),
    deleteEnabled: process.env.NODE_ENV === "development",
};
