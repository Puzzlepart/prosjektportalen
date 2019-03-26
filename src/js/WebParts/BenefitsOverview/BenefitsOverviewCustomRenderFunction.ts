import { BenefitBase } from "./BenefitsOverviewData/BenefitBase";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export type BenefitsOverviewCustomRenderFunctionCallback = (item: BenefitBase) => any;

export type BenefitsOverviewCustomRenderFunction = (item: BenefitBase, column: IColumn, callbacks?: { [key: string]: BenefitsOverviewCustomRenderFunctionCallback }) => JSX.Element;
