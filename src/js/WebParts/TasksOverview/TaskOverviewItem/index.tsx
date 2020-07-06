import * as React from 'react'
import { ITaskOverviewItemProps } from './ITaskOverviewItemProps'
import { TaskOverviewItemType } from './TaskOverviewItemType'

export default class TaskOverviewItem extends React.PureComponent<ITaskOverviewItemProps, {}> {
    public render(): React.ReactElement<ITaskOverviewItemProps> {
        return (
            <div
                {...this.props.itemProps}
                title={this.props.item.title}
                onClick={_ => this.props.onItemClick(this.props.item)}>
                <div className='pp-task-overview-item-content rct-item-content'>
                    <div className='pp-task-overview-item-title' hidden={this.props.type === TaskOverviewItemType.DatesOnly}>
                        {this.props.item.title}
                    </div>
                    <div className='pp-task-overview-item-date'>
                        {this.props.item.start_time.format('LL')} - {this.props.item.end_time.format('LL')}
                    </div>
                </div>
            </div>
        )
    }
}
