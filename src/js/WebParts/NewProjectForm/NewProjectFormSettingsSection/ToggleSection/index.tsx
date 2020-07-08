//#region Imports
import * as React from 'react'
import __ from '../../../../Resources'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Toggle } from 'office-ui-fabric-react/lib/Toggle'
import IToggleSectionProps from './IToggleSectionProps'
import IToggleSectionState from './IToggleSectionState'
//#endregion


export default class ToggleSection extends React.Component<IToggleSectionProps, IToggleSectionState> {
    public static defaultProps = { headerClassName: 'ms-font-l settings-section' };

    /**
    * Constructor
    *
    * @param {IToggleSectionProps} props Props
    */
    constructor(props: IToggleSectionProps) {
        super(props)
        this.state = { isExpanded: false }
        this.onToggle = this.onToggle.bind(this)
    }

    public render() {
        const {
            hidden,
            title,
            options,
            optLabelProp,
            onChanged,
            headerClassName,
            selected,
        } = this.props
        const { isExpanded } = this.state

        return (
            <div hidden={hidden}>
                <div onClick={this.onToggle} className={headerClassName}>
                    <span>{title}</span>
                    <span className={isExpanded ? 'ChevronUp' : 'ChevronDown'}>
                        <Icon iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'} />
                    </span>
                </div>
                <section hidden={!isExpanded}>
                    {options.map((opt, index) => {
                        return (
                            <div key={index}>
                                <Toggle
                                    checked={selected.indexOf(opt.Id) !== -1}
                                    label={opt[optLabelProp]}
                                    onChanged={checked => onChanged(opt, checked)}
                                    onText={__.getResource('String_Yes')}
                                    offText={__.getResource('String_No')} />
                                <div className='ms-font-xs' style={{ paddingTop: 10, paddingBottom: 10 }} hidden={!opt.Comments}>
                                    {opt.Comments}
                                </div>
                            </div>
                        )
                    })}
                </section>
            </div>
        )
    }

    /**
     * On toggle
     */
    private onToggle() {
        this.setState(prevState => ({ isExpanded: !prevState.isExpanded }))
    }
}
