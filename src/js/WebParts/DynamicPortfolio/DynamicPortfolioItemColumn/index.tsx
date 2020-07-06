import * as React from 'react'
import * as Util from '../../../Util'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import {
    IDynamicPortfolioColumnConfig,
    IDynamicPortfolioConfiguration,
} from '../DynamicPortfolioConfiguration'
import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip'

/**
 * Render item column
 *
 * @param {any} item The item
 * @param {number} _index Index
 * @param {IDynamicPortfolioColumnConfig} column Column
 * @param {IDynamicPortfolioConfiguration} configuration Configuration
 * @param {Function} titleOnClick Title column on click
 */
const DynamicPortfolioItemColumn = (item: any, _index: number, column: IDynamicPortfolioColumnConfig, configuration: IDynamicPortfolioConfiguration, truncLength: string, titleOnClick: (evt: any) => void): JSX.Element => {
    let colValue = item[column.key]
    if (colValue) {
        if (colValue !== '' && (column.key.indexOf('OWSNMBR') !== -1 || column.key.indexOf('OWSCURR') !== -1)) {
            colValue = parseInt(colValue, 10)
        }
        switch (column.key) {
            case 'Title': {
                return (
                    <a
                        href={item.Path}
                        onClick={titleOnClick}>{colValue && colValue !== 'DispForm.aspx' ? colValue : item.SiteTitle}</a>
                )
            }
            case 'Path':
            case 'URL': {
                return <a href={item.Path}>{colValue}</a>
            }
        }
        switch (column.render) {
            case 'Date': {
                return (
                    <span>
                        {colValue ? Util.formatDate(colValue, 'LL') : null}
                    </span>
                )
            }
            case 'Note': {
                if (!truncLength || truncLength === '0') {
                    return <span dangerouslySetInnerHTML={{ __html: colValue }}></span>
                } else {
                    return (
                        <TooltipHost content={colValue}>
                            <span>{colValue.slice(0, parseInt(truncLength, 10)) + '...'}</span>
                        </TooltipHost>
                    )
                }
            }
            case 'Currency': {
                const currValue = Util.toCurrencyFormat(colValue)
                return <span title={currValue}>{currValue}</span>
            }
            case 'Status': {
                const fieldName = Util.cleanSearchPropName(column.fieldName)
                if (configuration.statusFields.hasOwnProperty(fieldName)) {
                    const [statusProperties] = configuration.statusFields[fieldName].statuses.filter(({ statusValue }) => colValue === statusValue)
                    if (statusProperties) {
                        const statusComment: string = item[`${fieldName}CommentOWSMTXT`] ? `${colValue}: ${item[`${fieldName}CommentOWSMTXT`]}` : colValue
                        const TooltipWrapper = ({ condition, wrapper, children }): JSX.Element => condition ? wrapper(children) : children
                        return (
                            <TooltipWrapper
                                condition={statusComment}
                                wrapper={(children: JSX.Element) => (
                                    <TooltipHost content={statusComment} calloutProps={{ gapSpace: 0 }}>
                                        {children}
                                    </TooltipHost>
                                )}
                            >
                                <span>
                                    <Icon iconName={statusProperties.statusIconName} style={{ color: statusProperties.statusColor }} />  {colValue}
                                </span>
                            </TooltipWrapper>
                        )
                    }
                }
                return (
                    <span>{colValue}</span>
                )

            }
            case 'URL': {
                const urlVals = colValue.split(',')
                return (
                    <a title={urlVals[1]} href={urlVals[0]}>{urlVals[1]}</a>
                )
            }
            case 'Default': {
                return (
                    <span title={colValue}>{colValue}</span>
                )
            }
            default: {
                return (
                    <span title={colValue}>{colValue}</span>
                )
            }
        }
    } else {
        return null
    }
}

export default DynamicPortfolioItemColumn
