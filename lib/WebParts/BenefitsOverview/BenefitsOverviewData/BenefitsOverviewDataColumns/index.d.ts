import * as React from "react";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { BenefitMeasurementIndicator } from "../BenefitMeasurementIndicator";
export declare const Columns: () => any[];
/**
 * Get column by key
 *
 * @param {string} key Key
 */
export declare const GetColumnByKey: (key: string) => IColumn;
/**
 * Generate columns based on data source and fields
 *
 * @param {boolean} showSiteTitleColumn Show site title column
 */
export declare function GenerateColumns(showSiteTitleColumn: boolean): any[];
/**
 * On render item column
 *
 * @param {BenefitEntry} item The item
 * @param {index} index The index
 * @param {IColumn} column The column
 * @param {Function} openProjectInfoCallback On SiteTitle click event
 * @param {Function} openMeasurementsCallback On show all measurements
 */
export declare function onRenderItemColumn(item: BenefitMeasurementIndicator, _index: number, column: IColumn, openProjectInfoCallback: (event: React.MouseEvent<any>) => void, openMeasurementsCallback: (item: BenefitMeasurementIndicator) => void): any;
