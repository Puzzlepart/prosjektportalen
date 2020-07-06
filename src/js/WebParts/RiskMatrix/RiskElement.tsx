import * as React from 'react'
import { ModalLink } from '../@Components'
import RiskElementModel from './RiskElementModel'

export interface IRiskElementProps extends React.HTMLProps<HTMLDivElement> {
    model: RiskElementModel;
}

export default class RiskMatrix extends React.Component<IRiskElementProps, {}> {
    public static defaultProps = { className: 'risk-matrix-element' };

    public render(): React.ReactElement<IRiskElementProps> {
        return (
            <div
                className={this.props.className}
                title={this._getTooltip()}
                style={this.props.style}>
                <ModalLink
                    label={this.props.model.id}
                    title={this._getTooltip()}
                    url={this.props.model.url}
                    options={{ HideRibbon: true }} />
            </div>
        )
    }

    protected _getTooltip() {
        let tooltip = ''
        if (this.props.model.siteTitle) {
            tooltip += `${this.props.model.siteTitle}: `
        }
        tooltip += this.props.model.title
        return tooltip
    }
}
