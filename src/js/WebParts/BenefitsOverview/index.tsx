import * as React from "react";
import * as unique from "array-unique";
import {
    DetailsList,
    IGroup,
    SelectionMode,
    IColumn,
} from "office-ui-fabric-react/lib/DetailsList";
import { Modal } from "office-ui-fabric-react/lib/Modal";
import { CommandBar } from "office-ui-fabric-react/lib/CommandBar";
import { ContextualMenuItemType } from "office-ui-fabric-react/lib/ContextualMenu";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import {
    Spinner,
    SpinnerType,
} from "office-ui-fabric-react/lib/Spinner";
import ProjectInfo, { ProjectInfoRenderMode } from "../ProjectInfo";
import { _onRenderItemColumn } from "./Data/Columns";
import * as Data from "./Data";
import IBenefitsOverviewProps, { BenefitsOverviewDefaultProps } from "./IBenefitsOverviewProps";
import IBenefitsOverviewState from "./IBenefitsOverviewState";
import BaseWebPart from "../@BaseWebPart";

/**
 * Benefits Overview
 */
export default class BenefitsOverview extends BaseWebPart<IBenefitsOverviewProps, IBenefitsOverviewState> {
    public static displayName = "BenefitsOverview";
    public static defaultProps = BenefitsOverviewDefaultProps;

    /**
     * Constructor
     *
     * @param {IBenefitsOverviewProps} props Props
     */
    constructor(props: IBenefitsOverviewProps) {
        super(props, {
            isLoading: true,
            searchTerm: "",
            groupBy: {
                key: "NoGrouping",
                name: Localization.getResource("String_NoGrouping"),
            },
        });
    }

    /**
     * Component did mount
     */
    public componentDidMount(): void {
        Data.retrieveFromSource(this.props.dataSource)
            .then(data => this.setState({
                data: data,
                isLoading: false,
            }));
    }

    /**
     * Calls _render with props and state to allow for ES6 destruction
     */
    public render(): JSX.Element {
        return this._render(this.props, this.state);
    }

    /**
     * Render the component
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    public _render({ showSearchBox }: IBenefitsOverviewProps, { isLoading, data }: IBenefitsOverviewState): JSX.Element {
        if (isLoading) {
            return <Spinner type={SpinnerType.large} />;
        }
        if (data) {
            let { items, columns, groups } = this.getFilteredData(this.props, this.state);
            return (
                <div style={{ width: "100%" }}>
                    {this.renderCommandBar(this.props, this.state)}
                    <div style={{ height: 10 }}></div>
                    {showSearchBox !== false &&
                        <SearchBox
                            onChange={st => this.setState({ searchTerm: st.toLowerCase() })}
                            labelText={Localization.getResource("BenefitsOverview_SearchBox_Placeholder")} />
                    }
                    <DetailsList
                        items={items}
                        columns={columns}
                        groups={groups}
                        selectionMode={SelectionMode.none}
                        onRenderItemColumn={(item, index, column: any) => {
                            return _onRenderItemColumn(item, index, column, () => this.setState({ showProjectInfo: item }), entry => this.setState({ showMeasurements: entry }));
                        }}
                        onColumnHeaderClick={(col, evt) => this._onColumnClick(col, evt)}
                    />
                    {this.renderProjectInfoModal(this.props, this.state)}
                    {this.renderMeasurementsModal(this.props, this.state)}
                </div>
            );
        }
        return null;
    }


    /**
     * Renders the command bar from office-ui-fabric-react
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderCommandBar = ({ groupByOptions, showCommandBar }: IBenefitsOverviewProps, { groupBy }: IBenefitsOverviewState) => {
        const items = [];
        const farItems = [];

        if (groupByOptions.length > 0) {
            const noGrouping = {
                key: "NoGrouping",
                name: Localization.getResource("String_NoGrouping"),
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

    /**
     * Renders the Project Info modal
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private renderProjectInfoModal = ({ modalHeaderClassName, projectInfoFilterField }: IBenefitsOverviewProps, { showProjectInfo }: IBenefitsOverviewState) => {
        if (showProjectInfo) {
            return (
                <ProjectInfo
                    webUrl={showProjectInfo.WebUrl}
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
   * Renders the Project Info modal
   *
   * @param {IBenefitsOverviewProps} param0 Props
   * @param {IBenefitsOverviewState} param1 State
   */
    private renderMeasurementsModal = ({ }: IBenefitsOverviewProps, { showMeasurements }: IBenefitsOverviewState) => {
        if (showMeasurements) {
            return (
                <Modal
                    isOpen={true}
                    isDarkOverlay={true}
                    onDismiss={e => this.setState({ showMeasurements: null })}
                    containerClassName={"pp-modal"}
                    isBlocking={false}>
                    <div style={{ padding: 50 }}>
                        <h2 style={{ marginBottom: 20 }}>{showMeasurements.Title}</h2>
                        <DetailsList
                            items={showMeasurements.Measurements}
                            columns={[
                                {
                                    key: "MeasurementValue",
                                    fieldName: "MeasurementValue",
                                    name: Localization.getResource("SiteFields_GtMeasurementValue_DisplayName"),
                                    minWidth: 100,
                                },
                                {
                                    key: "Percentage",
                                    fieldName: "Percentage",
                                    name: Localization.getResource("String_AchievementOfObjectives"),
                                    minWidth: 100,
                                },
                                {
                                    key: "MeasurementDate",
                                    fieldName: "MeasurementDate",
                                    name: Localization.getResource("SiteFields_GtMeasurementDate_DisplayName"),
                                    minWidth: 150,
                                },
                            ]}
                        />
                    </div>
                </Modal>
            );
        }
        return null;
    }

