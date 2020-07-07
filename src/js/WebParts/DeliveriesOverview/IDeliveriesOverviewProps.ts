import __ from '../../Resources'
import { IBaseWebPartProps } from '../@BaseWebPart'
import { IListProps } from '../@Components/List'

export default interface IDeliveriesOverviewProps extends IBaseWebPartProps, IListProps {
    dataSourceName?: string;
    queryTemplate?: string;
}

export const DeliveriesOverviewDefaultProps: Partial<IDeliveriesOverviewProps> = {
    groupByOptions: [
        { name: __.getResource('String_Project'), key: 'SiteTitle' },
        { name: __.getResource('SiteFields_GtProductStatus_DisplayName'), key: 'ProductStatus' },
    ],
    dataSourceName: 'DELIVERIESOVERVIEW',
    columns: [{
        key: 'Title',
        fieldName: 'Title',
        name: __.getResource('SiteFields_Title_DisplayName'),
        minWidth: 220,
        isMultiline: true,
    },
    {
        key: 'SiteTitle',
        fieldName: 'SiteTitle',
        name: __.getResource('String_Project'),
        minWidth: 220,
        isMultiline: true,
        isResizable: true,
    },
    {
        key: 'GtProductDescriptionOWSMTXT',
        fieldName: 'ProductDescription',
        name: __.getResource('SiteFields_GtProductDescription_DisplayName'),
        minWidth: 220,
        isMultiline: true,
        isResizable: true,
    },
    {
        key: 'GtProductStartTimeOWSDATE',
        fieldName: 'ProductStartTime',
        name: __.getResource('SiteFields_GtProductStartTime_DisplayName'),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: 'GtProductEndTimeOWSDATE',
        fieldName: 'ProductEndTime',
        name: __.getResource('SiteFields_GtProductEndTime_DisplayName'),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: 'GtProductStatusOWSCHCS',
        fieldName: 'ProductStatus',
        name: __.getResource('SiteFields_GtProductStatus_DisplayName'),
        minWidth: 100,
        isMultiline: false,
        isResizable: true,
    },
    {
        key: 'GtProductStatusCommentOWSMTXT',
        fieldName: 'ProductStatusComment',
        name: __.getResource('SiteFields_GtProductStatusComment_DisplayName'),
        minWidth: 220,
        isMultiline: true,
        isResizable: true,
    }],
    excelExportEnabled: true,
    excelExportConfig: {
        fileNamePrefix: __.getResource('DeliveriesOverview_ExcelExportFileNamePrefix'),
        sheetName: 'Sheet A',
        buttonLabel: __.getResource('DynamicPortfolio_ExcelExportButtonLabel'),
        buttonIcon: 'ExcelDocument',
    },
}
