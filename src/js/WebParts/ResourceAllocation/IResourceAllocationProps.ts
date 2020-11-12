import __ from '../../Resources'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { IBaseWebPartProps } from '../@BaseWebPart'
import { SearchQuery } from '@pnp/sp'

export default interface IResourceAllocationProps extends IBaseWebPartProps {
    searchConfiguration: SearchQuery;
    dataSourceName?: string;
    queryTemplate?: string;
    filterColumns?: IColumn[];
 }

export const ResourceAllocationDefaultProps: Partial<IResourceAllocationProps> = {
    searchConfiguration: {
        Querytext: '*',
        RowLimit: 500,
        TrimDuplicates: false,
        SelectProperties: [
            'Title',
            'Path',
            'WebId',
            'GtResourceLoadOWSNMBR',
            'GtResourceAbsenceCommentOWSTEXT',
            'SiteTitle',
            'GtStartDateOWSDATE',
            'GtEndDateOWSDATE',
            'RefinableString71',
            'RefinableString72',
            'RefinableString52',
        ],
    },
    dataSourceName: 'RESOURCEALLOCATION',
    filterColumns: [
        {
            key: 'project.name',
            fieldName: 'project.name',
            name: __.getResource('String_Project'),
            minWidth: 0,
        },
        {
            key: 'user.name',
            fieldName: 'user.name',
            name: __.getResource('String_Resource'),
            minWidth: 0,
        },
        {
            key: 'role',
            fieldName: 'role',
            name: __.getResource('String_Role'),
            minWidth: 0,
        },
    ],
}
