import __ from '../../../../Resources'
import { IFile } from 'sp-js-provisioning/lib/schema'

const Nofilter: IFile = {
    Folder: 'SitePages',
    Src: '{sitecollection}/Resources/SitePage.txt',
    Url: 'Nofilter.aspx',
    Overwrite: true,
    WebParts: [
        {
            Title: __.getResource('WebPart_Tasks_Title'),
            Zone: 'LeftColumn',
            Order: 0,
            PropertyOverrides: [{
                name: 'Title',
                type: 'string',
                value: __.getResource('WebPart_Tasks_Title'),
            },
            {
                name: 'ListUrl',
                type: 'string',
                value: `{site}/${__.getResource('Lists_Tasks_Url')}`,
            },
            {
                name: 'TitleUrl',
                type: 'string',
                value: `{site}/${__.getResource('DefaultView_Tasks_Url')}`,
            }],
            Contents: {
                FileSrc: '{sitecollection}/Resources/ListViewWebPart.txt',
            },
            ListView: {
                List: __.getResource('Lists_Tasks_Title'),
                View: {
                    Title: '',
                    ViewFields: ['Checkmark', 'LinkTitle', 'StartDate', 'DueDate', 'AssignedTo'],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: '<OrderBy><FieldRef Name=\'Created\' Ascending=\'FALSE\' /></OrderBy><GroupBy Collapse=\'TRUE\'><FieldRef Name=\'GtProjectPhase\' /></GroupBy>',
                    },
                },
            },
        },
        {
            Title: __.getResource('WebPart_Documents_Title'),
            Zone: 'LeftColumn',
            Order: 1,
            PropertyOverrides: [{
                name: 'Title',
                type: 'string',
                value: __.getResource('WebPart_Documents_Title'),
            },
            {
                name: 'ListUrl',
                type: 'string',
                value: `{site}/${__.getResource('Lists_Documents_Url')}`,
            },
            {
                name: 'TitleUrl',
                type: 'string',
                value: `{site}/${__.getResource('DefaultView_Documents_Url')}`,
            }],
            Contents: {
                FileSrc: '{sitecollection}/Resources/ListViewWebPart.txt',
            },
            ListView: {
                List: __.getResource('Lists_Documents_Title'),
                View: {
                    Title: '',
                    ViewFields: ['DocIcon', 'LinkFilename', 'Modified', 'Editor'],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: '<OrderBy><FieldRef Name=\'Created\' Ascending=\'FALSE\' /></OrderBy><GroupBy Collapse=\'TRUE\'><FieldRef Name=\'GtProjectPhase\' /></GroupBy>',
                    },
                },
            },
        },
        {
            Title: __.getResource('WebPart_SiteFeed_Title'),
            Zone: 'RightColumn',
            Order: 0,
            Contents: {
                FileSrc: '{wpgallery}/SiteFeed.dwp',
            },
        },
        {
            Title: __.getResource('WebPart_Uncertainties_Title'),
            Zone: 'RightColumn',
            Order: 1,
            PropertyOverrides: [{
                name: 'Title',
                type: 'string',
                value: __.getResource('WebPart_Uncertainties_Title'),
            },
            {
                name: 'ListUrl',
                type: 'string',
                value: `{site}/${__.getResource('Lists_Uncertainties_Url')}`,
            },
            {
                name: 'TitleUrl',
                type: 'string',
                value: `{site}/${__.getResource('DefaultView_Uncertainties_Url')}`,
            }],
            Contents: {
                FileSrc: '{sitecollection}/Resources/ListViewWebPart.txt',
            },
            ListView: {
                List: __.getResource('Lists_Uncertainties_Title'),
                View: {
                    Title: '',
                    ViewFields: ['LinkTitle', 'GtRiskProbability', 'GtRiskConsequence', 'GtRiskProximity', 'GtRiskFactor'],
                    AdditionalSettings: {
                        RowLimit: 10,
                        Paged: true,
                        ViewQuery: '<OrderBy><FieldRef Name=\'Created\' Ascending=\'FALSE\' /></OrderBy><GroupBy Collapse=\'TRUE\'><FieldRef Name=\'GtProjectPhase\' /></GroupBy>',
                    },
                },
            },
        },
    ],
}

export default Nofilter
