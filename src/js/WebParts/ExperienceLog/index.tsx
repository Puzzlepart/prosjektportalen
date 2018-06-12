import * as React from "react";
import RESOURCE_MANAGER from "../../Resources";
import { DetailsList, IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { Spinner, SpinnerType } from "office-ui-fabric-react/lib/Spinner";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { ModalLink } from "../../WebParts/@Components";
import { queryLogElements } from "./ExperienceLogSearch";
import IExperienceLogProps, { ExperienceLogDefaultProps } from "./IExperienceLogProps";
import IExperienceLogState from "./IExperienceLogState";
import BaseWebPart from "../@BaseWebPart";
import ExportToExcel, { ExcelExportStatus } from "../../Util/ExportToExcel";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import * as Util from "../../Util";

/**
 * Experience Log
 */
export default class ExperienceLog extends BaseWebPart<IExperienceLogProps, IExperienceLogState> {
    public static displayName = "ExperienceLog";
    public static defaultProps = ExperienceLogDefaultProps;

    /**
     * Constructor
     *
     * @param {IExperienceLogProps} props Props
     */
    constructor(props: IExperienceLogProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            groupBy: {
                key: "NoGrouping",
                name: RESOURCE_MANAGER.getResource("String_NoGrouping"),
            },
        });
    }

    /**
    * Component did mount
    */
    public async componentDidMount(): Promise<void> {
        try {
            const data = await this.fetchData();
            this.setState({
                ...data,
                isLoading: false,
            });
        } catch (err) {
            this.setState({ logItems: [], isLoading: false });
        }
    }

    /**
     * Renders the component
     */
    public render(): JSX.Element {
        const { isLoading } = this.state;
        const { showSearchBox } = this.props;

        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }

        return (
            <div style={{ width: "100%" }}>
                {this.renderCommandBar(this.props, this.state)}
                <div hidden={!showSearchBox}>
                    <SearchBox
                        placeholder={RESOURCE_MANAGER.getResource("ExperienceLog_SearchBox_Placeholder")}
                        onChanged={st => this.setState({ searchTerm: st.toLowerCase() })} />
                </div>
                <DetailsList
                    items={this.getFilteredItems()}
                    columns={this.props.columns}
                    onRenderItemColumn={(item, index, column: any) => {
                        return this._onRenderItemColumn(item, index, column, (evt) => {
                            evt.preventDefault();
                            this.setState({ showProjectInfo: item });
                        });
                    }}
                    constrainMode={this.props.constrainMode}
                    layoutMode={this.props.layoutMode}
                    selectionMode={this.props.selectionMode}
                    />
                {this.renderProjectInfoModal(this.props, this.state)}
            </div>
        );
    }

    /**
     * Renders the Project Info modal
     *
     * @param {IExperienceLogProps} param0 Props
     * @param {IExperienceLogState} param1 State
     */
    private renderProjectInfoModal = ({ modalHeaderClassName, projectInfoFilterField }: IExperienceLogProps, { showProjectInfo }: IExperienceLogState) => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.SPWebUrl}
                    hideChrome={true}
                    showActionLinks={false}
                    showMissingPropsWarning={false}
                    filterField={projectInfoFilterField}
                    labelSize="l"
                    valueSize="m"
                    renderMode={ProjectInfoRenderMode.Modal}
                    modalOptions={{
                        isOpen: true,
                        isDarkOverlay: true,
                        isBlocking: false,
                        onDismiss: e => this.setState({ showProjectInfo: null }),
                        headerClassName: modalHeaderClassName,
                        headerStyle: { marginBottom: 20 },
                        title: showProjectInfo.SiteTitle,
                    }} />
            );
        }
        return null;
    }
    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IExperienceLogProps} param0 Props
     * @param {IExperienceLogState} param1 State
     */
    private renderCommandBar = ({ groupByOptions, showCommandBar }: IExperienceLogProps, { groupBy }: IExperienceLogState) => {
        const items = [];
        const farItems = [];

        if (groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: RESOURCE_MANAGER.getResource("String_NoGrouping"),
            };
            items.push({
                key: "Group",
                name: groupBy.name,
                iconProps: { iconName: "GroupedList" },
                itemType: ContextualMenuItemType.Header,
                onClick: e => e.preventDefault(),
                items: [
                    {
                        ...noGrouping,
                    },
                    ...groupByOptions,
                ].map(item => ({
                    ...item,
                    onClick: e => {
                        e.preventDefault();
                        this.setState({ groupBy: item });
                    },
                })),
            });
        }

        if (this.props.excelExportEnabled && this.props.excelExportConfig) {
            items.push({
                key: "ExcelExport",
                name: this.props.excelExportConfig.buttonLabel,
                iconProps: {
                    iconName: this.props.excelExportConfig.buttonIcon,
                    styles: { root: { color: "green !important" } },
                },
                disabled: this.state.excelExportStatus === ExcelExportStatus.Exporting,
                onClick: e => {
                    e.preventDefault();
                    this.exportToExcel();
                },
            });
        }

        if (items.length > 0 || farItems.length > 0) {
            return (
                <CommandBar
                    hidden={!showCommandBar}
                    items={items}
                    farItems={farItems}
                />
            );
        }
        return null;
    }

    private getFilteredItems() {
        return this.state.logItems
            .filter(itm => {
                const matches = Object.keys(itm).filter(key => {
                    const value = itm[key];
                    return value && typeof value === "string" && value.toLowerCase().indexOf(this.state.searchTerm) !== -1;
                }).length;
                return matches > 0;
            })
            .sort((a, b) => a.Title > b.Title ? 1 : -1);
    }

    /**
     * On render item column
     *
     * @param item The item
     * @param index The index
     * @param column The column
     */
    private _onRenderItemColumn = (item: any, index: number, column: IColumn, projectOnClick: (evt: any) => void): any => {
        let colValue = item[column.fieldName];
        switch (column.key) {
            case "Title": {
                let dispFormUrl = item.Path;
                return (
                    <ModalLink
                        label={colValue}
                        url={dispFormUrl}
                        options={{ HideRibbon: true }} />
                );
            }
            case "SiteTitle": {
                return (
                    <a
                    href={item.SPWebUrl}
                    onClick={projectOnClick}>{item.SiteTitle}</a>
                );
            }
            default: {
                return colValue;
            }
        }
    }

    /**
     * Fetch data using sp-pnp-js search
     */
    private async fetchData(): Promise<Partial<IExperienceLogState>> {
        try {
            const logItems = await queryLogElements(this.props.resultSource, this.props.columns.map(col => col.key));
            return { logItems };
        } catch (err) {
            throw err;
        }
    }

    /**
     * Export current view to Excel (xlsx)
     */
    private async exportToExcel() {
        this.setState({ excelExportStatus: ExcelExportStatus.Exporting });
        const items = this.getFilteredItems();
        const sheet = {
            name: this.props.excelExportConfig.sheetName,
            data: [
                this.props.columns.map(col => col.name),
                ...items.map(item => this.props.columns.map(col => item[col.fieldName])),
            ],
        };
        const fileName = String.format(this.props.excelExportConfig.fileName, RESOURCE_MANAGER.getResource("ExperienceLog_ExcelExportFileNamePrefix"), Util.dateFormat(new Date().toISOString(), "YYYY-MM-DD-HH-mm"));
        await ExportToExcel({
            sheets: [sheet],
            fileName,
        });
        this.setState({ excelExportStatus: ExcelExportStatus.Idle });
    }
}

export {
    IExperienceLogProps,
    IExperienceLogState,
};
