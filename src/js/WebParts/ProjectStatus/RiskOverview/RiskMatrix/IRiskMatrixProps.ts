import { RiskElementModel } from "../IRiskOverviewState";

interface IRiskMatrixProps {
    items: RiskElementModel[];
    postAction: boolean;
}

export const RiskMatrixDefaultProps: Partial<IRiskMatrixProps> = {
    items: [],
    postAction: false,
};

export default IRiskMatrixProps;
