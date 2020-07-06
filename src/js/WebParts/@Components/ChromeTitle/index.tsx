import * as React from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as Util from '../../../Util'
import IToggleElement from './IToggleElement'
import IChromeTitleProps from './IChromeTitleProps'
import IChromeTitleState from './IChromeTitleState'

export default class ChromeTitle extends React.PureComponent<IChromeTitleProps, IChromeTitleState> {
    public static defaultProps: Partial<IChromeTitleProps> = {
        hidden: false,
        width: '100%',
    };

    /**
     * Toggle storage key
     */
    private toggleStorageKey = '';

    /**
     * Constructor
     *
     * @param {IChromeTitleProps} props Props
     */
    constructor(props: IChromeTitleProps) {
        super(props)
        this.state = { isCollapsed: false }
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        if (!this.props.toggleElement) {
            return
        }
        const { storage, element } = this.props.toggleElement
        if (storage && element) {
            this.toggleStorageKey = Util.generateStorageKey([storage.key, 'CollapsedState'])
            const newState = {
                isCollapsed: this.getCollapsedStateFromStorage(),
            }
            this.setState(newState)
            if (newState.isCollapsed) {
                element.style.display = 'none'
            }

        }
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<IChromeTitleProps> {
        return (
            <div
                hidden={this.props.hidden}
                className={'ms-webpart-chrome-title'}
                onClick={this.onClick}
                style={{ width: this.props.width }}>
                <span
                    title={this.props.title}
                    className='js-webpart-titleCell'>
                    <h2 className='ms-webpart-titleText'
                        style={{
                            cursor: this.props.toggleElement ? 'poiner' : 'inherit',
                            textAlign: 'justify',
                            position: 'relative',
                        }}                    >
                        <span>{this.props.title}</span>
                        {this.props.toggleElement && (
                            <Icon iconName={this.state.isCollapsed ? 'ChevronDown' : 'ChevronUp'} style={{
                                fontSize: 14,
                                position: 'absolute',
                                right: 5,
                                top: 10,
                            }} />
                        )}
                    </h2>
                </span>
            </div >
        )
    }

    /**
     * On chrome click
     */
    private onClick = () => {
        if (!this.props.toggleElement) {
            return
        }
        const { storage, element } = this.props.toggleElement
        const { isCollapsed } = this.state
        const newState = { isCollapsed: !isCollapsed }
        this.setState(newState)
        element.style.display = newState.isCollapsed ? 'none' : 'block'
        if (storage) {
            window[storage.type].setItem(this.toggleStorageKey, JSON.stringify(newState.isCollapsed))
        }
    }

    /**
     * Get collapsed state from storage (localStorage or sessionStorage)
     */
    private getCollapsedStateFromStorage(): boolean {
        const { storage } = this.props.toggleElement
        const value = window[storage.type].getItem(this.toggleStorageKey)
        if (value) {
            try {
                const parsedValue = JSON.parse(value)
                return parsedValue
            } catch (e) {
                return true
            }
        } else {
            return true
        }
    }
}

export {
    IToggleElement,
    IChromeTitleProps,
    IChromeTitleState,
}