    /**
     * Get filtered data based on groupBy and searchTerm. Search is case-insensitive.
     *
     * @param {IBenefitsOverviewProps} param0 Props
     * @param {IBenefitsOverviewState} param1 State
     */
    private getFilteredData = ({ searchProperty }: IBenefitsOverviewProps, { groupBy, data, searchTerm }: IBenefitsOverviewState): { items: any[], columns: any[], groups: IGroup[] } => {
        let columns = [].concat(data.columns);
        let groups: IGroup[] = null;
        if (groupBy.key !== "NoGrouping") {
            const groupItems = data.items.sort((a, b) => a[groupBy.key] > b[groupBy.key] ? -1 : 1);
            const groupNames = groupItems.map(g => g[groupBy.key]);
            groups = unique([].concat(groupNames)).map((name, idx) => ({
                key: idx,
                name: `${groupBy.name}: ${name}`,
                startIndex: groupNames.indexOf(name, 0),
                count: [].concat(groupNames).filter(n => n === name).length,
                isCollapsed: false,
                isShowingAll: true,
                isDropEnabled: false,
            }));
        }
        const filteredItems = data.items.filter(item => item[searchProperty].toLowerCase().indexOf(searchTerm) !== -1);
        return {
            items: filteredItems,
            columns: columns,
            groups: groups,
        };
    }

    /**
     * Sorting on column click
     *
     * @param {any} event Event
     * @param {IColumn} column Column
     */
    private _onColumnClick = (event, column: IColumn): any => {
        const { data } = this.state;

        let isSortedDescending = column.isSortedDescending;
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        let items = data.items.concat([]).sort((a, b) => {
            let firstValue = a[column.fieldName];
            let secondValue = b[column.fieldName];
            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            } else {
                return firstValue > secondValue ? 1 : -1;
            }
        });
        let columns = data.columns.map(col => {
            col.isSorted = (col.key === column.key);
            if (col.isSorted) {
                col.isSortedDescending = isSortedDescending;
            }
            return col;
        });
        this.setState({
            data: {
                items: items,
                columns: columns,
            },
        });
    }
}
