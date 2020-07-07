import __ from '../../Resources'
import { IBaseWebPartProps } from '../@BaseWebPart'

export default interface ILatestProjectsProps extends IBaseWebPartProps {
    chromeTitle?: string;
    itemsCount?: number;
    listClassName?: string;
    loadingText?: string;
}

export const LatestProjectsDefaultProps: Partial<ILatestProjectsProps> = {
    chromeTitle: __.getResource('WebPart_RecentProjects_Title'),
    itemsCount: 5,
    listClassName: 'pp-simpleList spacing-m',
    loadingText: __.getResource('LatestProjects_LoadingText'),
}
