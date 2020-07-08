import * as React from 'react'
import { LogLevel, Logger } from '@pnp/logging'
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar'
import ProjectStatsChartSettingsProps from './ProjectStatsChartSettingsProps'
import ProjectStatsChartSettingsState from './ProjectStatsChartSettingsState'
import __ from '../../../../Resources'

const LOG_TEMPLATE = '(ProjectStatsChartSettings) {0}: {1}'

export default class ProjectStatsChartSettings extends React.Component<ProjectStatsChartSettingsProps, ProjectStatsChartSettingsState> {

    /**
     * Constructor
     *
     * @param {ProjectStatsChartSettingsProps} props Props
     */
    constructor(props: ProjectStatsChartSettingsProps) {
        super(props)
    }

    /**
     * Renders the <ProjectStatsChartSettings /> component
     */
    public render(): React.ReactElement<ProjectStatsChartSettingsProps> {
        Logger.log({
            message: String.format(LOG_TEMPLATE, 'render', 'Rendering the <ProjectStatsChartSettings /> component.'),
            level: LogLevel.Info,
        })
        return (
            <div className='ms-Grid-row' hidden={this.props.hidden || !this.props.renderCommandBar}>
                <div className='ms-Grid-col ms-sm12'>
                    <CommandBar items={this._getItems()} farItems={this._getFarItems()} />
                </div>
            </div>
        )
    }

    /**
     * Get items
     */
    private _getItems(): ICommandBarItemProps[] {
        const { chart } = this.props

        const items = []

        if (chart.showItemSelector) {
            items.push({
                key: 'pick-project',
                name: __.getResource('String_Select_Project_Name'),
                icon: 'ProjectCollection',
                onClick: e => {
                    e.preventDefault()
                    e.stopPropagation()
                },
                subMenuProps: {
                    items: chart.getData().getItems().map((p, i) => ({
                        key: `${i}`,
                        name: p.name,
                        onClick: e => {
                            e.preventDefault()
                            e.stopPropagation()
                            this.props.onItemChanged(p)
                        },
                    })),
                },
            })
        }
        items.push({
            key: 'edit-chart',
            name: 'Rediger',
            icon: 'EditPhoto',
            onClick: e => {
                e.preventDefault()
                e.stopPropagation()
                document.location.href = chart.getEditFormUrl(this.props.listServerRelativeUrl)
            },
        })

        return items
    }

    /**
     * Get far items
     */
    private _getFarItems(): ICommandBarItemProps[] {
        const farItems = [
            {
                key: 'chart-width',
                name: __.getResource('String_Select_Width_Name'),
                icon: 'FullWidthEdit',
                onClick: e => {
                    e.preventDefault()
                    e.stopPropagation()
                },
                subMenuProps: {
                    items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((w, i) => {
                        const name = `${w} (${((w / 12) * 100).toFixed(2)}%)`
                        return {
                            key: `${i}`,
                            name: name,
                            ['data-width']: w,
                            onClick: this.props.onWidthChanged,
                        }
                    }),
                },
            },
        ]

        return farItems
    }
}

export {
    ProjectStatsChartSettingsProps,
    ProjectStatsChartSettingsState,
}
